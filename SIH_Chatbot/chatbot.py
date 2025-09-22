import json
import random
import pickle
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Load the trained model and artifacts
model = tf.keras.models.load_model('chatbot_model.h5')
with open('tokenizer.pkl', 'rb') as token_file:
    tokenizer = pickle.load(token_file)
with open('label_encoder.pkl', 'rb') as label_file:
    label_encoder = pickle.load(label_file)
with open('intents.json') as file:
    intents = json.load(file)

max_len = 20

def chat(text):
    """Processes user input and returns a chatbot response."""
    # Preprocess the user input
    sequence = tokenizer.texts_to_sequences([text])
    padded_sequence = pad_sequences(sequence, maxlen=max_len, padding='post')
    
    # Predict the intent
    prediction = model.predict(padded_sequence)[0]
    predicted_label_index = np.argmax(prediction)
    
    # Check if prediction confidence is too low
    if prediction[predicted_label_index] < 0.7:  # Confidence threshold
        return "I'm not sure how to respond to that. Can you please rephrase?"
    
    # Get the predicted tag
    predicted_tag = label_encoder.inverse_transform([predicted_label_index])[0]
    
    # Find the corresponding responses and return a random one
    for intent in intents['intents']:
        if intent['tag'] == predicted_tag:
            return random.choice(intent['responses'])
            
    return "I'm not sure how to respond to that. Can you please rephrase?"

if __name__ == '__main__':
    print("Chatbot is ready. Type 'quit' to exit.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == 'quit':
            break
        response = chat(user_input)
        print("Bot:", response)