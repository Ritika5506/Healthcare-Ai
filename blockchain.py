import hashlib
import json
import os

def hash_parameters(parameters):
    """Hash the model parameters for integrity."""
    params_str = json.dumps([p.tolist() for p in parameters], sort_keys=True)
    return hashlib.sha256(params_str.encode()).hexdigest()

class Blockchain:
    def __init__(self, filename='blockchain.json'):
        self.filename = filename
        self.chain = self.load_chain()

    def load_chain(self):
        if os.path.exists(self.filename):
            with open(self.filename, 'r') as f:
                return json.load(f)
        return []

    def save_chain(self):
        with open(self.filename, 'w') as f:
            json.dump(self.chain, f)

    def add_block(self, data):
        prev_hash = self.chain[-1]['hash'] if self.chain else '0'
        block = {
            'data': data,
            'prev_hash': prev_hash,
            'hash': self.hash_block(data, prev_hash)
        }
        self.chain.append(block)
        self.save_chain()

    def hash_block(self, data, prev_hash):
        block_string = json.dumps({'data': data, 'prev_hash': prev_hash}, sort_keys=True)
        return hashlib.sha256(block_string.encode()).hexdigest()

    def is_valid_hash(self, hash_value):
        for block in self.chain:
            if block['hash'] == hash_value:
                return True
        return False