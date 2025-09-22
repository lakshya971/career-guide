@echo off
echo Starting Local SIH Chatbot Server...
echo.
cd /d "C:\Users\Lakshya\OneDrive\Desktop\project-bolt-sb1-l9lfvuze\project\SIH_Chatbot"
echo Current directory: %CD%
echo.
echo Starting Flask server on http://localhost:5000
echo Press Ctrl+C to stop the server
echo.
python app.py
pause