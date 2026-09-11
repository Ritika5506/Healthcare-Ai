import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.getcwd())))
from model import create_model

print('Working dir:', os.getcwd())
model = create_model()
h5_path = os.path.join(os.getcwd(), 'backend', 'global_model.h5')
print('Looking for:', h5_path)
if not os.path.exists(h5_path):
    print('global_model.h5 not found')
    sys.exit(2)

try:
    model.load_weights(h5_path)
    print('[OK] Loaded weights with strict load')
    sys.exit(0)
except Exception as e:
    print('[WARN] Strict load failed:', e)

try:
    model.load_weights(h5_path, by_name=True, skip_mismatch=True)
    print('[OK] Loaded weights with by_name=True, skip_mismatch=True')
    sys.exit(0)
except Exception as e2:
    print('[ERROR] Forced load failed:', e2)
    sys.exit(3)
