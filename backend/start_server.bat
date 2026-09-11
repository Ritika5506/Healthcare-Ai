@echo off
REM Backend API Server Startup Script

cd /d "%~dp0\.."
cls
echo.
echo ============================================
echo Backend API Server Starting...
echo ============================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH
    pause
    exit /b 1
)

echo [+] Checking dependencies...
python -c "import fastapi, uvicorn, tensorflow" >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Some dependencies may be missing
    echo Installing dependencies...
    pip install -q fastapi uvicorn tensorflow pillow
)

echo [+] Starting FastAPI server on http://127.0.0.1:8000
echo.
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
pause
REM Federated Learning Server startup script

REM Get to project root
cd /d "%~dp0\.."
set ROOT_DIR=%cd%

echo ============================================
echo Starting Federated Learning Server
echo ============================================
echo.
echo This server will:
echo - Initialize the global model
echo - Wait for hospital clients to connect
echo - Aggregate updates from hospitals
echo - Perform blockchain verification
echo.

python "%ROOT_DIR%\server\server.py"

echo.
echo Server stopped.
pause

