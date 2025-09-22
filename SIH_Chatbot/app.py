from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chatbot import chat

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/")
def index():
    """Renders the main chat interface page."""
    return render_template("index.html")

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
    return jsonify({"status": "healthy"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)