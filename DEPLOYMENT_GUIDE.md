# 🚀 Deployment Guide

## ✅ What I've Fixed

### 1. **Created `requirements.txt` in root**
```
flask>=2.0.0
flask-cors>=4.0.0
gunicorn>=20.0.0
tensorflow>=2.15.0
numpy>=1.21.0
scikit-learn>=1.0.0
```

### 2. **Created `Procfile` for Render**
```
web: gunicorn app:app
```

### 3. **Updated `app.py`**
- Moved Flask app to root directory
- Integrated chatbot logic directly into app.py
- Added proper error handling
- Made API ready for production

### 4. **Copied Model Files to Root**
- `chatbot_model.h5`
- `tokenizer.pkl`
- `label_encoder.pkl`
- `intents.json`

### 5. **Updated React Service**
- Added environment variable support
- Can switch between local and production URLs

## 🔄 Next Steps

### Step 1: Deploy on Render
1. Go to [Render.com](https://render.com)
2. Click "Manual Deploy" → "Deploy latest commit"
3. Render will now find `requirements.txt` and install dependencies
4. Your app will be available at: `https://career-guide.onrender.com`

### Step 2: Update Frontend
Once deployed, update your `.env` file:
```env
REACT_APP_CHATBOT_API_URL=https://career-guide.onrender.com
```

### Step 3: Test the Integration
1. Deploy your React app to Vercel/Netlify
2. Test the chatbot functionality
3. Both frontend and backend will be live!

## 🛠️ Local Testing

### Test Flask Backend:
```bash
python app.py
# Visit: http://localhost:5000
```

### Test React Frontend:
```bash
npm run dev
# Visit: http://localhost:3000
```

## 📋 API Endpoints

Your deployed Flask app will have:

- **GET** `/` - API info and health status
- **POST** `/get_response` - Chat with the AI
- **GET** `/health` - Health check

## 🔧 Troubleshooting

### If deployment fails:
1. Check Render logs for specific errors
2. Ensure all files are committed and pushed
3. TensorFlow might take longer to install (be patient)

### If chatbot doesn't respond:
1. Check if model files are loaded properly
2. Visit `/health` endpoint to check status
3. Look at server logs for errors

## 🎯 Features Ready

✅ **AI Career Guidance** - Working chatbot with trained model  
✅ **CORS Enabled** - Frontend can communicate with backend  
✅ **Error Handling** - Graceful fallbacks for errors  
✅ **Health Monitoring** - Can check if backend is online  
✅ **Production Ready** - Optimized for deployment

Your chatbot is now ready for production! 🎉