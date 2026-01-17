https://bejewelled-seahorse-ce880d.netlify.app/
# ATS-Based Resume Analyzer

An **ATS (Applicant Tracking System) inspired Resume Analyzer** that evaluates resumes and provides an ATS score, skill gap analysis, and actionable improvement suggestions.  
This project simulates how modern recruitment systems scan and shortlist resumes.

---

## 🚀 Features

- Upload resumes in **PDF or DOCX** format
- Extract and analyze resume content
- Generate an **ATS score (0–100)**
- Skill matching based on selected job roles
- ATS parse rate evaluation
- Resume improvement suggestions
- Interactive and responsive frontend UI
- REST API–based backend architecture

---

## 🛠️ Tech Stack

### Frontend
- React.js
- CSS
- Lucide Icons
- Circular Progress Bar

### Backend
- Python
- Flask
- Resume text extraction (PDF & DOCX)

---

## 📂 Project Structure

Resume-Analyzer/
│── backend/
│ ├── app.py
│ ├── requirements.txt
│ └── utils/
│ ├── resume_parser.py
│ └── resume_analyzer.py
│
│── frontend-react/
│ ├── src/
│ ├── public/
│ └── package.json
│
│── README.md
│── .gitignore


---

## ⚙️ How It Works

1. User uploads a resume (PDF/DOCX)
2. Backend extracts text from the resume
3. Resume content is analyzed using ATS-style rules
4. Skills and keywords are matched for selected job roles
5. ATS score and suggestions are returned to the frontend
6. Results are displayed visually using charts and categories

---

## ▶️ How to Run the Project

### 🔹 Backend Setup

```bash
cd backend
python app.py


The backend will start at:

http://127.0.0.1:5000

🔹 Frontend Setup

---

### ✅ NEXT STEPS (OPTIONAL)
If you want, I can:
- Add **screenshots section** to README  
- Optimize README for **recruiters**
- Create **deployment instructions**
- Write **project explanation for viva**

Just tell me 👍
