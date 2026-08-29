# ============================================================
#  游戏一键打包脚本（EdgeOne Pages 部署包生成器）
#  用法：powershell -ExecutionPolicy Bypass -File "F:\codex1\build-deploy-package.ps1"
#  功能：同步主目录 -> 部署目录 -> 压缩超限视频 -> 打包 zip
#  注意：只动 F:\codex1\netlify-drop 和 F:\codex1\netlify-drop.zip
#        不会修改你主目录 F:\codex1 里的任何源文件
# ============================================================

$src   = "F:\codex1"
$deploy = "F:\codex1\netlify-drop"
$zip    = "F:\codex1\netlify-drop.zip"
$backupDir = "F:\codex1\tmp\deploy-backup"

# --- 不需要部署的开发文件（按需增删） ---
$excludeDirs  = @(".git", ".agents", "netlify-drop", "output", "tmp", "pixel-dessert-video")
$excludeFiles = @(
  "serve-local.ps1", "vercel.json", ".forum-check.json", "netlify-drop.zip",
  "portrait-test.html", "portrait-test.png",
  "_forum-inspect.txt", "_forum_tail.txt", "_snippet_render.txt",
  "_tea-room-status.txt", "_tea_room_classes.txt", "_tea_room_status.json",
  "_tea_room_status.txt", "_tea_room_verify.json", "__forum_check.txt"
)

Write-Host "=== [1/4] 重建部署目录 ===" -ForegroundColor Cyan
if (Test-Path $deploy) { Remove-Item $deploy -Recurse -Force }
New-Item -ItemType Directory -Path $deploy -Force | Out-Null

Write-Host "=== [2/4] 同步游戏文件 ===" -ForegroundColor Cyan
$copied = 0
# 根目录文件（.html/.css/.js/图片等，排除开发文件）
Get-ChildItem $src -File | Where-Object {
  $_.Name -notin $excludeFiles
} | ForEach-Object {
  Copy-Item $_.FullName (Join-Path $deploy $_.Name) -Force
  $copied++
}
# 需要整目录复制的资源目录
foreach ($d in @("assets", "soul-archive-portraits")) {
  if (Test-Path (Join-Path $src $d)) {
    Copy-Item (Join-Path $src $d) (Join-Path $deploy $d) -Recurse -Force
    Write-Host "  复制目录: $d"
  }
}
Write-Host "  根目录文件复制: $copied 个"

Write-Host "=== [3/4] 检查并压缩超限文件（>25MB） ===" -ForegroundColor Cyan
$ff = python -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())" 2>$null
if (-not $ff -or -not (Test-Path $ff)) {
  Write-Host "  [警告] 未找到 ffmpeg，无法自动压缩超限视频" -ForegroundColor Yellow
  Write-Host "  可用: python -m pip install imageio-ffmpeg" -ForegroundColor Yellow
  $ff = $null
}
$overLimit = Get-ChildItem $deploy -File -Recurse | Where-Object { $_.Length -gt 25MB }
if ($overLimit) {
  New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
  foreach ($f in $overLimit) {
    $mb = [math]::Round($f.Length/1MB,1)
    $showPath = $f.FullName.Substring($deploy.Length+1)
    Write-Host "  [超限] $showPath  ($mb MB)" -ForegroundColor Yellow
    if ($ff) {
      $rel = $f.FullName.Substring($deploy.Length+1) -replace '\\','_'
      $bak = Join-Path $backupDir ($rel + ".original")
      Copy-Item $f.FullName $bak -Force
      $tmpOut = $f.FullName + ".tmp.mp4"
      & $ff -y -i $f.FullName -c:v libx264 -crf 20 -preset medium -c:a aac -b:a 128k -movflags +faststart $tmpOut -hide_banner -loglevel error
      if ((Test-Path $tmpOut) -and (Get-Item $tmpOut).Length -lt 25MB) {
        Remove-Item $f.FullName -Force
        Rename-Item $tmpOut $f.Name
        Write-Host "    已压缩至 $([math]::Round((Get-Item $f.FullName).Length/1MB,1)) MB，原文件备份在 $bak" -ForegroundColor Green
      } else {
        Remove-Item $tmpOut -Force -ErrorAction SilentlyContinue
        Write-Host "    [错误] 压缩失败，请手动处理该文件" -ForegroundColor Red
      }
    }
  }
} else {
  Write-Host "  所有文件均符合 25MB 限制"
}

Write-Host "=== [4/4] 打包 zip ===" -ForegroundColor Cyan
if (Test-Path $zip) { Remove-Item $zip -Force }
$fileCount = (Get-ChildItem $deploy -File -Recurse | Measure-Object).Count
python -c "
import zipfile, os, sys
root = sys.argv[1]; out = sys.argv[2]
count = 0
with zipfile.ZipFile(out, 'w', zipfile.ZIP_STORED, allowZip64=True) as z:
    for dirpath, dirnames, filenames in os.walk(root):
        for fn in filenames:
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, root).replace(os.sep, '/')
            z.write(full, rel)
            count += 1
print('打包完成: %d 个文件' % count)
" $deploy $zip
$zipMB = [math]::Round((Get-Item $zip).Length/1MB,1)
Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host " 部署包已生成: $zip  ($fileCount 个文件, $zipMB MB)" -ForegroundColor Green
Write-Host " 下一步：EdgeOne Pages 控制台 -> 该项目 -> 新建部署 -> 上传此 zip" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green
