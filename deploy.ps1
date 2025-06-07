# Everything Agent Deployment Script
# This script helps deploy the website to GitHub Pages

Write-Host "🚀 Everything Agent Deployment Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Check if we're in a git repository
if (!(Test-Path ".git")) {
    Write-Host "❌ Error: Not in a git repository" -ForegroundColor Red
    exit 1
}

# Check if there are uncommitted changes
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "⚠️  Warning: You have uncommitted changes" -ForegroundColor Yellow
    Write-Host "Please commit your changes before deploying:" -ForegroundColor Yellow
    git status --short
    $response = Read-Host "Continue anyway? (y/N)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "Deployment cancelled" -ForegroundColor Yellow
        exit 0
    }
}

# Build the project
Write-Host "🔨 Building project..." -ForegroundColor Green
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green

# Deploy to GitHub Pages
Write-Host "🚀 Deploying to GitHub Pages..." -ForegroundColor Green
npm run deploy

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment successful!" -ForegroundColor Green
    Write-Host "🌐 Your site will be available at: https://yourusername.github.io/everything-agent" -ForegroundColor Cyan
    Write-Host "🌐 Or at your custom domain: https://everythingagent.ai" -ForegroundColor Cyan
} else {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    exit 1
}
