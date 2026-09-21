@echo off
REM Script para iniciar servidor PHP da API AppDivas

setlocal enabledelayedexpansion

echo.
echo ============================================
echo  AppDivas - Iniciando API
echo ============================================
echo.

REM Tenta encontrar PHP
set "PHP_FOUND=0"
for %%i in (php.exe) do (
    if not "%%~$PATH:i"=="" (
        set "PHP_PATH=%%~$PATH:i"
        set "PHP_FOUND=1"
    )
)

if !PHP_FOUND! equ 0 (
    echo [X] PHP nao foi encontrado no PATH
    echo.
    echo Localize PHP manualmente:
    echo - Se tem XAMPP: C:\xampp\php\php.exe
    echo - Ou instale XAMPP: https://www.apachefriends.org/
    echo.
    echo Depois execute:
    echo   cd backend
    echo   "C:\xampp\php\php.exe" -S localhost:8000
    echo.
    pause
    exit /b 1
)

echo [OK] PHP encontrado: !PHP_PATH!
echo.

REM Verifica se backend existe
if not exist "backend" (
    echo [X] Pasta 'backend' nao encontrada!
    echo Execute este script na raiz do projeto AppDivas
    pause
    exit /b 1
)

echo [OK] Pasta backend encontrada
echo.

REM Inicia servidor
cd backend
echo Iniciando servidor em http://localhost:8000
echo.
echo [INFO] Para parar o servidor, pressione CTRL+C
echo [INFO] Acesse:
echo  - Registrar: POST http://localhost:8000/register.php
echo  - Login:     POST http://localhost:8000/login.php
echo  - Health:    GET  http://localhost:8000/health.php
echo.

"!PHP_PATH!" -S localhost:8000

pause
