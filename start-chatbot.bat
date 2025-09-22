@echo off
echo Starting SIH Chatbot Backend...
echo.
echo Installing Python dependencies...
cd SIH_Chatbot
pip install -r requirements.txt
echo.
echo Starting Flask server on http://localhost:5000
echo Press Ctrl+C to stop the server
echo.
python app.py