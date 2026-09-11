@echo off
REM Healthcare Federated AI - Setup Script

cd /d "%~dp0"
set ROOT_DIR=%cd%

cls
echo.
echo ============================================
echo Healthcare Federated AI - Setup
echo ============================================
echo.

REM Check if global_model.h5 exists
if not exist "global_model.h5" (
    echo [INFO] global_model.h5 not found
    echo        It will be created when you start the backend
    echo.
)

REM Check Python
echo [1/5] Checking Python installation...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org
    pause
    exit /b 1
)
python --version
echo [OK] Python is installed
echo.

REM Check Node.js
echo [2/5] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js 14+ from https://nodejs.org
    pause
    exit /b 1
)
node --version
echo [OK] Node.js is installed
echo.

REM Install Python dependencies
echo [3/5] Installing Python dependencies...
pip install -q -r requirements.txt
if %errorlevel% neq 0 (
    echo [WARNING] Some dependencies may have failed to install
    echo Attempting individual installation...
    pip install -q fastapi uvicorn tensorflow pillow flwr numpy
)
echo [OK] Python dependencies installed
echo.

REM Install frontend dependencies
echo [4/5] Installing frontend dependencies...
cd "%ROOT_DIR%\dashboard"
call npm install >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Some npm dependencies may have failed
    echo Please run: cd dashboard && npm install
)
cd "%ROOT_DIR%"
echo [OK] Frontend dependencies installed
echo.

REM Create directories
echo [5/5] Creating dataset directories...
if not exist "dataset\normal" mkdir "dataset\normal"
if not exist "dataset\pneumonia" mkdir "dataset\pneumonia"
if not exist "hospitals\hospital_A\normal" mkdir "hospitals\hospital_A\normal"
if not exist "hospitals\hospital_A\pneumonia" mkdir "hospitals\hospital_A\pneumonia"
if not exist "hospitals\hospital_B\normal" mkdir "hospitals\hospital_B\normal"
if not exist "hospitals\hospital_B\pneumonia" mkdir "hospitals\hospital_B\pneumonia"
if not exist "hospitals\hospital_C\normal" mkdir "hospitals\hospital_C\normal"
if not exist "hospitals\hospital_C\pneumonia" mkdir "hospitals\hospital_C\pneumonia"
echo [OK] Directories created
echo.

cls
echo.
echo ============================================
echo ✅ Setup Complete!
echo ============================================
echo.
echo Your Healthcare Federated AI is ready!
echo.
echo NEXT STEPS:
echo.
echo 1. Start Backend (Terminal 1):
echo    cd backend
echo    python -m uvicorn main:app --reload
echo.
echo 2. Start Frontend (Terminal 2):
echo    cd dashboard
echo    npm start
echo.
echo 3. Open Browser:
echo    - Dashboard: http://localhost:3000
echo    - API: http://127.0.0.1:8000
echo    - Docs: http://127.0.0.1:8000/docs
echo.
echo For detailed instructions, see QUICKSTART.md
echo.
echo ============================================
echo.
pause
