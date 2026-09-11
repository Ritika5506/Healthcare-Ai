@echo off
REM Frontend startup script

cd /d "%~dp0"

cls
echo.
echo ============================================
echo Healthcare Federated AI Dashboard
echo ============================================
echo.
echo URL: http://localhost:3000
echo.
echo Make sure backend is running on http://127.0.0.1:8000
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing npm dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install npm dependencies
        pause
        exit /b 1
    )
)

echo [+] Starting React dashboard...
echo Please wait for the browser to open...
echo.

npm start

echo.
echo Dashboard stopped.
pause
