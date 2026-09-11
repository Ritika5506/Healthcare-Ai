@echo off
REM Hospital B Client startup script

cd /d "%~dp0\.."
set ROOT_DIR=%cd%

cls
echo.
echo ============================================
echo Hospital B - Federated Learning Client
echo ============================================
echo.
echo This client will:
echo - Connect to the Federated Learning Server
echo - Train on local Hospital B dataset
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

echo Starting Hospital B Client...
python "%ROOT_DIR%\code\hospital2.py"

echo.
echo Hospital B Client stopped.
pause
