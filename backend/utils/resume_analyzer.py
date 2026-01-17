import re

def analyze_resume(text, role):
    text = text.lower()

    role_skills = {
        "data_analyst": ["python", "sql", "excel", "power bi", "tableau"],
        "software_engineer": ["java", "python", "c++", "git", "oop"]
    }

    matched = []
    missing = []

    # ---------- ATS PARSABILITY ----------
    sections = ["experience", "education", "skills", "project"]
    section_score = sum(1 for s in sections if s in text) * 10  # max 40

    # ---------- SKILL MATCH ----------
    skills = role_skills.get(role, [])
    skill_hits = 0

    for skill in skills:
        if re.search(rf"\b{re.escape(skill)}\b", text):
            matched.append(skill)
            skill_hits += 1
        else:
            missing.append(skill)

    skill_score = (skill_hits / len(skills)) * 40 if skills else 0  # max 40

    ats_parse_score = round(section_score + skill_score, 1)  # max 80

    # ---------- CONTENT QUALITY ----------
    quantified = bool(re.search(r"\d+%", text))
    action_verbs = len(re.findall(
        r"\b(developed|built|designed|implemented|improved|analyzed|created)\b",
        text
    ))

    content_score = 0
    if quantified:
        content_score += 20
    if action_verbs >= 3:
        content_score += 20

    # ---------- FINAL SCORE ----------
    overall_score = round((ats_parse_score * 0.6) + (content_score * 0.4), 1)

    suggestions = []
    if section_score < 30:
        suggestions.append("Add proper sections: Experience, Skills, Education")
    if not quantified:
        suggestions.append("Add quantified achievements (%, numbers)")
    if len(missing) >= 2:
        suggestions.append(f"Add missing role skills: {', '.join(missing[:3])}")

    return {
        "overall_score": overall_score,
        "ats_parse_score": ats_parse_score,
        "content_quality_score": content_score,
        "matched_skills": matched,
        "missing_skills": missing,
        "suggestions": suggestions
    }
