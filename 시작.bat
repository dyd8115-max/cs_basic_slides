@echo off
cd /d "%~dp0"

:: 서버가 이미 실행 중인지 확인
curl -s http://localhost:3000/health >nul 2>&1
if %errorlevel% == 0 (
    start "" "http://localhost:3000"
    exit
)

:: 서버 시작 (백그라운드)
start /b node server.js

:: 서버 뜰 때까지 대기 (최대 5초)
:wait
timeout /t 1 /nobreak >nul
curl -s http://localhost:3000/health >nul 2>&1
if %errorlevel% neq 0 goto wait

:: 브라우저 열기
start "" "http://localhost:3000"
