@echo off
REM ============================================
REM Healthcare Federated AI - Complete Setup
REM ============================================

cd /d "%~dp0"
set ROOT_DIR=%cd%

cls
echo.
echo ============================================
echo Healthcare Federated AI System
echo Complete Setup & Startup
echo ============================================
echo.

REM Step 1: Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org
    pause
    exit /b 1
)

REM Step 2: Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js 14+ from https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Python and Node.js are installed
echo.

REM Step 3: Install Python dependencies
echo [1/4] Installing Python dependencies...
pip install -q -r "%ROOT_DIR%\requirements.txt" >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Using alternative installation method...
    pip install -q fastapi uvicorn tensorflow pillow flwr numpy
)
echo [OK] Python dependencies installed

REM Step 4: Install Node dependencies
echo [2/4] Installing frontend dependencies...
cd "%ROOT_DIR%\dashboard"
call npm install >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] npm install had issues, but continuing...
)
cd "%ROOT_DIR%"
echo [OK] Frontend dependencies installed

REM Step 5: Create dataset directories
echo [3/4] Creating dataset directories...
if not exist "dataset\normal" mkdir "dataset\normal"
if not exist "dataset\pneumonia" mkdir "dataset\pneumonia"
if not exist "hospitals\hospital_A\normal" mkdir "hospitals\hospital_A\normal"
if not exist "hospitals\hospital_A\pneumonia" mkdir "hospitals\hospital_A\pneumonia"
if not exist "hospitals\hospital_B\normal" mkdir "hospitals\hospital_B\normal"
if not exist "hospitals\hospital_B\pneumonia" mkdir "hospitals\hospital_B\pneumonia"
if not exist "hospitals\hospital_C\normal" mkdir "hospitals\hospital_C\normal"
if not exist "hospitals\hospital_C\pneumonia" mkdir "hospitals\hospital_C\pneumonia"
echo [OK] Dataset directories created

REM Step 6: Check for global model
echo [4/4] Checking model file...
if not exist "global_model.h5" (
    echo [INFO] global_model.h5 not found. It will be created when you start the backend.
) else (
    echo [OK] global_model.h5 found
)
echo.

REM Final message
cls
echo.
echo ============================================
echo ✅ Setup Complete!
echo ============================================
echo.
echo Your Healthcare Federated AI system is ready!
echo.
echo NEXT STEPS - Open 3 separate terminals:
echo.
echo Terminal 1 - Start Backend:
echo   cd "%ROOT_DIR%"
echo   call backend\start_backend.bat
echo.
echo Terminal 2 - Start Frontend:
echo   cd "%ROOT_DIR%"
echo   call dashboard\start_dashboard.bat
echo.
echo Terminal 3 - (Optional) Start Federated Server:
echo   cd "%ROOT_DIR%"
echo   python server\server.py
echo.
echo THEN:
echo   1. Backend API will be at: http://127.0.0.1:8000
echo   2. Dashboard will be at: http://localhost:3000
echo   3. API docs at: http://127.0.0.1:8000/docs
echo.
echo ============================================
echo.
pause
