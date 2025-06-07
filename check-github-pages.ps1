# GitHub Pages Status Checker

Write-Host "🔍 GitHub Pages Deployment Status Check" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: Not in project directory" -ForegroundColor Red
    exit 1
}

# Get repository URL
$gitRemote = git remote get-url origin
Write-Host "📂 Repository: $gitRemote" -ForegroundColor Green

# Extract username and repo name from URL
if ($gitRemote -match "github\.com[:/]([^/]+)/([^./]+)") {
    $username = $matches[1]
    $repoName = $matches[2]
    
    Write-Host "👤 Username: $username" -ForegroundColor Green
    Write-Host "📁 Repository: $repoName" -ForegroundColor Green
    
    $githubPagesUrl = "https://$username.github.io/$repoName"
    Write-Host "🌐 Expected GitHub Pages URL: $githubPagesUrl" -ForegroundColor Cyan
} else {
    Write-Host "❌ Could not parse GitHub URL" -ForegroundColor Red
    exit 1
}

# Check branches
Write-Host "`n🌿 Checking branches..." -ForegroundColor Yellow
git branch -a

# Check last deployment
Write-Host "`n📊 Last commits on gh-pages branch:" -ForegroundColor Yellow
git log --oneline -5 origin/gh-pages 2>$null

# Check package.json homepage
$packageJson = Get-Content "package.json" | ConvertFrom-Json
Write-Host "`n🏠 Homepage in package.json: $($packageJson.homepage)" -ForegroundColor Green

# Verify homepage matches expected URL
if ($packageJson.homepage -eq $githubPagesUrl) {
    Write-Host "✅ Homepage URL is correct!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Homepage URL mismatch!" -ForegroundColor Red
    Write-Host "   Expected: $githubPagesUrl" -ForegroundColor White
    Write-Host "   Current:  $($packageJson.homepage)" -ForegroundColor White
}

Write-Host "`n🚀 To test deployment:" -ForegroundColor Cyan
Write-Host "1. Wait 5-10 minutes for GitHub Pages to propagate" -ForegroundColor White
Write-Host "2. Visit: $githubPagesUrl" -ForegroundColor White
Write-Host "3. If still 404, check GitHub repo Settings > Pages" -ForegroundColor White

Write-Host "`n🔧 GitHub Pages Settings should be:" -ForegroundColor Yellow
Write-Host "   Source: Deploy from a branch" -ForegroundColor White
Write-Host "   Branch: gh-pages" -ForegroundColor White
Write-Host "   Folder: / (root)" -ForegroundColor White
