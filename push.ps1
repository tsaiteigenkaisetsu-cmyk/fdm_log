#!/usr/bin/env pwsh
# Git自動化スクリプト
# 使用方法: ./push.ps1 "コミットメッセージ"

param(
    [string]$CommitMessage = "Update"
)

Write-Host "=== Git Automation ===" -ForegroundColor Cyan
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Gray
Write-Host ""

# 変更内容を表示
Write-Host "📋 Changed files:" -ForegroundColor Yellow
git status -s
Write-Host ""

# add
Write-Host "▶ Adding files..." -ForegroundColor Cyan
git add .
Write-Host "✓ Files staged" -ForegroundColor Green
Write-Host ""

# commit
Write-Host "▶ Committing..." -ForegroundColor Cyan
git commit -m "$CommitMessage"
Write-Host "✓ Committed" -ForegroundColor Green
Write-Host ""

# push
Write-Host "▶ Pushing to GitHub..." -ForegroundColor Cyan
git push
Write-Host "✓ Pushed successfully!" -ForegroundColor Green
Write-Host ""

Write-Host "🎉 All done! Pages will update in a few minutes." -ForegroundColor Green
