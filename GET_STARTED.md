# 🚀 START HERE!

## Healthcare Federated AI - Complete & Ready to Use

Your project is fully set up and ready to run. Choose one option below:

---

## ⚡ Quick Start (Easiest)

### Windows: Double-click this file
```
START_HERE.bat
```
This will guide you through setup and launch the entire system.

---

## 📋 Step-by-Step Setup

### 1️⃣ First Time Only - Install Dependencies
```batch
SETUP_AND_RUN.bat
```
Or manually:
```batch
pip install -r requirements.txt
cd dashboard
npm install
cd ..
```

### 2️⃣ Run the System in 2 Terminals

**Terminal 1 - Backend:**
```batch
cd backend
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

**Terminal 2 - Frontend:**
```batch
cd dashboard
npm start
```

### 3️⃣ Open Your Browser
- **Dashboard:** http://localhost:3000
- **API Docs:** http://127.0.0.1:8000/docs

---

## What You Get

✅ **Backend API** - Pneumonia detection with REST endpoints  
✅ **React Dashboard** - Modern UI for predictions  
✅ **AI Model** - Pre-trained CNN (64×64×3 → Normal/Pneumonia)  
✅ **Sample Images** - Test data included  
✅ **Federated Learning** - Multi-hospital support  
✅ **Blockchain** - Verification of model aggregation  

---

## 3 Ways to Run Everything

### Option 1: Interactive Menu (Recommended ⭐)
```batch
START_HERE.bat
```

### Option 2: Complete Setup from Scratch
```batch
SETUP_AND_RUN.bat
```

### Option 3: Run Everything at Once
```batch
RUN_ALL.bat
```

---

## ✅ Check System Health
```batch
CHECK_SYSTEM.bat
```

---

## 📚 Documentation

- **README.md** - Full project overview
- **QUICKSTART.md** - Detailed setup guide  
- **SETUP_VERIFICATION.md** - System status report
- **README_DASHBOARD.md** - Dashboard features
- **INTEGRATION_GUIDE.md** - API integration

---

## 🎯 What Happens When You Run It

1. **Backend starts** on http://127.0.0.1:8000
   - Loads AI model ✓
   - Opens API endpoints
   - Shows interactive docs at `/docs`

2. **Frontend starts** on http://localhost:3000
   - React dashboard loads
   - Connects to backend API
   - Ready for predictions

3. **You can**
   - Upload X-ray images
   - Get instant predictions
   - View performance metrics
   - Test with sample images

---

## ⚠️ Prerequisites

Make sure you have these installed:
- Python 3.8+ (https://python.org)
- Node.js 14+ (https://nodejs.org)

To verify:
```batch
python --version
node --version
```

---

## 🆘 Need Help?

### System won't start?
Run: `CHECK_SYSTEM.bat`

### Missing dependencies?
Run: `SETUP_AND_RUN.bat`

### Port already in use?
Edit `backend\main.py` or use:
```batch
python -m uvicorn backend.main:app --port 8001
```

---

## 🔥 Let's Go!

**Double-click:** `START_HERE.bat`

Or run in terminal:
```batch
START_HERE.bat
```

---

**Status:** ✅ Ready to Run  
**Last Updated:** March 7, 2026  
**Next Step:** `START_HERE.bat`
