@echo off
title Atelie Marfim - Servidor Local
echo ===================================================
echo   ATELIE MARFIM - SERVIDOR LOCAL DE VISUALIZACAO
echo ===================================================
echo.
echo Iniciando servidor em http://localhost:3000 ...
echo Pressione Ctrl+C na janela para encerrar.
echo.
start "" "http://localhost:3000"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1" -Port 3000
pause
