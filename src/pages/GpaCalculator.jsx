import { useState } from "react";
import { Helmet } from "react-helmet-async";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import AdBanner from "../components/AdBanner";
import RippleButton from "../components/RippleButton";
import "./ToolPage.css";
import "./SimpleTools.css";
import "./GpaCalculator.css";

const faqs = [
  { q: "What is the difference between GPA and CGPA?", a: "GPA (Grade Point Average) is calculated for a single semester. CGPA (Cumulative GPA) is the average across all semesters combined." },
  { q: "What grading scale does this use?", a: "This calculator uses a standard 10-point scale (common in Indian universities). You can adjust grade points if your college uses a different scale." },
  { q: "How is GPA calculated?", a: "GPA = (Sum of Grade Points × Credits) ÷ Total Credits, across all your subjects." },
  { q: "Can I calculate CGPA across multiple semesters?", a: "Yes! Add each semester's GPA and credits, and the calculator will compute your overall CGPA." },
];

const related = [
  { path: "/percentage-calculator", icon: "%", color: "#fef9c3", title: "Percentage Calculator", desc: "Calculate percentages" },
  { path: "/calculator", icon: "🧮", color: "#dbeafe", title: "Calculator", desc: "Scientific calculator" },
  { path: "/age-calculator", icon: "🎂", color: "#fce7f3", title: "Age Calculator", desc: "Calculate your exact age" },
];

const GRADE_POINTS = { "O": 10, "A+": 9, "A": 8, "B+": 7, "B": 6, "C": 5, "P": 4, "F": 0 };

export default function GpaCalculator() {
  const [mode, setMode] = useState("gpa");
  const [subjects, setSubjects] = useState([
    { grade: "A", credits: 4 },
    { grade: "A+", credits: 3 },
    { grade: "B+", credits: 4 },
  ]);
  const [semesters, setSemesters] = useState([
    { gpa: "", credits: "" },
    { gpa: "", credits: "" },
  ]);

  const addSubject = () => setSubjects([...subjects, { grade: "A", credits: 3 }]);
  const removeSubject = (i) => setSubjects(subjects.filter((_, idx) => idx !== i));
  const updateSubject = (i, key, val) => {
    const copy = [...subjects];
    copy[i][key] = val;
    setSubjects(copy);
  };

  const addSemester = () => setSemesters([...semesters, { gpa: "", credits: "" }]);
  const removeSemester = (i) => setSemesters(semesters.filter((_, idx) => idx !== i));
  const updateSemester = (i, key, val) => {
    const copy = [...semesters];
    copy[i][key] = val;
    setSemesters(copy);
  };

  const gpaResult = (() => {
    let totalPoints = 0, totalCredits = 0;
    subjects.forEach(s => {
      const credits = parseFloat(s.credits) || 0;
      totalPoints += (GRADE_POINTS[s.grade] || 0) * credits;
      totalCredits += credits;
    });
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  })();

  const cgpaResult = (() => {
    let totalPoints = 0, totalCredits = 0;
    semesters.forEach(s => {
      const gpa = parseFloat(s.gpa) || 0;
      const credits = parseFloat(s.credits) || 0;
      totalPoints += gpa * credits;
      totalCredits += credits;
    });
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  })();

  return (
    <>
      <Helmet>
        <title>Free GPA & CGPA Calculator — Calculate Grade Point Average Online</title>
        <meta name="description" content="Calculate your GPA or CGPA instantly. Add subjects with grades and credits, or combine semester GPAs. Free online tool for students." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/gpa-calculator" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#dbeafe" }}>🎓</div>
          <div><h1>GPA / CGPA Calculator</h1><p>Calculate your semester GPA or overall CGPA instantly</p></div>
        </div>
        <AdBanner />

        <div className="unit-toggle" style={{ marginBottom: "1.25rem" }}>
          <button className={`unit-btn ${mode === "gpa" ? "active" : ""}`} onClick={() => setMode("gpa")}>Semester GPA</button>
          <button className={`unit-btn ${mode === "cgpa" ? "active" : ""}`} onClick={() => setMode("cgpa")}>Overall CGPA</button>
        </div>

        {mode === "gpa" ? (
          <div className="simple-card">
            <div className="gpa-rows">
              {subjects.map((s, i) => (
                <div key={i} className="gpa-row">
                  <select className="simple-input gpa-select" value={s.grade} onChange={e => updateSubject(i, "grade", e.target.value)} style={{ marginTop: 0 }}>
                    {Object.keys(GRADE_POINTS).map(g => <option key={g} value={g}>{g} ({GRADE_POINTS[g]})</option>)}
                  </select>
                  <input type="number" className="simple-input gpa-credits" placeholder="Credits" value={s.credits}
                    onChange={e => updateSubject(i, "credits", e.target.value)} min="0" style={{ marginTop: 0 }} />
                  <button className="gpa-remove" onClick={() => removeSubject(i)} disabled={subjects.length <= 1}>✕</button>
                </div>
              ))}
            </div>
            <button className="upload-btn-small" onClick={addSubject} style={{ alignSelf: "flex-start" }}>+ Add subject</button>
          </div>
        ) : (
          <div className="simple-card">
            <div className="gpa-rows">
              {semesters.map((s, i) => (
                <div key={i} className="gpa-row">
                  <input type="number" className="simple-input gpa-select" placeholder="Semester GPA" value={s.gpa}
                    onChange={e => updateSemester(i, "gpa", e.target.value)} min="0" max="10" step="0.01" style={{ marginTop: 0 }} />
                  <input type="number" className="simple-input gpa-credits" placeholder="Credits" value={s.credits}
                    onChange={e => updateSemester(i, "credits", e.target.value)} min="0" style={{ marginTop: 0 }} />
                  <button className="gpa-remove" onClick={() => removeSemester(i)} disabled={semesters.length <= 1}>✕</button>
                </div>
              ))}
            </div>
            <button className="upload-btn-small" onClick={addSemester} style={{ alignSelf: "flex-start" }}>+ Add semester</button>
          </div>
        )}

        <div className="bmi-result animate-scaleIn">
          <div className="bmi-number" style={{ color: "var(--accent)" }}>
            {mode === "gpa" ? gpaResult : cgpaResult}
          </div>
          <div className="bmi-category" style={{ color: "var(--text-secondary)" }}>
            {mode === "gpa" ? "Semester GPA" : "Overall CGPA"} (out of 10)
          </div>
        </div>

        <div className="tool-info-box">
          <h2>Grade point scale used</h2>
          <ul>
            <li><strong>O (Outstanding)</strong> — 10 points</li>
            <li><strong>A+ (Excellent)</strong> — 9 points</li>
            <li><strong>A (Very Good)</strong> — 8 points</li>
            <li><strong>B+ (Good)</strong> — 7 points</li>
            <li><strong>B (Above Average)</strong> — 6 points</li>
            <li><strong>C (Average)</strong> — 5 points</li>
            <li><strong>P (Pass)</strong> — 4 points</li>
            <li><strong>F (Fail)</strong> — 0 points</li>
          </ul>
        </div>
        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}