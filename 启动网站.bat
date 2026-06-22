@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Starting local file server...
start "文件服务器" cmd /k "node server.cjs"
timeout /t 2 >nul
echo Starting Vite dev server...
start "前端服务" cmd /k "npx vite"
timeout /t 3 >nul
start msedge http://localhost:3000
echo Done! Opening in Edge browser.
pause
