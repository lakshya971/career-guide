# SIH Chatbot Integration

## Overview
Your SIH-chatbot has been successfully integrated into your React application! The chatbot now provides AI-powered career guidance, stream selection advice, and scholarship information.

## Features
- **AI-Powered Responses**: Uses a trained TensorFlow model for intelligent responses
- **Career Guidance**: Helps with career path selection and planning
- **Stream Selection**: Provides advice on Science, Commerce, and Arts streams
- **Scholarship Information**: Offers guidance on available scholarships
- **Real-time Chat**: Interactive chat interface with typing indicators
- **Health Monitoring**: Shows backend connection status

## How to Start

### 1. Start the Chatbot Backend
```bash
# Option 1: Use the batch script (Windows)
.\start-chatbot.bat

# Option 2: Manual start
cd SIH_Chatbot
pip install -r requirements.txt
python app.py
```

### 2. Start the React Frontend
```bash
# In the main project directory
npm run dev
```

### 3. Test the Integration
1. Open your React app in the browser
2. Click the blue chat button in the bottom-right corner
3. Try asking questions like:
   - "What is science stream?"
   - "Tell me about careers in commerce"
   - "How to get scholarships?"
   - "Help me choose my career"

## Architecture

### Backend (Flask)
- **Port**: 5000
- **Endpoint**: `/get_response` (POST)
- **Health Check**: `/health` (GET)
- **CORS**: Enabled for React app communication

### Frontend (React)
- **Service**: `chatbotService.ts` - Handles API communication
- **Component**: `PlaceholderChatbot.tsx` - Updated UI with real AI integration
- **Features**: Loading states, error handling, health monitoring

## Troubleshooting

### Backend Issues
- Ensure Python and pip are installed
- Check that all dependencies install successfully
- Verify the Flask server starts without errors on port 5000

### Frontend Issues
- The chat will show "Backend offline" if the Flask server isn't running
- Check browser console for any API errors
- Ensure the React app is running on a different port than the Flask server

### Common Problems
1. **Import errors**: Install missing Python packages with `pip install <package>`
2. **Port conflicts**: Make sure port 5000 is available
3. **CORS errors**: The Flask app is configured with CORS enabled

## Dependencies

### Python Backend
- flask==2.3.3
- flask-cors==4.0.0
- tensorflow==2.13.0
- numpy==1.24.3
- scikit-learn==1.3.0

### React Frontend
- No additional dependencies needed (uses existing packages)

## Next Steps
- Train the model with more specific career guidance data
- Add user authentication to personalize responses
- Implement chat history persistence
- Add more sophisticated NLP for better understanding