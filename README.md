# 🏥 Healthcare Federated AI System

> A complete federated learning system for healthcare AI with a modern dashboard, global cryptographic verification, and multi-hospital pneumonia detection.

![Status](https://img.shields.io/badge/Status-Ready%20to%20Use-brightgreen)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![Node.js](https://img.shields.io/badge/Node.js-14%2B-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🎯 Features

✅ **Federated Learning** - Train models across multiple hospitals without sharing raw data  
✅ **Privacy-First** - Blockchain verification for secure model aggregation  
✅ **AI Predictions** - Real-time pneumonia detection from X-ray images  
✅ **Modern Dashboard** - React-based UI with real-time metrics and visualizations  
✅ **REST API** - Complete API for programmatic access  
✅ **Multi-Hospital** - Seamless coordination between Hospital A, B, and C  
✅ **Production Ready** - FastAPI backend with CORS support  

---

## 🚀 Quick Start

### ⚡ Fastest Way (Automatic Setup)
Simply run this in your project directory:
```batch
SETUP_AND_RUN.bat
```
Then follow the on-screen instructions.

### 📋 Manual Setup
1. **Install dependencies:**
   ```batch
   pip install -r requirements.txt
   cd dashboard && npm install && cd ..
   ```

2. **Start Backend (Terminal 1):**
   ```batch
   cd backend
   python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

3. **Start Frontend (Terminal 2):**
   ```batch
   cd dashboard
   npm start
   ```

4. **Open Browser:**
   - Dashboard: http://localhost:3000
   - API: http://127.0.0.1:8000
   - API Docs: http://127.0.0.1:8000/docs

---

## 📁 Project Structure

```
Healthcare_fedrated_ai/
│
├── 📁 backend/                         # FastAPI REST API Server
│   ├── main.py                        # API endpoints & model integration
│   ├── start_backend.bat              # Backend startup script
│   └── start_server.bat               # Alternative startup
│
├── 📁 dashboard/                       # React Frontend Application
│   ├── public/                        # Static assets
│   ├── src/
│   │   ├── components/               # React components
│   │   ├── pages/                    # Page components
│   │   ├── App.js                    # Main app component
│   │   └── index.js                  # App entry point
│   ├── package.json                  # NPM dependencies
│   └── start_dashboard.bat           # Frontend startup script
│
├── 📁 code/                            # Federated Learning Clients
│   ├── hospital1.py                  # Hospital A FL client
│   ├── hospital2.py                  # Hospital B FL client
│   ├── hospital3.py                  # Hospital C FL client
│   ├── split_dataset.py              # Dataset preprocessing
│   └── *.bat                         # Hospital startup scripts
│
├── 📁 server/                          # Federated Learning Server
│   ├── server.py                     # Flower FL aggregator
│   └── test_global_model.py          # Model testing utility
│
├── 📁 dataset/                         # Central Dataset Repository
│   ├── normal/                       # Normal X-ray samples
│   └── pneumonia/                    # Pneumonia X-ray samples
│
├── 📁 hospitals/                       # Hospital-Specific Datasets
│   ├── hospital_A/{normal, pneumonia}/
│   ├── hospital_B/{normal, pneumonia}/
│   └── hospital_C/{normal, pneumonia}/
│
├── 📁 federated/                       # Federated learning configs
│
├── model.py                            # CNN Model Definition (64x64x3 → Binary)
├── blockchain.py                       # Blockchain verification system
├── requirements.txt                    # Python dependencies
├── setup.bat                           # Setup script
├── SETUP_AND_RUN.bat                  # Complete setup automation
├── RUN_ALL.bat                        # Run all services at once
│
└── README.md                           # This file
```

---

## 🌐 API Endpoints

All endpoints are accessible at `http://127.0.0.1:8000`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/status` | GET | System status & statistics |
| `/training` | GET | Training rounds & accuracies |
| `/predict` | POST | Predict on uploaded X-ray image |
| `/hospital-accuracies` | GET | Accuracy metrics per hospital |
| `/sample-images` | GET | Available test images |
| `/sample-image/{category}/{filename}` | GET | Get specific sample image |
| `/model-stats` | GET | Model architecture info |
| `/docs` | GET | Interactive API documentation (Swagger UI) |
| `/redoc` | GET | Alternative API documentation |

### Example: Make a Prediction
```bash
curl -X POST http://127.0.0.1:8000/predict \
  -F "file=@path/to/xray.jpg"
```

---

## 📊 Dashboard Features

The React dashboard includes:

- 🔬 **Prediction Panel** - Upload X-rays and get instant results
- 📈 **Accuracy Charts** - Visual representation of model performance
- 🏥 **Hospital Metrics** - Per-hospital contribution & accuracy tracking
- 📊 **Real-time Stats** - System statistics and model status
- 📁 **Sample Browser** - Test with pre-loaded X-ray samples
- 🎨 **Modern UI** - Material-UI components for professional appearance

---

## 🔧 Technology Stack

**Backend:**
- FastAPI 0.109.0 - High-performance web framework
- TensorFlow 2.15 - ML/DL framework
- Uvicorn - ASGI application server
- Flower 1.8.0 - Federated learning framework

**Frontend:**
- React 19 - UI library
- Material-UI 7 - Component library
- Chart.js - Data visualization
- Axios - HTTP client

**ML:**
- CNN Architecture (Conv2D → MaxPool → Dense)
- Input: 64×64 RGB X-ray images
- Output: Binary classification (Normal/Pneumonia)
- Optimizer: Adam
- Loss: Binary Crossentropy

---

## 🏃 Running the System

### Option 1: Run Everything at Once
```batch
RUN_ALL.bat
```
Opens 3 windows automatically (FL Server, Backend, Frontend)

### Option 2: Run Step by Step
**Terminal 1 - Backend:**
```batch
backend\start_backend.bat
```

**Terminal 2 - Frontend:**
```batch
dashboard\start_dashboard.bat
```

**Terminal 3 - FL Server (Optional):**
```batch
python server\server.py
```

**Terminal 4+ - Hospital Clients (Optional):**
```batch
python code\hospital1.py
python code\hospital2.py
python code\hospital3.py
```

---

## ✅ Verification Checklist

After starting the system:

- [ ] Backend running on http://127.0.0.1:8000
- [ ] Frontend running on http://localhost:3000
- [ ] API docs accessible at http://127.0.0.1:8000/docs
- [ ] Model loaded successfully (check console output)
- [ ] Dashboard displays without errors
- [ ] Can upload image files for prediction

---

## 🛠️ Troubleshooting

### Backend won't start
```batch
# Check dependencies
pip list | findstr fastapi
pip list | findstr tensorflow

# Reinstall
pip install -r requirements.txt
```

### Frontend won't start
```batch
cd dashboard
npm install
npm start
```

### Port 8000 already in use
```batch
# Use a different port
python -m uvicorn backend.main:app --reload --port 8001
```

### Model not found error
- Place `global_model.h5` in the root directory, OR
- The backend will create a new model on first startup

### CORS errors
- Ensure backend is running before frontend
- Check http://127.0.0.1:8000 is accessible

---

## 📚 Additional Resources

- **QUICKSTART.md** - Detailed step-by-step guide
- **README_DASHBOARD.md** - Dashboard-specific documentation
- **INTEGRATION_GUIDE.md** - Model integration details
- **API Docs** - http://127.0.0.1:8000/docs (when backend is running)

---

## 🔐 Security Features

✅ **Blockchain Verification** - All model aggregations are cryptographically verified  
✅ **Hash-based Integrity** - Parameter hashing prevents tampering  
✅ **CORS Protection** - Cross-origin requests are controlled  
✅ **Federated Privacy** - Raw patient data never leaves hospitals  

---

## 📈 Model Information

- **Type:** Convolutional Neural Network (CNN)
- **Architecture:**
  - Conv2D(32, 3x3) + ReLU + MaxPool
  - Conv2D(64, 3x3) + ReLU + MaxPool
  - Flatten → Dense(128, ReLU) → Dense(1, Sigmoid)
- **Input:** 64×64 RGB images
- **Output:** Probability of Pneumonia (0-1)
- **Classes:** Normal, Pneumonia
- **Optimizer:** Adam
- **Loss:** Binary Crossentropy
- **Metrics:** Accuracy

---

## 🎓 Use Cases

1. **Hospitals** - Upload chest X-rays for quick pneumonia screening
2. **Researchers** - Study federated learning in healthcare
3. **Developers** - Reference implementation for distributed ML
4. **Organizations** - Privacy-preserving AI for multi-site systems

---

## 📞 Support & Issues

1. Check **QUICKSTART.md** for detailed instructions
2. Review console output for error messages
3. Verify all prerequisites are installed
4. Check API documentation at http://127.0.0.1:8000/docs
5. Ensure all services are running in separate terminals

---

## 📄 License

This project is provided as-is for educational and research purposes.

---

## 🎉 Getting Started

1. **Setup:** Run `SETUP_AND_RUN.bat`
2. **Start:** Open 2 terminals and run backend + frontend
3. **Access:** Open http://localhost:3000
4. **Test:** Upload an X-ray image for prediction

---

## 📝 Notes

- Backend API documentation: http://127.0.0.1:8000/docs
- Default model input: 64×64 RGB images
- Predictions: Real-time with confidence scores
- Federated learning: Optional (requires all hospital clients)
- Blockchain: Enables secure multi-hospital aggregation

---

**Enjoy using Healthcare Federated AI System! 🚀**
