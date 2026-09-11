# Healthcare Federated AI - Model & Dashboard Integration Guide

## 🎯 What's Been Connected

Your dashboard is now fully integrated with the global AI model! Here's what you can do:

### Features:
1. **🔬 Model Predictions**: Upload X-ray images for pneumonia detection
2. **📊 Real-time Accuracy Metrics**: View model performance across hospitals
3. **🏥 Hospital Performance**: Track contributions from each hospital
4. **📁 Sample Testing**: Test the model with pre-existing X-ray samples
5. **🤖 Model Status**: Monitor model status and architecture

---

## 📋 Setup Instructions

### 1️⃣ Install Backend Dependencies

```bash
cd backend
pip install fastapi uvicorn tensorflow pillow
```

### 2️⃣ Install Frontend Dependencies

```bash
cd dashboard
npm install
```

Note: The `package.json` now includes `@mui/icons-material` for UI icons.

---

## 🚀 Running the Application

### Terminal 1: Start the Backend Server

```bash
cd backend
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

**Expected Output:**
```
✅ Global model loaded successfully
Uvicorn running on http://127.0.0.1:8000
```

### Terminal 2: Start the Frontend

```bash
cd dashboard
npm start
```

This will open the dashboard at `http://localhost:3000`

---

## 📡 API Endpoints

All endpoints are automatically called by the dashboard, but you can test them directly:

### 1. **Get Training Data**
```bash
GET http://127.0.0.1:8000/training
```
Returns training rounds and accuracies for each hospital.

### 2. **Get System Status**
```bash
GET http://127.0.0.1:8000/status
```
Returns connected hospitals count, training rounds, and current accuracy.

### 3. **Make Prediction** (Upload Image)
```bash
POST http://127.0.0.1:8000/predict
Content-Type: multipart/form-data

Body: {
  "file": <image_file>
}
```

**Response Example:**
```json
{
  "file_name": "image.jpg",
  "prediction": "Normal",
  "confidence": 92.45,
  "normal_prob": 92.45,
  "pneumonia_prob": 7.55
}
```

### 4. **Get Sample Images**
```bash
GET http://127.0.0.1:8000/sample-images
```
Returns available sample images for testing.

### 5. **Get Model Statistics**
```bash
GET http://127.0.0.1:8000/model-stats
```
Returns model architecture and configuration.

### 6. **Get Hospital Accuracies**
```bash
GET http://127.0.0.1:8000/hospital-accuracies
```
Returns accuracy for each hospital individually.

---

## 🎨 Dashboard Components

### 1. **Model Status Section**
- Shows model status (loaded/not loaded)
- Displays task type (Binary Classification)
- Shows input size and output classes

### 2. **Prediction Panel**
- **Left side**: Upload area for X-ray images
  - Drag & drop support
  - Image preview
  - Prediction button
  - Results with confidence scores
  
- **Right side**: Sample images for testing
  - Pre-loaded normal X-rays
  - Pre-loaded pneumonia X-rays
  - One-click testing

### 3. **Accuracy Trend Chart**
- Visualizes model accuracy across training rounds
- Shows performance for each hospital

### 4. **Hospital Contributions Table**
- Lists each hospital's participation
- Shows individual hospital accuracies

### 5. **Statistics Cards**
- Connected hospitals count
- Training rounds completed
- Current average accuracy
- Model status indicator

---

## 📂 File Structure

```
healthcare_federated_ai/
├── backend/
│   └── main.py              ← Updated with prediction endpoints
├── dashboard/
│   ├── App.js
│   ├── package.json         ← Updated with @mui/icons-material
│   ├── components/
│   │   ├── PredictionPanel.js   ← NEW: Upload & predict
│   │   ├── ModelStats.js        ← NEW: Show model info
│   │   ├── AccuracyChart.js
│   │   ├── HospitalTable.js
│   │   ├── StatsCards.js
│   │   └── Sidebar.js
│   └── pages/
│       └── Dash.js          ← Updated to include new components
├── global_model.h5          ← Your trained model
├── model.py                 ← Model architecture
├── server/
│   ├── server.py
│   └── test_global_model.py
└── dataset/
    ├── normal/              ← Normal X-ray samples
    └── pneumonia/           ← Pneumonia X-ray samples
```

---

## 🧪 Testing the Integration

### Quick Test Steps:

1. **Start both servers** (backend on 8000, frontend on 3000)
2. **Open dashboard** at `http://localhost:3000`
3. **Check Model Status** section - should show "Model Loaded ✓"
4. **Test with Samples**:
   - Click on any sample X-ray button
   - Click "Predict" button
   - View the results with confidence scores
5. **Upload Custom Images**:
   - Drag & drop or select an X-ray image
   - Click "Predict"
   - See instant results

---

## 🔧 Troubleshooting

### Issue: "Model not loaded" in dashboard

**Solution:**
- Ensure `global_model.h5` exists in the root directory
- Check backend logs for model loading errors
- Backend path for model: `../global_model.h5`

### Issue: CORS errors when calling API

**Solution:**
- Backend already has CORS enabled for all origins
- Make sure backend is running on `http://127.0.0.1:8000`
- Clear browser cache and restart

### Issue: Sample images not showing

**Solution:**
- Check that dataset folders exist:
  - `dataset/normal/` with X-ray images
  - `dataset/pneumonia/` with X-ray images
- Restart backend server

### Issue: Predictions taking too long

**Solution:**
- This is normal for first prediction (model initialization)
- Subsequent predictions will be faster
- TensorFlow loads the model quickly after cache warms up

---

## 📊 How It Works

```
User Action → Frontend (React) → Backend API (FastAPI)
                                      ↓
                              TensorFlow Model
                                      ↓
                         Prediction Result → Frontend
                                      ↓
                         Display Confidence Score
```

**Flow for Predictions:**
1. User uploads/selects an X-ray image
2. Frontend sends image to `/predict` endpoint
3. Backend preprocesses image (resize to 64×64, normalize)
4. Global model makes prediction
5. Backend returns prediction + confidence score
6. Frontend displays result with confidence percentage

---

## 🎓 Model Details

- **Task**: Binary Classification (Normal vs Pneumonia)
- **Input**: 64×64 RGB images
- **Output**: 2 classes (Normal/Pneumonia)
- **Training**: Federated learning across 3 hospitals
- **Blockchain**: Verification of hospital contributions

---

## 📝 Next Steps

You can further enhance this setup by:

1. **Add Real-time Training Updates**: Use WebSockets to stream training progress
2. **Model Retraining**: Add endpoint to trigger federated learning rounds
3. **Historical Predictions**: Store and display prediction history
4. **Confidence Threshold Alerts**: Highlight uncertain predictions
5. **Model Versioning**: Track different model versions

---

## ✅ Integration Checklist

- [x] Backend API endpoints created
- [x] Frontend components created (PredictionPanel, ModelStats)
- [x] Dashboard updated to include new components
- [x] CORS configured for frontend-backend communication
- [x] Sample image endpoints implemented
- [x] Model loading and prediction pipeline ready
- [x] UI icons package added to dependencies

---

## 🤝 Support

If you encounter any issues:
1. Check the browser console (F12) for frontend errors
2. Check terminal logs for backend errors
3. Ensure both servers are running
4. Verify `global_model.h5` exists and is accessible

---

**Happy analyzing! 🎉**
