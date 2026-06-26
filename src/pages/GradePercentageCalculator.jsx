import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./SimpleTools.css";
import "./GpaCalculator.css";

const faqs = [
  { q: "How is percentage calculated from marks?", a: "Percentage = (Marks Obtained ÷ Total Marks) × 100." },
  { q: "What grade do I get for my percentage?", a: "This depends on your institution's grading scale. We show the common scale: 90%+ is A+, 80-89% is A, and so on." },
  { q: "Can I calculate percentage for multiple subjects?", a: "Yes! Add each subject's marks and total marks, and the tool calculates your overall percentage." },
  { q: "Is this calculator accurate for all boards?", a: "The percentage calculation is universal (marks ÷ total × 100). Grade labels shown are a common reference — check your specific board or university's exact grading scale." },
];

const related = [
  { path: "/percentage-calculator", icon: "%", color: "#fef9c3", title: "Percentage Calculator", desc: "General percentage calculations" },
  { path: "/calculator", icon: "🧮", color: "#dbeafe", title: "Calculator", desc: "Scientific calculator" },
  { path: "/age-calculator", icon: "🎂", color: "#fce7f3", title: "Age Calculator", desc: "Calculate your exact age" },
];

function getGrade(pct) {
  if (pct >= 90) return { label: "A+", color: "#15803d" };
  if (pct >= 80) return { label: "A", color: "#16a34a" };
  if (pct >= 70) return { label: "B+", color: "#65a30d" };
  if (pct >= 60) return { label: "B", color: "#ca8a04" };
  if (pct >= 50) return { label: "C", color: "#d97706" };
  if (pct >= 40) return { label: "D (Pass)", color: "#ea580c" };
  return { label: "F (Fail)", color: "#dc2626" };
}

export default function GradePercentageCalculator() {
  const [subjects, setSubjects] = useState([
    { name: "Subject 1", marks: "", total: "100" },
    { name: "Subject 2", marks: "", total: "100" },
  ]);

  const addSubject = () => setSubjects([...subjects, { name: `Subject ${subjects.length + 1}`, marks: "", total: "100" }]);
  const removeSubject = (i) => setSubjects(subjects.filter((_, idx) => idx !== i));
  const updateSubject = (i, key, val) => {
    const copy = [...subjects];
    copy[i][key] = val;
    setSubjects(copy);
  };

  const result = useMemo(() => {
    let totalMarks = 0, totalMax = 0;
    subjects.forEach(s => {
      totalMarks += parseFloat(s.marks) || 0;
      totalMax += parseFloat(s.total) || 0;
    });
    const pct = totalMax > 0 ? (totalMarks / totalMax) * 100 : 0;
    return { totalMarks, totalMax, pct: pct.toFixed(2), grade: getGrade(pct) };
  }, [subjects]);

  return (
    <>
      <Helmet>
        <title>Free Grade Percentage Calculator — Calculate Exam Percentage Online</title>
        <meta name="description" content="Calculate your overall exam percentage from marks across multiple subjects. Get your grade instantly. Free online tool for students." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/grade-percentage-calculator" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#fce7f3" }}>📊</div>
          <div><h1>Grade Percentage Calculator</h1><p>Calculate your overall exam percentage and grade across subjects</p></div>
        </div>
        <AdBanner />

        <div className="simple-card">
          <div className="gpa-rows">
            {subjects.map((s, i) => (
              <div key={i} className="grade-row">
                <input type="text" className="simple-input grade-name" placeholder="Subject name" value={s.name}
                  onChange={e => updateSubject(i, "name", e.target.value)} style={{ marginTop: 0 }} />
                <input type="number" className="simple-input grade-marks" placeholder="Marks" value={s.marks}
                  onChange={e => updateSubject(i, "marks", e.target.value)} min="0" style={{ marginTop: 0 }} />
                <span className="grade-slash">/</span>
                <input type="number" className="simple-input grade-marks" placeholder="Total" value={s.total}
                  onChange={e => updateSubject(i, "total", e.target.value)} min="1" style={{ marginTop: 0 }} />
                <button className="gpa-remove" onClick={() => removeSubject(i)} disabled={subjects.length <= 1}>✕</button>
              </div>
            ))}
          </div>
          <button className="upload-btn-small" onClick={addSubject} style={{ alignSelf: "flex-start" }}>+ Add subject</button>
        </div>

        <div className="result-grid animate-scaleIn">
          <div className="result-card blue">
            <div className="result-val">{result.totalMarks}</div>
            <div className="result-lab">Marks Obtained</div>
          </div>
          <div className="result-card amber">
            <div className="result-val">{result.totalMax}</div>
            <div className="result-lab">Total Marks</div>
          </div>
          <div className="result-card green">
            <div className="result-val">{result.pct}%</div>
            <div className="result-lab">Percentage</div>
          </div>
        </div>

        <div className="info-banner">
          🎯 Grade: <strong style={{ color: result.grade.color }}>{result.grade.label}</strong>
        </div>

        <div className="tool-info-box">
          <h2>Common grading scale</h2>
          <ul>
            <li><strong>90% and above</strong> — A+</li>
            <li><strong>80% – 89%</strong> — A</li>
            <li><strong>70% – 79%</strong> — B+</li>
            <li><strong>60% – 69%</strong> — B</li>
            <li><strong>50% – 59%</strong> — C</li>
            <li><strong>40% – 49%</strong> — D (Pass)</li>
            <li><strong>Below 40%</strong> — F (Fail)</li>
          </ul>
          <p>📌 Always check your institution's exact grading scale, as it may differ.</p>
        </div>
        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}