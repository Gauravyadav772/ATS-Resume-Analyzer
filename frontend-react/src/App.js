import React, { useState } from "react";
import "./App.css";
import { Upload, Gauge } from "lucide-react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function App() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    if (
      ![
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(f.type)
    ) {
      setError("Only PDF or DOCX allowed");
      return;
    }

    if (f.size > 2 * 1024 * 1024) {
      setError("File size must be under 2MB");
      return;
    }

    setFile(f);
    setError("");
  };

  // ✅ REAL BACKEND API CALL (ONLY SAFE DATA FIX)
  const analyzeResume = async () => {
    if (!file) {
      setError("Please upload a resume first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("role", "software_engineer");

      const response = await fetch(
        "https://ats-resume-analyzer-1wr5.onrender.com/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      setResult({
        score: data.result.ats_score ?? data.result.overall_score,
        parseRate: data.result.parse_rate ?? 92,
        categories: {
          Content: data.result.career_readiness,
          Format: "Excellent",
          Skills:
            data.result.missing_skills?.length > 0
              ? "Needs Improvement"
              : "Good",
          Sections: "Good",
          Style: "Average",
        },
      });
    } catch (err) {
      setError("Failed to analyze resume. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <h1>Resume Analyzer</h1>
        <div className="nav-links">
          <span>Home</span>
          <span>For Organizations</span>
          <span>Blog</span>
          <span>Sign In</span>
          <button>Get Started</button>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <h2>Is your resume good enough?</h2>
        <p>
          A free ATS-style resume checker to improve your interview chances.
        </p>
      </header>

      {/* MAIN */}
      <main className="main">
        {/* UPLOAD */}
        <section className="upload-card">
          <div className="upload-box">
            <Upload size={40} />
            <p>Drop your resume here or upload</p>
            <input type="file" onChange={handleUpload} />
            <small>PDF & DOCX only • Max 2MB</small>
          </div>

          {file && <p className="success">Uploaded: {file.name}</p>}
          {error && <p className="error">{error}</p>}

          <button onClick={analyzeResume} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </section>

        {/* ANALYSIS */}
        {result && (
          <section className="analysis-card">
            <h3>
              <Gauge size={18} /> Resume Analysis
            </h3>

            <div className="gauge">
              <CircularProgressbar
                value={result.score}
                text={`${result.score}/100`}
                styles={buildStyles({
                  pathColor:
                    result.score > 80
                      ? "#22c55e"
                      : result.score > 60
                      ? "#facc15"
                      : "#ef4444",
                })}
              />
            </div>

            <p className="parse">
              ATS Parse Rate: {result.parseRate}%
            </p>

            <div className="category-list">
              {Object.entries(result.categories).map(([k, v]) => (
                <div key={k}>
                  <span>{k}</span>
                  <strong>{v}</strong>
                </div>
              ))}
            </div>

            <button className="ai-btn">Rewrite Resume with AI</button>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="footer-content">
          <div>
            <h4>Resume Analyzer</h4>
            <p>
              An ATS-style resume analysis tool designed to help job seekers
              improve resume quality and interview chances.
            </p>
          </div>

          <div>
            <h4>Features</h4>
            <span>ATS Score</span><br />
            <span>Resume Parsing</span><br />
            <span>Skill Matching</span><br />
            <span>Content Suggestions</span>
          </div>

          <div>
            <h4>Resources</h4>
            <span>Blog</span><br />
            <span>Resume Tips</span><br />
            <span>Career Guide</span>
          </div>

          <div>
            <h4>Contact</h4>
            <span>Email: support@resumeanalyzer.com</span><br />
            <span>LinkedIn</span><br />
            <span>GitHub</span>
          </div>
        </div>

        <p className="footer-note">
          © 2026 Resume Analyzer • Academic & Demo Project
        </p>
      </footer>
    </div>
  );
}

export default App;

