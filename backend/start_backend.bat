@echo off
REM Backend API Server startup script

REM Get to project root (parent of backend)
cd /d "%~dp0\.."
set ROOT_DIR=%cd%

cls
echo.
echo ============================================
echo Starting Backend API Server
echo ============================================
echo.
echo URL: http://127.0.0.1:8000
echo API Documentation: http://127.0.0.1:8000/docs
echo.
echo Features:
echo - Model prediction endpoint
echo - Training data retrieval
echo - Hospital accuracy tracking
echo - Sample image serving
echo.

REM Check if global_model.h5 exists
if not exist "%ROOT_DIR%\global_model.h5" (
    echo [WARNING] global_model.h5 not found
    echo The server will create a new model on first run
    echo.
)

REM Start the backend API from the root directory
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000

echo.
echo Backend API Server stopped.
pause
