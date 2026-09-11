@echo off
REM Healthcare Federated AI - Complete System Startup
REM This script starts all components in separate windows

cd /d "%~dp0"
set ROOT_DIR=%cd%

cls
echo.
echo ============================================
echo Healthcare Federated AI - Complete System
echo ============================================
echo.
echo This script will start:
echo 1. Federated Learning Server
echo 2. Backend API Server
echo 3. Dashboard Frontend
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    pause
    exit /b 1
)

REM Create dataset directories if they don't exist
if not exist "dataset\normal" mkdir "dataset\normal"
if not exist "dataset\pneumonia" mkdir "dataset\pneumonia"

echo [1/3] Starting Federated Learning Server...
start "FL Server" python "%ROOT_DIR%\server\server.py"
echo [+] FL Server started in new window
timeout /t 3 /nobreak

echo [2/3] Starting Backend API Server...
start "Backend API" cmd /k "cd /d %ROOT_DIR% && python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000"
echo [+] Backend API started in new window
timeout /t 3 /nobreak

echo [3/3] Starting Frontend Dashboard...
start "Frontend Dashboard" cmd /k "cd /d %ROOT_DIR%\dashboard && npm start"
echo [+] Frontend Dashboard started in new window
timeout /t 3 /nobreak

echo.
echo ============================================
echo ✅ All Services Started!
echo ============================================
echo.
echo ** ACCESS POINTS **
echo Backend API: http://127.0.0.1:8000
echo API Docs:    http://127.0.0.1:8000/docs
echo Dashboard:   http://localhost:3000
echo.
echo ** NOTES **
echo - Check each window for errors
echo - Backend/Dashboard windows will close when you select [X]
echo - FL Server may take a moment to initialize
echo.
pause
