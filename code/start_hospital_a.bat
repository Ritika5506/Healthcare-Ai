@echo off
REM Hospital A Client startup script

cd /d "%~dp0\.."
set ROOT_DIR=%cd%

cls
echo.
echo ============================================
echo Hospital A - Federated Learning Client
echo ============================================
echo.
echo This client will:
echo - Connect to the Federated Learning Server
echo - Train on local Hospital A dataset
echo - Send updates to the server
echo.

REM Check if server_address.txt exists
if not exist "%ROOT_DIR%\server_address.txt" (
    echo [ERROR] server_address.txt not found.
    echo Please ensure the FL Server is running first!
    echo.
    pause
    exit /b 1
)

echo Starting Hospital A Client...
python "%ROOT_DIR%\code\hospital1.py"

echo.
echo Hospital A Client stopped.
pause
