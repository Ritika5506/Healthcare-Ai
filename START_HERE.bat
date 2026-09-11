@echo off
REM ============================================
REM Healthcare Federated AI - START HERE
REM ============================================
REM This is the main entry point for the system

cd /d "%~dp0"
set ROOT_DIR=%cd%

cls
echo.
echo.
echo  ╔════════════════════════════════════════════════════════════╗
echo  ║                                                            ║
echo  ║    🏥 Healthcare Federated AI System                      ║
echo  ║                                                            ║
echo  ║    Advanced Pneumonia Detection with Privacy-First        ║
echo  ║    Federated Learning Across Multiple Hospitals           ║
echo  ║                                                            ║
echo  ╚════════════════════════════════════════════════════════════╝
echo.
echo.

setlocal enabledelayedexpansion

REM Check if system is already set up
if not exist "requirements.txt" (
    echo [ERROR] requirements.txt not found
    echo Please ensure you're in the correct directory
    pause
    exit /b 1
)

REM Quick check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed
    echo Please install Python 3.8+ from https://www.python.org
    pause
    exit /b 1
)

REM Quick check for Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js 14+ from https://nodejs.org
    pause
    exit /b 1
)

echo What would you like to do?
echo.
echo [1] Quick Start - Setup and run everything
echo [2] Just run the system (already set up)
echo [3] Setup only (install dependencies)
echo [4] View documentation
echo [5] Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto quickstart
if "%choice%"=="2" goto runonly
if "%choice%"=="3" goto setuponly
if "%choice%"=="4" goto docs
if "%choice%"=="5" goto end
echo Invalid choice
goto menu

:quickstart
cls
echo.
echo ============================================
echo Setting up Healthcare Federated AI System
echo ============================================
echo.

echo [1/3] Installing Python dependencies...
pip install -q -r requirements.txt >nul 2>&1
echo [OK] Python dependencies installed

echo [2/3] Installing frontend dependencies...
cd "%ROOT_DIR%\dashboard"
call npm install >nul 2>&1
cd "%ROOT_DIR%"
echo [OK] Frontend dependencies installed

echo [3/3] Creating dataset directories...
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
echo ============================================
echo ✅ Setup Complete!
echo ============================================
echo.
pause
goto runonly

:runonly
cls
echo.
echo ============================================
echo Healthcare Federated AI - Starting System
echo ============================================
echo.
echo You need 2 terminal windows:
echo.
echo Terminal 1 - Backend API
echo Terminal 2 - Frontend Dashboard
echo.
echo Starting terminals...
echo.

REM Start backend
start "Backend API Server" cmd /k "cd /d %ROOT_DIR% && python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000"
echo [OK] Backend window opened
timeout /t 2 /nobreak

REM Start frontend
start "Frontend Dashboard" cmd /k "cd /d %ROOT_DIR%\dashboard && npm start"
echo [OK] Frontend window opened
timeout /t 2 /nobreak

cls
echo.
echo ✅ System Starting...
echo.
echo Please wait for the dashboard to open in your browser.
echo If it doesn't open automatically:
echo.
echo   Dashboard: http://localhost:3000
echo   API: http://127.0.0.1:8000
echo   Docs: http://127.0.0.1:8000/docs
echo.
echo Check the terminal windows for any error messages.
echo.
pause
goto end

:setuponly
cls
echo.
echo ============================================
echo Installing Dependencies Only
echo ============================================
echo.

echo [1/2] Installing Python dependencies...
pip install -r requirements.txt
echo [OK] Python dependencies installed

echo [2/2] Installing frontend dependencies...
cd "%ROOT_DIR%\dashboard"
call npm install
cd "%ROOT_DIR%"
echo [OK] Frontend dependencies installed

echo.
echo ============================================
echo ✅ Setup Complete!
echo ============================================
echo.
echo Now run this script again and choose "Just run the system"
echo.
pause
goto end

:docs
cls
echo.
echo ============================================
echo Healthcare Federated AI - Documentation
echo ============================================
echo.
echo Available documentation files:
echo.
echo - README.md                  (Main overview)
echo - QUICKSTART.md             (Detailed setup guide)
echo - README_DASHBOARD.md       (Dashboard features)
echo - INTEGRATION_GUIDE.md      (API integration)
echo.
echo Opening README.md...
echo.
if exist "README.md" (
    start README.md
) else (
    echo [ERROR] README.md not found
)
pause
goto menu

:menu
echo.
echo.
goto quickstart

:end
cls
echo.
echo Goodbye!
echo.
