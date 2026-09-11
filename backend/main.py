from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, RedirectResponse
from fastapi import HTTPException, Depends, Header
import uuid
import json as pyjson

# Simple in-memory token store: token -> hospital_id
_TOKENS = {}

# Helper placeholders for hospitals; will be loaded after BASE_DIR is set
_HOSP_DATA = []

def get_hospital_by_id(hid):
    for h in _HOSP_DATA:
        if h.get("id") == hid:
            return h
    return None

def require_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")
    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(status_code=401, detail="Invalid Authorization header")
    token = parts[1]
    hid = _TOKENS.get(token)
    if not hid:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return hid
import tensorflow as tf
import numpy as np
import os
from PIL import Image
import io
import json
import requests

# ---------------------------
# App Initialization
# ---------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Paths
# ---------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "saved_model", "my_model")  # SavedModel folder
CONFIG_PATH = os.path.join(BASE_DIR, "model_config.json")
DATASET_DIR = os.path.join(BASE_DIR, "dataset")

# Load hospital credentials (moved here so BASE_DIR and os are defined)
HOSPITALS_PATH = os.path.join(BASE_DIR, "hospitals.json")
try:
    with open(HOSPITALS_PATH, "r") as hf:
        _HOSP_DATA = pyjson.load(hf).get("hospitals", [])
except Exception:
    _HOSP_DATA = []

# ---------------------------
# Load Configuration
# ---------------------------
try:
    with open(CONFIG_PATH, "r") as f:
        model_config = json.load(f)
        metrics = model_config.get("model_metrics", {})
except:
    metrics = {
        "connected_hospitals": 3,
        "training_rounds": 3,
        "hospital_accuracies": {
            "Hospital A": 82,
            "Hospital B": 85,
            "Hospital C": 88
        },
        "current_accuracy": 88,
        "model_type": "CNN - Binary Classification",
        "input_shape": "64x64x3",
        "classes": ["Normal", "Pneumonia"]
    }

# ---------------------------
# Load Model on Startup
# ---------------------------
global_model = None

@app.on_event("startup")
def load_model():
    global global_model
    try:
        # Prefer SavedModel directory
        if os.path.exists(MODEL_DIR):
            tf.config.set_visible_devices([], "GPU")  # CPU-only
            global_model = tf.keras.models.load_model(MODEL_DIR, compile=False)
            print("[OK] Global model loaded successfully (SavedModel format)")
        else:
            # Fallback: try loading an HDF5 model `global_model.h5` if present
            h5_path = os.path.join(BASE_DIR, "global_model.h5")
            if os.path.exists(h5_path):
                tf.config.set_visible_devices([], "GPU")  # CPU-only
                global_model = tf.keras.models.load_model(h5_path, compile=False)
                print("[OK] Global model loaded successfully (HDF5 file)")
            else:
                print("[WARNING] SavedModel folder not found:", MODEL_DIR)
                print("[INFO] Also did not find global_model.h5 at:", h5_path)
                global_model = None
    except Exception as e:
        print("[ERROR] Error loading model:", e)
        # Try to build model architecture from `model.py` and load weights
        try:
            import sys
            parent_dir = os.path.abspath(os.path.join(BASE_DIR, '..'))
            if parent_dir not in sys.path:
                sys.path.insert(0, parent_dir)
            import model as model_module
        except Exception as imp_e:
            print("[WARN] Could not import model module from parent dir:", imp_e)
            model_module = None

        if model_module and hasattr(model_module, "create_model"):
            try:
                built = model_module.create_model()
                h5_path = os.path.join(BASE_DIR, "global_model.h5")
                if os.path.exists(h5_path):
                    try:
                        built.load_weights(h5_path)
                        global_model = built
                        print("[OK] Loaded weights into rebuilt model from global_model.h5")
                    except Exception as exw:
                        print("[WARN] Could not load weights into rebuilt model with strict loading:", exw)
                        # Try a more forgiving load by name and skipping mismatches
                        try:
                            built.load_weights(h5_path, by_name=True, skip_mismatch=True)
                            global_model = built
                            print("[OK] Loaded weights into rebuilt model using by_name=True, skip_mismatch=True")
                        except Exception as exw2:
                            print("[ERROR] Forced weight load also failed:", exw2)
                            global_model = built
                else:
                    global_model = built
                    print("[INFO] Rebuilt model architecture, no weights found to load")
            except Exception as exb:
                print("[ERROR] Failed to rebuild model architecture:", exb)
                global_model = None
        else:
            global_model = None

# ---------------------------
# Helper Functions
# ---------------------------
def get_training_data():
    training_rounds = metrics.get("training_rounds", 3)
    hospital_accuracies = metrics.get("hospital_accuracies", {})
    hospitals = list(hospital_accuracies.keys())
    training_data = [
        {"round": i + 1, "hospital": hospitals[i % len(hospitals)], "accuracy": accuracy}
        for i, (_, accuracy) in enumerate(hospital_accuracies.items())
    ]
    return training_data

def get_hospital_accuracies():
    return metrics.get("hospital_accuracies", {})

# ---------------------------
# API Endpoints
# ---------------------------
@app.get("/training")
def training_endpoint():
    return get_training_data()

@app.get("/status")
def status_endpoint():
    return {
        "connected_hospitals": metrics.get("connected_hospitals", 3),
        "training_rounds": metrics.get("training_rounds", 3),
        "current_accuracy": metrics.get("current_accuracy", 88),
        "model_loaded": global_model is not None,
        "model_type": metrics.get("model_type"),
        "input_shape": metrics.get("input_shape"),
        "classes": metrics.get("classes")
    }

@app.get("/hospital-accuracies")
def hospital_accuracies_endpoint():
    return get_hospital_accuracies()

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if global_model is None:
        return {"error": "Model not loaded"}
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        if image.mode != "RGB":
            image = image.convert("RGB")
        image = image.resize((64, 64))
        image_array = np.expand_dims(np.array(image).astype(np.float32) / 255.0, axis=0)
        prediction = global_model.predict(image_array, verbose=0)
        confidence_score = float(prediction[0][0])
        threshold = 0.46

        # The model's output `confidence_score` is the probability of Pneumonia (label 1)
        pneumonia_prob = confidence_score * 100
        normal_prob = (1 - confidence_score) * 100

        # Decide predicted class based on threshold applied to pneumonia probability
        predicted_class = "Pneumonia" if confidence_score > threshold else "Normal"

        # Reported confidence corresponds to the chosen class probability
        reported_confidence = round(pneumonia_prob, 2) if predicted_class == "Pneumonia" else round(normal_prob, 2)

        # Human-friendly confidence level
        max_prob = max(normal_prob, pneumonia_prob)
        if max_prob >= 75:
            confidence_level = "High"
        elif max_prob >= 50:
            confidence_level = "Medium"
        else:
            confidence_level = "Low"

        return {
            "file_name": file.filename,
            "prediction": predicted_class,
            "confidence": reported_confidence,
            "model_confidence": confidence_level,
            "normal_probability": round(normal_prob, 2),
            "pneumonia_probability": round(pneumonia_prob, 2),
            "raw_prediction": round(confidence_score, 4)
        }
    except Exception as e:
        return {"error": str(e)}

@app.get("/sample-images")
def sample_images_endpoint():
    samples = {"normal": [], "pneumonia": []}
    try:
        normal_path = os.path.join(DATASET_DIR, "normal")
        pneumonia_path = os.path.join(DATASET_DIR, "pneumonia")
        if os.path.exists(normal_path):
            samples["normal"] = os.listdir(normal_path)[:3]
        if os.path.exists(pneumonia_path):
            samples["pneumonia"] = os.listdir(pneumonia_path)[:3]
        return samples
    except Exception as e:
        return {"error": str(e)}

@app.get("/sample-image/{category}/{filename}")
def sample_image_endpoint(category: str, filename: str, authorization: str = Header(None)):
    # Public dataset categories
    if category in ["normal", "pneumonia"]:
        file_path = os.path.join(DATASET_DIR, category, filename)
        if os.path.exists(file_path):
            return FileResponse(file_path, media_type="image/jpeg")
        return {"error": "File not found"}

    # Hospital uploads require authentication
    if category == "uploads":
        if not authorization:
            raise HTTPException(status_code=401, detail="Authorization required")
        parts = authorization.split()
        if len(parts) != 2 or parts[0].lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid Authorization header")
        token = parts[1]
        hid = _TOKENS.get(token)
        if not hid:
            raise HTTPException(status_code=401, detail="Invalid or expired token")
        file_path = os.path.join(BASE_DIR, "hospitals", hid, "uploads", filename)
        if os.path.exists(file_path):
            return FileResponse(file_path, media_type="image/jpeg")
        return {"error": "File not found"}

    return {"error": "Unknown category"}

@app.get("/model-stats")
def model_stats_endpoint():
    if global_model is None:
        return {"error": "Model not loaded"}
    return {
        "model_loaded": True,
        "model_path": MODEL_DIR,
        "input_shape": [64, 64, 3],
        "output_shape": 1,
        "task": "Binary Classification",
        "classes": ["Normal", "Pneumonia"]
    }


@app.post("/login")
async def login(payload: dict):
    """Login with {"hospital_id":"...","password":"..."} returns token."""
    hid = payload.get("hospital_id")
    pwd = payload.get("password")
    if not hid or not pwd:
        raise HTTPException(status_code=400, detail="hospital_id and password required")
    hosp = get_hospital_by_id(hid)
    if not hosp or hosp.get("password") != pwd:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = str(uuid.uuid4())
    _TOKENS[token] = hid
    return {"token": token, "hospital_id": hid, "hospital_name": hosp.get("name")}


@app.post("/signup")
async def signup(payload: dict):
    """Signup with {hospital_id, name, password} - demo only (writes to hospitals.json)"""
    hid = payload.get("hospital_id")
    name = payload.get("name")
    pwd = payload.get("password")
    if not hid or not pwd or not name:
        raise HTTPException(status_code=400, detail="hospital_id, name and password required")
    # check exists
    if any(h.get("id") == hid for h in _HOSP_DATA):
        raise HTTPException(status_code=400, detail="hospital_id already exists")
    entry = {"id": hid, "name": name, "password": pwd}
    _HOSP_DATA.append(entry)
    try:
        with open(HOSPITALS_PATH, "w") as hf:
            pyjson.dump({"hospitals": _HOSP_DATA}, hf, indent=2)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save hospitals: {e}")
    token = str(uuid.uuid4())
    _TOKENS[token] = hid
    return {"token": token, "hospital_id": hid, "hospital_name": name}


@app.post("/login-google")
async def login_google(payload: dict):
    """Accepts {'id_token': '<Google ID token>'}, verifies with Google, issues demo token."""
    id_token = payload.get("id_token")
    if not id_token:
        raise HTTPException(status_code=400, detail="id_token required")
    # Verify token with Google's tokeninfo endpoint
    try:
        resp = requests.get("https://oauth2.googleapis.com/tokeninfo", params={"id_token": id_token}, timeout=5)
        if resp.status_code != 200:
            raise HTTPException(status_code=401, detail="Invalid Google ID token")
        info = resp.json()
        email = info.get("email")
        name = info.get("name") or email
        if not email:
            raise HTTPException(status_code=400, detail="Google token did not contain email")
        # create a demo hospital entry if not present
        if not any(h.get("id") == email for h in _HOSP_DATA):
            _HOSP_DATA.append({"id": email, "name": name, "password": ""})
            try:
                with open(HOSPITALS_PATH, "w") as hf:
                    pyjson.dump({"hospitals": _HOSP_DATA}, hf, indent=2)
            except Exception:
                pass
        token = str(uuid.uuid4())
        _TOKENS[token] = email
        return {"token": token, "hospital_id": email, "hospital_name": name}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/upload-data")
async def upload_data(files: list[UploadFile] = File(...), hospital_id: str = Depends(require_token)):
    """Upload files for the authenticated hospital. Saves under `hospitals/{hospital_id}/uploads/`"""
    save_dir = os.path.join(BASE_DIR, "hospitals", hospital_id, "uploads")
    os.makedirs(save_dir, exist_ok=True)
    saved = []
    for f in files:
        dest = os.path.join(save_dir, f.filename)
        with open(dest, "wb") as out:
            out.write(await f.read())
        saved.append(f.filename)
    return {"saved": saved}


@app.get("/my-samples")
def my_samples(hospital_id: str = Depends(require_token)):
    samples_dir = os.path.join(BASE_DIR, "hospitals", hospital_id, "uploads")
    if not os.path.exists(samples_dir):
        return {"files": []}
    files = [f for f in os.listdir(samples_dir) if os.path.isfile(os.path.join(samples_dir, f))]
    return {"files": files}

# ---------------------------
# Run Locally / Render
# ---------------------------
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)


# Redirect root to docs to avoid returning a generic 404 'Not Found'
@app.get("/")
def root_redirect():
    return RedirectResponse(url="/docs")