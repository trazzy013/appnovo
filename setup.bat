@echo off
REM Script de setup para AppDivas API
REM Requer: PHP 8.0+ e MySQL rodando

setlocal enabledelayedexpansion

echo.
echo ============================================
echo  AppDivas - Setup da API
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
    echo Opcoes:
    echo 1. Instale XAMPP: https://www.apachefriends.org/
    echo 2. Adicione PHP ao PATH do Windows
    echo 3. Use o caminho completo do PHP (ex: C:\xampp\php\php.exe)
    echo.
    echo Encontre PHP e execute manualmente:
    echo   cd backend
    echo   "C:\xampp\php\php.exe" setup.php
    pause
    exit /b 1
)

echo [OK] PHP encontrado: !PHP_PATH!
echo.

REM Verifica MySQL
echo Verificando MySQL...
mysql -u root -e "SELECT 1" >nul 2>&1
if errorlevel 1 (
    echo [X] MySQL nao respondeu
    echo.
    echo Certifique-se de que:
    echo - MySQL esta instalado
    echo - MySQL esta rodando
    echo - Credenciais estao corretas em backend/config.php
    echo.
    pause
    exit /b 1
)

echo [OK] MySQL conectado!
echo.

REM Executa setup
echo Criando banco de dados...
echo.
cd backend
"!PHP_PATH!" setup.php
cd ..

echo.
echo ============================================
echo  Setup Completo!
echo ============================================
echo.
echo Para iniciar o servidor da API, execute:
echo   cd backend
echo   php -S localhost:8000
echo.
echo Ou use o script run-api.bat
echo.
pause
