import tensorflow as tf
import os

# get project root
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

model_path = os.path.join(project_root, "global_model.h5")

print("Loading model from:", model_path)

model = tf.keras.models.load_model(model_path, compile=False)

print("Saving compatible model...")

fixed_path = os.path.join(project_root, "global_model_fixed.h5")

model.save(fixed_path)

print("Model saved successfully:", fixed_path)