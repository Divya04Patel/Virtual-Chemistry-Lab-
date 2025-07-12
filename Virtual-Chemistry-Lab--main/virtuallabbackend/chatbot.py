from flask import Blueprint, request, jsonify
import google.generativeai as genai
import os
import uuid
import time
from dotenv import load_dotenv
from pathlib import Path

# ✅ Load .env from the project root (same level as app.py)
root_dir = Path(__file__).resolve().parents[1]  # chatbot → virtuallabbackend → project root
env_path = root_dir / '.env'

print(f"🔍 Loading .env from: {env_path}")
if not env_path.exists():
    raise FileNotFoundError(f".env file not found at {env_path} ❌")

load_dotenv(dotenv_path=env_path)

# 🔐 Load Gemini API key
api_key = os.getenv("GOOGLE_API_KEY")
print(f"🔑 Loaded API key: {api_key}")

if not api_key:
    raise EnvironmentError("GOOGLE_API_KEY not found in .env file ❌")

# ✅ Configure Gemini
genai.configure(api_key=api_key)
model = genai.GenerativeModel('models/gemini-1.5-pro-latest')

# 🧠 Maintain per-session chat history
chat_sessions = {}

def cleanup_old_sessions():
    current_time = time.time()
    expired = [sid for sid, session in chat_sessions.items()
               if current_time - session.get('created_at', 0) > 3600]
    for sid in expired:
        del chat_sessions[sid]

# ✅ Register Flask Blueprint
chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()

        message = data.get('message')
        if not message:
            return jsonify({'error': 'Message is required'}), 400

        session_id = data.get('sessionId')
        cleanup_old_sessions()

        if session_id and session_id in chat_sessions:
            chat = chat_sessions[session_id]['chat']
        else:
            chat = model.start_chat(history=[])
            session_id = str(uuid.uuid4())
            chat_sessions[session_id] = {
                'chat': chat,
                'created_at': time.time()
            }

        response = chat.send_message(message)

        return jsonify({
            'sessionId': session_id,
            'response': response.text
        })

    except Exception as e:
        print(f"❌ Error in /api/chat: {e}")
        return jsonify({
            'error': 'Failed to process chat message',
            'details': str(e)
        }), 500

# ✅ Print files in the folder for debug
print(f"📂 Files in folder: {list(root_dir.glob('*'))}")
