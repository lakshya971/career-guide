from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
import random
import pickle
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model and artifacts
def load_chatbot_model():
    try:
        # Try to load from SIH_Chatbot directory first
        base_path = 'SIH_Chatbot/'
        if not os.path.exists(base_path + 'chatbot_model.h5'):
            base_path = ''  # Try current directory
        
        model = tf.keras.models.load_model(base_path + 'chatbot_model.h5')
        
        with open(base_path + 'tokenizer.pkl', 'rb') as token_file:
            tokenizer = pickle.load(token_file)
        with open(base_path + 'label_encoder.pkl', 'rb') as label_file:
            label_encoder = pickle.load(label_file)
        with open(base_path + 'intents.json') as file:
            intents = json.load(file)
            
        return model, tokenizer, label_encoder, intents
    except Exception as e:
        print(f"Error loading model: {e}")
        return None, None, None, None

# Global variables for model
model, tokenizer, label_encoder, intents = load_chatbot_model()
max_len = 20

def chat(text):
    """Processes user input and returns a chatbot response."""
    if not all([model, tokenizer, label_encoder, intents]):
        return "Sorry, the chatbot model is not available right now. Please try asking about careers, education streams, or scholarships."
    
    try:
        # Preprocess the user input
        sequence = tokenizer.texts_to_sequences([text])
        padded_sequence = pad_sequences(sequence, maxlen=max_len, padding='post')
        
        # Predict the intent
        prediction = model.predict(padded_sequence)[0]
        predicted_label_index = np.argmax(prediction)
        
        # Check if prediction confidence is too low
        if prediction[predicted_label_index] < 0.7:  # Confidence threshold
            return "I'm not sure how to respond to that. Can you please rephrase your question about careers, streams, or scholarships?"
        
        # Get the predicted tag
        predicted_tag = label_encoder.inverse_transform([predicted_label_index])[0]
        
        # Find the corresponding responses and return a random one
        for intent in intents['intents']:
            if intent['tag'] == predicted_tag:
                return random.choice(intent['responses'])
                
        return "I'm not sure how to respond to that. Can you please ask about careers, education streams, or scholarships?"
    except Exception as e:
        print(f"Error in chat function: {e}")
        return "Sorry, I encountered an error processing your request."

@app.route("/")
def index():
    """Health check endpoint for the root."""
    return jsonify({
        "message": "Career Guidance Chatbot API", 
        "status": "running",
        "model_loaded": model is not None,
        "endpoints": {
            "chat": "/get_response (POST)",
            "health": "/health (GET)"
        }
    })

@app.route("/get_response", methods=["POST"])
def get_response():
    """Endpoint to handle user messages and return bot responses."""
    try:
        user_message = request.json.get("message")
        if not user_message:
            return jsonify({"error": "No message provided"}), 400
        
        response = chat(user_message)
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint."""
    return jsonify({"status": "healthy", "model_loaded": model is not None})

if __name__ == "__main__":
    app.run(debug=True, port=5000)