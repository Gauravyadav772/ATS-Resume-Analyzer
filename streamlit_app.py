import streamlit as st
from backend.utils.resume_parser import extract_text_from_pdf
from backend.utils.resume_analyzer import analyze_resume

st.set_page_config(
    page_title="ATS Resume Analyzer",
    page_icon="📄",
    layout="centered"
)

st.title("📄 ATS Resume Analyzer")
st.subheader("Is your resume good enough?")

uploaded_file = st.file_uploader(
    "Upload Resume (PDF only)",
    type=["pdf"]
)

role = st.selectbox(
    "Select Job Role",
    ["data_analyst", "software_engineer"]
)

if uploaded_file and st.button("Analyze Resume"):
    with st.spinner("Analyzing resume..."):
        text = extract_text_from_pdf(uploaded_file)
        result = analyze_resume(text, role)

    st.success("Analysis Complete")

    st.metric("ATS Score", result["ats_score"])
    st.info(f"Career Readiness: {result['career_readiness']}")

    st.subheader("✅ Matched Skills")
    st.write(result["matched_skills"])

    st.subheader("❌ Missing Skills")
    st.write(result["missing_skills"])

    st.subheader("🔧 Suggestions")
    for s in result["suggestions"]:
        st.write("-", s)
