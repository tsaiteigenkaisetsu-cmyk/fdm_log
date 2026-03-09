#!/usr/bin/env pwsh
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

param(
    [string]$CommitMessage = "更新"
)

Write-Host "=== Git 自動化 ===" -ForegroundColor Cyan
Write-Host "現在のディレクトリ: $(Get-Location)" -ForegroundColor Gray
Write-Host ""
Write-Host "変更されたファイル:" -ForegroundColor Yellow
git status -s
Write-Host ""

Write-Host "ファイルを追加中..." -ForegroundColor Cyan
git add .
Write-Host "ファイルをステージしました" -ForegroundColor Green
Write-Host ""

Write-Host "コミット中..." -ForegroundColor Cyan
git commit -m "$CommitMessage"
Write-Host "コミットしました" -ForegroundColor Green
Write-Host ""

Write-Host "GitHubにプッシュ中..." -ForegroundColor Cyan
git push
Write-Host "プッシュが完了しました!" -ForegroundColor Green
Write-Host ""

Write-Host "完了しました! ページは数分以内に更新されます。" -ForegroundColor Green