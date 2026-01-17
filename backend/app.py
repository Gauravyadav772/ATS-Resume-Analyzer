from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.resume_parser import extract_text_from_pdf
from utils.resume_analyzer import analyze_resume
import os

app = Flask(__name__)

# ✅ ALLOW FRONTEND CONNECTION
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Backend is running successfully"
    })

@app.route("/analyze", methods=["POST"])
def analyze():
    if "resume" not in request.files:
        return jsonify({"error": "Resume missing"}), 400

    if "role" not in request.form:
        return jsonify({"error": "Role missing"}), 400

    resume = request.files["resume"]
    role = request.form["role"]

    file_path = os.path.join(UPLOAD_FOLDER, resume.filename)
    resume.save(file_path)

    text = extract_text_from_pdf(file_path)
    result = analyze_resume(text, role)

    return jsonify({
        "status": "success",
        "result": result
    })
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

   


