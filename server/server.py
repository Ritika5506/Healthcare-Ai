import flwr as fl
import tensorflow as tf
import socket
import os
import sys

# Ensure parent path is on sys.path to import model
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_root)
from model import create_model
from blockchain import Blockchain, hash_parameters

# Change to project root to handle relative paths correctly
os.chdir(project_root)

# -----------------------------
# Global model initialization
# -----------------------------
global_model_path = os.path.join(project_root, "global_model.h5")
if os.path.exists(global_model_path):
    model = tf.keras.models.load_model(global_model_path)
else:
    model = create_model()
    model.save(global_model_path)

# -----------------------------
# Custom FL strategy with blockchain verification
# -----------------------------
class SaveModelStrategy(fl.server.strategy.FedAvg):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.blockchain = Blockchain()

    def aggregate_fit(self, rnd, results, failures):
        valid_ndarrays = []
        num_examples_list = []

        for client_proxy, fit_res in results:
            parameters = fit_res.parameters
            metrics = fit_res.metrics or {}
            hash_val = metrics.get("hash")
            hospital_id = metrics.get("hospital_id")

            # Convert Parameters -> ndarrays once
            try:
                client_weights = fl.common.parameters_to_ndarrays(parameters)
            except Exception as e:
                print(f"DEBUG conversion error for {hospital_id}: {e}")
                continue

            calculated_hash = hash_parameters(client_weights)
            if hash_val == calculated_hash:
                self.blockchain.add_block({"hospital_id": hospital_id, "hash": hash_val})
                valid_ndarrays.append(client_weights)
                num_examples_list.append(fit_res.num_examples)
                print(f"Valid update from {hospital_id} with hash: {hash_val}")
            else:
                print(
                    f"Hash mismatch for {hospital_id}: expected {calculated_hash}, got {hash_val}. "
                    "Discarding update."
                )

        if not valid_ndarrays:
            print("No valid updates. Skipping aggregation.")
            return None

        # Weighted FedAvg aggregation
        total_examples = sum(num_examples_list)
        aggregated_weights = [
            sum(client[i] * (num_examples_list[j] / total_examples)
                for j, client in enumerate(valid_ndarrays))
            for i in range(len(valid_ndarrays[0]))
        ]

        # Wrap aggregated weights into Parameters
        aggregated_parameters = fl.common.ndarrays_to_parameters(aggregated_weights)

        # Update global model once per round
        model.set_weights(aggregated_weights)
        model.save(global_model_path)
        print(f"Global model updated and saved after round {rnd}!")

        # ⚠ Flower requires a tuple (Parameters, metrics)
        return aggregated_parameters, {}

# -----------------------------
# Use the custom strategy
# -----------------------------
strategy = SaveModelStrategy(
    fraction_fit=1.0,
    min_fit_clients=1,
    min_available_clients=1,
)

# -----------------------------
# Auto pick free port
# -----------------------------
def find_free_port():
    sock = socket.socket()
    sock.bind(('', 0))  # OS picks a free port
    port = sock.getsockname()[1]
    sock.close()
    return port

port = find_free_port()
server_address = f"127.0.0.1:{port}"
print(f"[ROCKET] Flower server will run on {server_address}")

# Save server address for clients with absolute path
address_file = os.path.join(project_root, "server_address.txt")
with open(address_file, "w") as f:
    f.write(server_address)

print(f"[OK] Server ready. Clients should connect to {server_address}")

# -----------------------------
# Start Flower server (blocking)
# -----------------------------
fl.server.start_server(
    server_address=server_address,
    config=fl.server.ServerConfig(num_rounds=10),
    strategy=strategy
)