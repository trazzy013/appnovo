#!/usr/bin/env pwsh
# Script para iniciar servidor PHP da API AppDivas
# Uso: ./run-api.ps1

$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  AppDivas - Iniciando API" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Localiza PHP
$phpPath = $null
$phpPaths = @(
    "php.exe",
    "C:\xampp\php\php.exe",
    "C:\wamp\bin\php\php.exe",
    "C:\wampserver\bin\php\php.exe",
    "C:\laragon\bin\php\php.exe",
    "C:\Program Files\PHP\php.exe"
)

foreach ($path in $phpPaths) {
    if (Test-Path $path) {
        $phpPath = $path
        break
    }
}

if (-not $phpPath) {
    Write-Host "[X] PHP nao encontrado no PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Tente instalar:" -ForegroundColor Yellow
    Write-Host "1. XAMPP: https://www.apachefriends.org/" -ForegroundColor Yellow
    Write-Host "2. WAMP: https://www.wampserver.com/" -ForegroundColor Yellow
    Write-Host "3. Laragon: https://laragon.org/" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Ou execute manualmente:" -ForegroundColor Yellow
    Write-Host "  cd backend" -ForegroundColor Yellow
    Write-Host "  C:\xampp\php\php.exe -S localhost:8000" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "[OK] PHP encontrado: $phpPath" -ForegroundColor Green
Write-Host ""

# Verifica se backend existe
if (-not (Test-Path "backend")) {
    Write-Host "[X] Pasta 'backend' nao encontrada!" -ForegroundColor Red
    Write-Host "Execute este script na raiz do projeto AppDivas" -ForegroundColor Red
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "[OK] Pasta backend encontrada" -ForegroundColor Green
Write-Host ""

# Inicia servidor
Set-Location backend

Write-Host "Iniciando servidor em http://localhost:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "[INFO] Endpoints disponíveis:" -ForegroundColor Yellow
Write-Host "  - Registrar: POST http://localhost:8000/register.php" -ForegroundColor Yellow
Write-Host "  - Login:     POST http://localhost:8000/login.php" -ForegroundColor Yellow
Write-Host "  - Health:    GET  http://localhost:8000/health.php" -ForegroundColor Yellow
Write-Host ""
Write-Host "[INFO] Para parar o servidor: CTRL+C" -ForegroundColor Yellow
Write-Host ""

& $phpPath -S localhost:8000

Write-Host ""
Read-Host "Pressione Enter para sair"
