import tensorflow as tf
import numpy as np
from PIL import Image
import os

# Load model
print("Loading model...")
model = tf.keras.models.load_model("global_model.h5")
print("Model loaded successfully!")

# Test directories
normal_path = "dataset/normal"
pneumonia_path = "dataset/pneumonia"

def process_image(image_path):
    """Process image exactly like in training (flow_from_directory)"""
    img = Image.open(image_path)
    # Convert to RGB if needed
    if img.mode != 'RGB':
        img = img.convert('RGB')
    # Resize
    img = img.resize((64, 64))
    # Convert to array
    arr = np.array(img).astype(np.float32) / 255.0
    # Add batch dimension
    arr = np.expand_dims(arr, axis=0)
    return arr

print("\n" + "="*80)
print("TESTING WITH ACTUAL DATASET IMAGES")
print("="*80)

# Test Normal images
if os.path.exists(normal_path):
    normal_files = [f for f in os.listdir(normal_path) if f.endswith(('.jpg', '.jpeg', '.png'))][:3]
    print("\nTesting NORMAL images (" + str(len(normal_files)) + " samples):")
    
    for filename in normal_files:
        img_path = os.path.join(normal_path, filename)
        arr = process_image(img_path)
        pred = model.predict(arr, verbose=0)[0][0]
        classification = "Normal" if pred < 0.5 else "Pneumonia"
        print(f"  {filename}")
        print(f"    Raw Score: {pred:.4f} -> Classified as: {classification}")

# Test Pneumonia images
if os.path.exists(pneumonia_path):
    pneumonia_files = [f for f in os.listdir(pneumonia_path) if f.endswith(('.jpg', '.jpeg', '.png'))][:3]
    print("\nTesting PNEUMONIA images (" + str(len(pneumonia_files)) + " samples):")
    
    for filename in pneumonia_files:
        img_path = os.path.join(pneumonia_path, filename)
        arr = process_image(img_path)
        pred = model.predict(arr, verbose=0)[0][0]
        classification = "Normal" if pred < 0.5 else "Pneumonia"
        print(f"  {filename}")
        print(f"    Raw Score: {pred:.4f} -> Classified as: {classification}")

print("\n" + "="*80)
print("ANALYSIS")
print("="*80)
print("""
Label Mapping (from ImageDataGenerator flow_from_directory):
  - normal folder (alphabetically first) → Label 0 (output should be ≈0.0)
  - pneumonia folder (alphabetically second) → Label 1 (output should be ≈1.0)

If predictions are inverted (Normal≈1, Pneumonia≈0):
  The model may have been trained with inverted labels
  Solution: Invert the logic (pred > 0.5 means Normal, pred < 0.5 means Pneumonia)
""")
