@echo off
REM Healthcare Federated AI - Validation Script
REM Checks if the system is ready to run

cd /d "%~dp0"

cls
echo.
echo ============================================
echo System Health Check
echo ============================================
echo.

setlocal enabledelayedexpansion

set all_ok=1

REM Check Python
echo Checking Python...
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Python is installed
) else (
    echo [ERROR] Python is not installed
    set all_ok=0
)

REM Check Node.js
echo Checking Node.js...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Node.js is installed
) else (
    echo [ERROR] Node.js is not installed
    set all_ok=0
)

REM Check Python packages
echo Checking Python packages...
python -c "import fastapi; import tensorflow; import flwr" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Core Python packages installed
) else (
    echo [ERROR] Some Python packages are missing
    echo         Run: pip install -r requirements.txt
    set all_ok=0
)

REM Check Node modules
echo Checking Node modules...
if exist "dashboard\node_modules" (
    echo [OK] Node modules installed
) else (
    echo [WARNING] Node modules not found
    echo          Run: cd dashboard && npm install
    set all_ok=0
)

REM Check requirements.txt
echo Checking requirements.txt...
if exist "requirements.txt" (
    echo [OK] requirements.txt found
) else (
    echo [ERROR] requirements.txt not found
    set all_ok=0
)

echo.
if %all_ok% equ 1 (
    echo ============================================
    echo ✅ System is ready!
    echo ============================================
    echo.
    echo You can now run: START_HERE.bat
    echo.
) else (
    echo ============================================
    echo ⚠️  Some issues found
    echo ============================================
    echo.
    echo Run SETUP_AND_RUN.bat to fix missing dependencies
    echo.
)

pause
