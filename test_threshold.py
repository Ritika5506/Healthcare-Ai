import tensorflow as tf
import numpy as np
from PIL import Image
import os

# Load model
print("Loading model...")
model = tf.keras.models.load_model("global_model.h5")
print("Model loaded successfully!\n")

# Test directories
normal_path = "dataset/normal"
pneumonia_path = "dataset/pneumonia"

def process_image(image_path):
    """Process image with simple rescaling (matching training)"""
    img = Image.open(image_path)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    img = img.resize((64, 64), Image.LANCZOS)
    arr = np.array(img).astype(np.float32) / 255.0
    arr = np.expand_dims(arr, axis=0)
    return arr

print("="*80)
print("TESTING WITH CORRECTED THRESHOLD = 0.46")
print("="*80)

threshold = 0.46
all_results = []

# Test Normal images
if os.path.exists(normal_path):
    normal_files = [f for f in os.listdir(normal_path) if f.endswith(('.jpg', '.jpeg', '.png'))][:5]
    print(f"\nTesting NORMAL images ({len(normal_files)} samples):")
    
    for filename in normal_files:
        img_path = os.path.join(normal_path, filename)
        try:
            arr = process_image(img_path)
            pred = model.predict(arr, verbose=0)[0][0]
            classification = "Pneumonia" if pred > threshold else "Normal"
            print(f"  {filename[:40]:40s} | Score: {pred:.4f} | Pred: {classification}")
            all_results.append(("Normal", pred, classification))
        except:
            pass

# Test Pneumonia images
if os.path.exists(pneumonia_path):
    pneumonia_files = [f for f in os.listdir(pneumonia_path) if f.endswith(('.jpg', '.jpeg', '.png'))][:5]
    print(f"\nTesting PNEUMONIA images ({len(pneumonia_files)} samples):")
    
    for filename in pneumonia_files:
        img_path = os.path.join(pneumonia_path, filename)
        try:
            arr = process_image(img_path)
            pred = model.predict(arr, verbose=0)[0][0]
            classification = "Pneumonia" if pred > threshold else "Normal"
            print(f"  {filename[:40]:40s} | Score: {pred:.4f} | Pred: {classification}")
            all_results.append(("Pneumonia", pred, classification))
        except:
            pass

# Analyze results
print("\n" + "="*80)
print("SUMMARY")
print("="*80)

normal_correct = sum(1 for label, _, pred in all_results if label == "Normal" and pred == "Normal")
normal_total = sum(1 for label, _, _ in all_results if label == "Normal")
pneumonia_correct = sum(1 for label, _, pred in all_results if label == "Pneumonia" and pred == "Pneumonia")
pneumonia_total = sum(1 for label, _, _ in all_results if label == "Pneumonia")

print(f"Normal Accuracy: {normal_correct}/{normal_total} = {(normal_correct/normal_total*100):.1f}%" if normal_total > 0 else "No Normal images tested")
print(f"Pneumonia Accuracy: {pneumonia_correct}/{pneumonia_total} = {(pneumonia_correct/pneumonia_total*100):.1f}%" if pneumonia_total > 0 else "No Pneumonia images tested")

if all_results:
    normal_scores = [pred for label, pred, _ in all_results if label == "Normal"]
    pneumonia_scores = [pred for label, pred, _ in all_results if label == "Pneumonia"]
    
    print(f"\nScore Ranges:")
    print(f"  Normal images: {min(normal_scores):.4f} - {max(normal_scores):.4f}" if normal_scores else "  No Normal images")
    print(f"  Pneumonia images: {min(pneumonia_scores):.4f} - {max(pneumonia_scores):.4f}" if pneumonia_scores else "  No Pneumonia images")
    print(f"  Threshold: {threshold:.4f}")
