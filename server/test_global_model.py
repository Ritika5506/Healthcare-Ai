# server/test_global_model.py

import os
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import image_dataset_from_directory

# -------------------------------
# Step 1: Load the global model
# -------------------------------
global_model_path = "global_model.h5"  # make sure this path is correct
global_model = load_model(global_model_path)
print("[OK] Global model loaded successfully.\n")

# -------------------------------
# Step 2: Define hospital dataset paths
# -------------------------------
hospital_dirs = {
    "Hospital A": "hospitals/hospital_A",
    "Hospital B": "hospitals/hospital_B",
    "Hospital C": "hospitals/hospital_C"
}

# -------------------------------
# Step 3: Load datasets
# -------------------------------
test_datasets = {}
for name, path in hospital_dirs.items():
    if not os.path.exists(path):
        print(f"[WARNING] Warning: Path does not exist -> {path}")
        continue
    
    test_datasets[name] = image_dataset_from_directory(
        path,
        labels="inferred",
        label_mode="int",   # use 'int' for binary classification
        image_size=(64, 64),      # match model input size
        batch_size=32,
        shuffle=False
    )
    print(f"[OK] Loaded dataset for {name}")

print("\n")

# -------------------------------
# Step 4: Evaluate global model on each hospital
# -------------------------------
print("[STATS] Global Model Accuracy on Each Hospital Dataset:\n")
for name, dataset in test_datasets.items():
    loss, accuracy = global_model.evaluate(dataset, verbose=0)
    print(f"{name}: {accuracy*100:.2f}%")