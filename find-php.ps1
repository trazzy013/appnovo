#!/usr/bin/env pwsh
# Script para encontrar PHP no sistema
# Uso: ./find-php.ps1

Write-Host ""
Write-Host "🔍 Procurando por PHP no sistema..." -ForegroundColor Cyan
Write-Host ""

$foundPhp = @()

# Localizações comuns
$searchPaths = @(
    "C:\",
    "D:\",
    "E:\",
    "$env:ProgramFiles",
    "$env:ProgramFiles(x86)",
    "$env:LocalAppData"
)

$phpNames = @("php.exe", "php-cgi.exe")

foreach ($searchPath in $searchPaths) {
    if (-not (Test-Path $searchPath)) { continue }
    
    Write-Host "Procurando em: $searchPath" -ForegroundColor Gray
    
    try {
        $found = Get-ChildItem -Path $searchPath -Filter "php.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 10
        foreach ($item in $found) {
            $foundPhp += $item.FullName
            Write-Host "✅ Encontrado: $($item.FullName)" -ForegroundColor Green
        }
    } catch {
        # Ignorar erros de permissão
    }
}

if ($foundPhp.Count -eq 0) {
    Write-Host ""
    Write-Host "❌ PHP não foi encontrado no sistema" -ForegroundColor Red
    Write-Host ""
    Write-Host "Instale XAMPP:" -ForegroundColor Yellow
    Write-Host "1. Acesse: https://www.apachefriends.org/" -ForegroundColor Yellow
    Write-Host "2. Baixe XAMPP para Windows" -ForegroundColor Yellow
    Write-Host "3. Instale no local padrão (C:\xampp)" -ForegroundColor Yellow
    Write-Host "4. Adicione ao PATH ou use este caminho:" -ForegroundColor Yellow
    Write-Host "   C:\xampp\php\php.exe" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "✅ PHP encontrado!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Use um dos caminhos acima nos scripts:" -ForegroundColor Yellow
    Write-Host "1. Edite 'run-api.bat' ou 'run-api.ps1'" -ForegroundColor Yellow
    Write-Host "2. Ou execute manualmente:" -ForegroundColor Yellow
    Write-Host "   & '$($foundPhp[0])' -S localhost:8000" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Também procurando MySQL..." -ForegroundColor Yellow

$mysql = Get-Command mysql -ErrorAction SilentlyContinue
if ($mysql) {
    Write-Host "✅ MySQL encontrado: $($mysql.Source)" -ForegroundColor Green
} else {
    Write-Host "❌ MySQL não encontrado no PATH" -ForegroundColor Red
    Write-Host "   (Verifique se MySQL/XAMPP está instalado e rodando)" -ForegroundColor Yellow
}

Write-Host ""
