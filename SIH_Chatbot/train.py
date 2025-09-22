import json
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.utils import to_categorical
from sklearn.preprocessing import LabelEncoder
import pickle
import random

# Load the intents file
with open('intents.json') as file:
    data = json.load(file)

# Prepare data for training
training_sentences = []
training_labels = []
labels = []
responses = {}

for intent in data['intents']:
    for pattern in intent['patterns']:
        training_sentences.append(pattern)
        training_labels.append(intent['tag'])
    responses[intent['tag']] = intent['responses']
    
    if intent['tag'] not in labels:
        labels.append(intent['tag'])

# Encode labels
label_encoder = LabelEncoder()
label_encoder.fit(training_labels)
encoded_labels = label_encoder.transform(training_labels)
encoded_labels = to_categorical(encoded_labels, num_classes=len(labels))

# Tokenize sentences
vocab_size = 1000
embedding_dim = 16
max_len = 20
oov_token = "<oov>"

tokenizer = Tokenizer(num_words=vocab_size, oov_token=oov_token)
tokenizer.fit_on_texts(training_sentences)
word_index = tokenizer.word_index
sequences = tokenizer.texts_to_sequences(training_sentences)
padded_sequences = pad_sequences(sequences, maxlen=max_len, padding='post')

# Define and train the model
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size, embedding_dim, input_length=max_len),
    tf.keras.layers.GlobalAveragePooling1D(),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(len(labels), activation='softmax')
])

model.compile(loss='categorical_crossentropy', 
              optimizer='adam', 
              metrics=['accuracy'])

model.summary()

epochs = 500
history = model.fit(padded_sequences, 
                    encoded_labels, 
                    epochs=epochs, 
                    verbose=1)

# Save the trained model and artifacts
model.save('chatbot_model.h5')

with open('tokenizer.pkl', 'wb') as token_file:
    pickle.dump(tokenizer, token_file)

with open('label_encoder.pkl', 'wb') as label_file:
    pickle.dump(label_encoder, label_file)
    
print("Training complete and model saved.")