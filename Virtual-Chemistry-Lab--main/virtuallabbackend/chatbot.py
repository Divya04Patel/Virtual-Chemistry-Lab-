from flask import Blueprint, request, jsonify
from llama_cpp import Llama
import os
import uuid
import time

# ✅ Path to your model file (must match file name exactly)
MODEL_PATH = os.path.join("models", "mistral-7b-instruct-v0.1.Q4_K_M.gguf")

# ✅ Load the model
llm = Llama(
    model_path=MODEL_PATH,
    n_ctx=2048,
    n_threads=6,     # Adjust based on your CPU
    n_batch=64,      # Safe value for 8GB RAM
    verbose=False
)

chatbot_bp = Blueprint('chatbot', _name_)
chat_sessions = {}

@chatbot_bp.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        session_id = data.get('sessionId')
        message = data.get('message')

        if not message:
            return jsonify({'error': 'Message is required'}), 400

        if session_id not in chat_sessions:
            chat_sessions[session_id] = []

        chat_history = chat_sessions[session_id]
        chat_history.append({"role": "user", "content": message})

        prompt = "\n".join([f"{m['role'].capitalize()}: {m['content']}" for m in chat_history]) + "\nAssistant:"

        response = llm(prompt, max_tokens=512, stop=["User:", "Assistant:"], echo=False)
        reply = response["choices"][0]["text"].strip()

        chat_history.append({"role": "assistant", "content": reply})

        return jsonify({
            'sessionId': session_id,
            'response': reply
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500