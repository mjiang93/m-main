@echo off
echo Checking Flutter installation...

if exist "C:\flutter\bin\flutter.bat" (
    echo Flutter found at C:\flutter\bin\
    echo.
    echo Installing dependencies...
    C:\flutter\bin\flutter.bat pub get
    echo.
    echo Starting Flutter app...
    C:\flutter\bin\flutter.bat run
) else (
    echo Flutter not found at C:\flutter\bin\
    echo Please wait for Flutter installation to complete.
    echo Then run this script again.
    pause
)