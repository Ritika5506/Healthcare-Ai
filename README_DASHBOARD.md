# 🏥 Healthcare Federated AI - Dashboard & Model Integration

A complete healthcare federated learning system with a modern dashboard for visualizing AI model predictions and performance metrics across multiple hospitals using pneumonia detection.

## ✨ Features

- **🤖 AI Model Integration**: Global pneumonia detection model integrated with dashboard
- **📊 Real-time Predictions**: Upload X-ray images and get instant predictions
- **🏥 Multi-Hospital Support**: Federated learning across 3 hospitals
- **📈 Performance Dashboard**: Track model accuracy and hospital contributions
- **⛓️ Blockchain Verification**: Secure verification of hospital contributions
- **🎨 Modern UI**: Built with Material-UI for intuitive user experience
- **📁 Sample Testing**: Test model with pre-loaded X-ray samples

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- `global_model.h5` (trained model)

### Instant Setup

Run the setup script:
```bash
.\setup.bat
```

This will verify Python/Node.js and install all dependencies.

### Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
python -m uvicorn main:app --reload
```

Or use the startup script:
```bash
.\backend\start_server.bat
```

**Terminal 2 - Frontend:**
```bash
cd dashboard
npm start
```

Or use the startup script:
```bash
.\dashboard\start_dashboard.bat
```

Open your browser to: **http://localhost:3000**

---

## 📋 What's Included

### Backend (`backend/main.py`)
- **FastAPI** server with CORS enabled
- **Model prediction** endpoint
- **Sample image** serving
- **Model statistics** endpoint
- **Hospital accuracy** tracking

### Dashboard Features

#### 1. 🔬 Model Prediction Panel
- Upload X-ray images (drag & drop)
- Real-time prediction results
- Confidence scores for both classes
- Visual probability indicators

#### 2. 📊 Model Status
- Model loading status
- Task description (pneumonia detection)
- Input/output dimensions
- Available classes

#### 3. 📁 Sample Testing
- Pre-loaded normal X-ray samples
- Pre-loaded pneumonia X-ray samples
- One-click testing without manual upload

#### 4. 📈 Accuracy Metrics
- Training round progression
- Per-hospital accuracy tracking
- Real-time chart visualization

#### 5. 🏥 Hospital Contributions
- Hospital participation table
- Individual accuracy metrics
- Training round information

---

## 🛠️ API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/training` | GET | Get training data and accuracies |
| `/status` | GET | Get system status and model status |
| `/predict` | POST | Upload image and get prediction |
| `/sample-images` | GET | List available sample images |
| `/sample-image/{category}/{filename}` | GET | Get specific sample image |
| `/hospital-accuracies` | GET | Get per-hospital accuracies |
| `/model-stats` | GET | Get model architecture info |

**API Documentation**: Visit `http://127.0.0.1:8000/docs` when backend is running

---

## 📂 Project Structure

```
Healthcare_fedrated_ai/
├── backend/
│   ├── main.py                    # FastAPI server with ML endpoints
│   ├── start_server.bat           # Quick start script
│   └── test_global_model.py       # Model testing utilities
│
├── dashboard/
│   ├── App.js                     # Root component
│   ├── package.json               # Dependencies
│   ├── start_dashboard.bat        # Quick start script
│   ├── components/
│   │   ├── PredictionPanel.js     # Image upload & prediction
│   │   ├── ModelStats.js          # Model status display
│   │   ├── AccuracyChart.js       # Performance chart
│   │   ├── HospitalTable.js       # Hospital metrics
│   │   ├── StatsCards.js          # Summary cards
│   │   └── Sidebar.js             # Navigation
│   ├── pages/
│   │   └── Dash.js                # Main dashboard page
│   └── public/
│       └── index.html             # HTML entry point
│
├── server/
│   ├── server.py                  # Federated learning server
│   └── test_global_model.py       # Model evaluation
│
├── code/
│   ├── hospital1.py               # Hospital 1 client
│   ├── hospital2.py               # Hospital 2 client
│   ├── hospital3.py               # Hospital 3 client
│   └── split_dataset.py           # Dataset utilities
│
├── dataset/
│   ├── normal/                    # Normal X-ray samples
│   └── pneumonia/                 # Pneumonia X-ray samples
│
├── federated/
│   ├── hospitals/                 # Hospital data partitions
│   │   ├── hospital_A/
│   │   ├── hospital_B/
│   │   └── hospital_C/
│
├── global_model.h5                # Trained global model
├── model.py                       # Model architecture
├── blockchain.py                  # Blockchain verification
├── setup.bat                      # Setup automation
└── INTEGRATION_GUIDE.md           # Detailed integration guide
```

---

## 🎯 How It Works

### Data Flow

```
┌─────────────────┐
│  User Action    │
│  (Upload Image) │
└────────┬────────┘
         │
         ▼
┌──────────────────────┐
│  React Frontend      │
│  (Dashboard)         │
└────────┬─────────────┘
         │
         │ HTTP POST
         ▼
┌──────────────────────┐
│  FastAPI Backend     │
│  (main.py)           │
└────────┬─────────────┘
         │
         │ Image Preprocessing
         ▼
┌──────────────────────┐
│  TensorFlow Model    │
│  (global_model.h5)   │
└────────┬─────────────┘
         │
         │ Prediction
         ▼
┌──────────────────────┐
│  JSON Response       │
│  (Confidence Score)  │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Dashboard Display   │
│  (Results + Chart)   │
└──────────────────────┘
```

### Prediction Process

1. **Image Upload**: User uploads X-ray image via dashboard
2. **Preprocessing**: Backend resizes to 64×64 and normalizes
3. **Inference**: Model predicts pneumonia probability
4. **Response**: Confidence scores returned to frontend
5. **Display**: Results shown with visual indicators

---

## 📊 Model Information

- **Type**: Binary Classification CNN
- **Input**: 64×64 RGB X-ray images
- **Output**: 2 classes (Normal/Pneumonia)
- **Classes**: Normal, Pneumonia
- **Training**: Federated Learning (3 hospitals)
- **Framework**: TensorFlow/Keras
- **Verification**: Blockchain-backed

---

## 🔧 Configuration

### Backend Configuration

Edit `backend/main.py` to modify:
- Model path: `global_model_path = "../global_model.h5"`
- CORS settings: Modify `allow_origins`
- Sample image path: Adjust path strings

### Frontend Configuration

Edit `dashboard/pages/Dash.js` to modify:
- Backend URL: `http://127.0.0.1:8000`
- Refresh intervals in `useEffect`
- UI theme in Material-UI props

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: "Module not found" error
```
Solution: Install dependencies
pip install fastapi uvicorn tensorflow pillow
```

**Problem**: "global_model.h5 not found"
```
Solution: Ensure model file exists in root directory
         or train a new model with server/server.py
```

**Problem**: Port 8000 already in use
```
Solution: python -m uvicorn main:app --port 8001
         Then update frontend URL to 8001
```

### Frontend Issues

**Problem**: "Cannot find module" for icons
```
Solution: npm install @mui/icons-material
```

**Problem**: API calls failing (CORS error)
```
Solution: Ensure backend is running on http://127.0.0.1:8000
         Check browser console for exact error
```

**Problem**: Images not showing in sample list
```
Solution: Verify dataset folders:
         - dataset/normal/ (with images)
         - dataset/pneumonia/ (with images)
         Restart backend server
```

---

## 📈 Performance

### Typical Query Times
- Model Loading: ~2-3 seconds (first time)
- Single Prediction: ~0.5-1 second
- Subsequent Predictions: ~0.1-0.3 seconds (cached)

### Optimization Tips
- Use SSD for faster model loading
- Deploy on GPU for faster predictions
- Enable caching for sample images
- Use image compression for uploads

---

## 🚀 Deployment

### For Production

1. **Backend**:
   ```bash
   pip install gunicorn
   gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
   ```

2. **Frontend**:
   ```bash
   npm run build
   # Deploy contents of build/ folder
   ```

3. **Security**:
   - Change `allow_origins` to specific domains
   - Use HTTPS
   - Add authentication
   - Validate image uploads

---

## 📚 Documentation

- **[Integration Guide](INTEGRATION_GUIDE.md)**: Detailed setup and API documentation
- **[Model Guide](server/test_global_model.py)**: Model evaluation examples
- **[Federated Learning](server/server.py)**: FL server implementation

---

## 🤝 Next Steps

- [ ] Add real-time training updates via WebSockets
- [ ] Implement user authentication
- [ ] Add prediction history logging
- [ ] Deploy to cloud (AWS/Azure)
- [ ] Add model versioning
- [ ] Implement automated retraining

---

## 📝 License

Healthcare Federated AI © 2024

---

## 🎓 Learning Resources

- [TensorFlow Documentation](https://tensorflow.org/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
- [Flower Federated Learning](https://flower.ai/)

---

**Ready to start? Run `.\setup.bat` and then follow the Quick Start instructions above!** 🚀
