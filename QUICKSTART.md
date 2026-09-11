# Healthcare Federated AI - Quick Start Guide

## 📋 Prerequisites
- Python 3.8+
- Node.js 14+
- pip (Python package manager)
- npm (Node package manager)

## ⚡ Quick Start (Windows)

### Option 1: Automatic Setup (Recommended)
1. Double-click `SETUP_AND_RUN.bat` in the root directory
2. Follow the instructions on screen
3. This will install all dependencies and create necessary directories

### Option 2: Manual Setup

#### Step 1: Install Python Dependencies
```batch
pip install -r requirements.txt
```

#### Step 2: Install Frontend Dependencies
```batch
cd dashboard
npm install
cd ..
```

#### Step 3: Create Dataset Directories
```batch
mkdir dataset\normal
mkdir dataset\pneumonia
mkdir hospitals\hospital_A\normal
mkdir hospitals\hospital_A\pneumonia
mkdir hospitals\hospital_B\normal
mkdir hospitals\hospital_B\pneumonia
mkdir hospitals\hospital_C\normal
mkdir hospitals\hospital_C\pneumonia
```

---

## 🚀 Running the Application

You'll need **3 separate terminal windows**:

### Terminal 1: Backend API Server
```batch
cd backend
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Or simply run:
```batch
backend\start_backend.bat
```

**Expected Output:**
```
✅ Application startup complete
Uvicorn running on http://127.0.0.1:8000
```

### Terminal 2: Frontend Dashboard
```batch
cd dashboard
npm start
```

Or simply run:
```batch
dashboard\start_dashboard.bat
```

**Expected Output:**
```
Compiled successfully!
You can now view frontend in the browser.
Local: http://localhost:3000
```

### Terminal 3: (Optional) Federated Learning Server
```batch
python server\server.py
```

**Expected Output:**
```
INFO gRPC server running on 0.0.0.0:8080
```

---

## 🌐 Access Points

Once everything is running:

| Component | URL | Purpose |
|-----------|-----|---------|
| **Dashboard** | http://localhost:3000 | Upload images and see predictions |
| **Backend API** | http://127.0.0.1:8000 | REST API endpoints |
| **API Documentation** | http://127.0.0.1:8000/docs | Interactive API docs (Swagger) |
| **API Redoc** | http://127.0.0.1:8000/redoc | Alternative API documentation |

---

## 📌 Available API Endpoints

### 1. **Get System Status**
```bash
GET http://127.0.0.1:8000/status
```
Returns: Connected hospitals, training rounds, current accuracy, model status

### 2. **Get Training Data**
```bash
GET http://127.0.0.1:8000/training
```
Returns: Training history with hospital accuracies

### 3. **Make Prediction**
```bash
POST http://127.0.0.1:8000/predict
```
Upload an X-ray image to get pneumonia detection prediction

### 4. **Get Sample Images**
```bash
GET http://127.0.0.1:8000/sample-images
```
Returns: List of available test images

### 5. **Get Hospital Accuracies**
```bash
GET http://127.0.0.1:8000/hospital-accuracies
```
Returns: Accuracy metrics for each hospital

### 6. **Get Model Stats**
```bash
GET http://127.0.0.1:8000/model-stats
```
Returns: Model architecture and configuration

---

## 🔧 Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'fastapi'"
**Solution:** Install Python dependencies
```batch
pip install -r requirements.txt
```

### Issue: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Issue: "Python: command not found"
**Solution:** Install Python from https://www.python.org/

### Issue: "Address already in use" on port 8000
**Solution:** The backend is already running. Check if another terminal has it open, or use a different port:
```batch
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8001
```

### Issue: Frontend not connecting to backend
**Solution:** Make sure backend is running on http://127.0.0.1:8000 before starting frontend

### Issue: Model prediction gives error
**Solution:** Make sure `global_model.h5` exists in the root directory. If not, the server will create it on first startup.

---

## 📁 Project Structure

```
Healthcare_fedrated_ai/
├── backend/                    # FastAPI backend server
│   ├── main.py                # Main API application
│   ├── start_backend.bat       # Startup script
│   └── start_server.bat        # Alternative startup
├── dashboard/                  # React frontend
│   ├── public/                # Static files
│   ├── src/                   # React components
│   ├── package.json           # NPM dependencies
│   └── start_dashboard.bat    # Startup script
├── code/                      # Federated learning clients
│   ├── hospital1.py           # Hospital A client
│   ├── hospital2.py           # Hospital B client
│   ├── hospital3.py           # Hospital C client
│   └── split_dataset.py       # Data preprocessing
├── server/                    # Federated learning server
│   ├── server.py              # Flower FL server
│   └── test_global_model.py   # Model testing utility
├── dataset/                   # Dataset directory
├── hospitals/                 # Federated hospital datasets
├── model.py                   # AI model definition
├── blockchain.py              # Blockchain integration
├── requirements.txt           # Python dependencies
└── SETUP_AND_RUN.bat         # Automatic setup script
```

---

## 🏥 Working with Hospital Clients

To run federated learning with hospital clients:

### Terminal 4: Hospital A Client
```batch
python code\hospital1.py
```

### Terminal 5: Hospital B Client
```batch
python code\hospital2.py
```

### Terminal 6: Hospital C Client
```batch
python code\hospital3.py
```

These will connect to the FL server running in Terminal 3.

---

## 🛠️ Development Notes

- **Backend Framework:** FastAPI with Uvicorn
- **Frontend Framework:** React 19 with Material-UI 7
- **ML Framework:** TensorFlow 2.15
- **Federated Learning:** Flower (FLWR)
- **Model Type:** CNN (Convolutional Neural Network)
- **Task:** Binary Classification (Normal vs Pneumonia X-rays)
- **Input Shape:** 64x64x3 (RGB images)

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review API documentation at http://127.0.0.1:8000/docs
3. Check console output for detailed error messages
4. Ensure all terminals are open and services are running

---

## ✅ Verification

To verify everything is working:

1. **Check Backend:** Open browser to http://127.0.0.1:8000/status
   - Should return JSON with system status

2. **Check Frontend:** Open browser to http://localhost:3000
   - Should see the dashboard interface

3. **Check API Docs:** Open browser to http://127.0.0.1:8000/docs
   - Should show interactive API documentation

---

## 🎉 You're All Set!

Your Healthcare Federated AI system is now ready to use. Start with the Dashboard at http://localhost:3000!
