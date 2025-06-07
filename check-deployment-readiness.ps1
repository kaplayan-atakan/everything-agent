# Production Environment Check Script for Everything Agent

Write-Host "🔍 Everything Agent Production Readiness Check" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

$allChecks = @()

# Check 1: Git repository
if (Test-Path ".git") {
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
    $allChecks += $true
} else {
    Write-Host "❌ Git repository not found" -ForegroundColor Red
    $allChecks += $false
}

# Check 2: Node modules
if (Test-Path "node_modules") {
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
    $allChecks += $true
} else {
    Write-Host "❌ Dependencies not installed - run 'npm install'" -ForegroundColor Red
    $allChecks += $false
}

# Check 3: Build directory
if (Test-Path "build") {
    Write-Host "✅ Build directory exists" -ForegroundColor Green
    $allChecks += $true
} else {
    Write-Host "⚠️  Build directory not found - run 'npm run build'" -ForegroundColor Yellow
    $allChecks += $false
}

# Check 4: Environment files
if (Test-Path ".env.production") {
    Write-Host "✅ Production environment file exists" -ForegroundColor Green
    $allChecks += $true
} else {
    Write-Host "❌ .env.production file missing" -ForegroundColor Red
    $allChecks += $false
}

# Check 5: GitHub Actions workflow
if (Test-Path ".github/workflows/deploy.yml") {
    Write-Host "✅ GitHub Actions workflow configured" -ForegroundColor Green
    $allChecks += $true
} else {
    Write-Host "❌ GitHub Actions workflow missing" -ForegroundColor Red
    $allChecks += $false
}

# Check 6: Package.json configuration
$packageJson = Get-Content "package.json" | ConvertFrom-Json
if ($packageJson.homepage -eq "https://everythingagent.ai") {
    Write-Host "✅ Homepage URL configured correctly" -ForegroundColor Green
    $allChecks += $true
} else {
    Write-Host "❌ Homepage URL not configured" -ForegroundColor Red
    $allChecks += $false
}

# Check 7: Favicon
if (Test-Path "public/favicon.ico") {
    Write-Host "✅ Favicon exists" -ForegroundColor Green
    $allChecks += $true
} else {
    Write-Host "❌ Favicon missing" -ForegroundColor Red
    $allChecks += $false
}

# Check 8: Sitemap
if (Test-Path "public/sitemap.xml") {
    Write-Host "✅ Sitemap exists" -ForegroundColor Green
    $allChecks += $true
} else {
    Write-Host "❌ Sitemap missing" -ForegroundColor Red
    $allChecks += $false
}

# Summary
$passedChecks = ($allChecks | Where-Object { $_ -eq $true }).Count
$totalChecks = $allChecks.Count

Write-Host "`n📊 SUMMARY" -ForegroundColor Cyan
Write-Host "==========" -ForegroundColor Cyan
Write-Host "Passed: $passedChecks / $totalChecks checks" -ForegroundColor $(if ($passedChecks -eq $totalChecks) { "Green" } else { "Yellow" })

if ($passedChecks -eq $totalChecks) {
    Write-Host "`n🎉 READY FOR DEPLOYMENT!" -ForegroundColor Green
    Write-Host "Next steps:" -ForegroundColor Green
    Write-Host "1. Create GitHub repository" -ForegroundColor White
    Write-Host "2. Push code: git push -u origin main" -ForegroundColor White
    Write-Host "3. Deploy: npm run deploy" -ForegroundColor White
} else {
    Write-Host "`n⚠️  Please fix the failing checks before deployment" -ForegroundColor Yellow
}

Write-Host "`n🌐 Domain: everythingagent.ai" -ForegroundColor Cyan
Write-Host "📧 Contact: info@everythingagent.ai" -ForegroundColor Cyan
