import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import "./ToolPage.css";
import "./Blog.css";

export default function BlogCgpa() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>How to Calculate CGPA in India — A Complete Student Guide</title>
        <meta name="description" content="Learn how to calculate CGPA and GPA step by step. Understand the 10-point grading scale, convert CGPA to percentage, and use our free calculator." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/blog/how-to-calculate-cgpa" />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org","@type":"Article",
          "headline":"How to Calculate CGPA in India — A Complete Student Guide",
          "author":{"@type":"Person","name":"Affan Fahad"},
          "publisher":{"@type":"Organization","name":"ToolKit"},
          "datePublished":"2026-06-28",
          "url":"https://free-online-tools1.vercel.app/blog/how-to-calculate-cgpa"
        })}</script>
      </Helmet>
      <main className="tool-page blog-page">
        <div className="blog-header">
          <div className="blog-tag">📚 Student Guide</div>
          <h1>How to Calculate CGPA in India — A Complete Guide</h1>
          <div className="blog-meta">By Affan Fahad · June 2026 · 5 min read</div>
        </div>
        <div className="blog-body">
          <p className="blog-lead">
            If you're a student at an Indian university, your performance is almost certainly measured using CGPA — Cumulative Grade Point Average. But how exactly is it calculated, and how do you convert it to a percentage for job applications? This guide explains everything step by step.
          </p>

          <h2>What is GPA vs CGPA?</h2>
          <p><strong>GPA (Grade Point Average)</strong> is your average grade performance for a single semester. <strong>CGPA (Cumulative GPA)</strong> is the weighted average of all your semester GPAs across your entire degree — it's the number that appears on your final marksheet.</p>
          <p>Most Indian universities (following UGC guidelines) use a <strong>10-point grading scale</strong>, where grades range from O (Outstanding, 10 points) down to F (Fail, 0 points).</p>

          <div className="blog-table-wrap">
            <table className="blog-table">
              <thead><tr><th>Grade</th><th>Description</th><th>Grade Points</th></tr></thead>
              <tbody>
                {[["O","Outstanding","10"],["A+","Excellent","9"],["A","Very Good","8"],["B+","Good","7"],["B","Above Average","6"],["C","Average","5"],["P","Pass","4"],["F","Fail","0"]].map(([g,d,p])=>(
                  <tr key={g}><td><strong>{g}</strong></td><td>{d}</td><td>{p}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Step-by-step: How to calculate semester GPA</h2>
          <p>Your semester GPA uses a weighted average based on the <strong>credit hours</strong> of each subject:</p>
          <div className="blog-formula">GPA = Σ (Grade Points × Credits) ÷ Total Credits</div>

          <h3>Example calculation</h3>
          <p>Suppose you completed 5 subjects in Semester 1:</p>
          <div className="blog-table-wrap">
            <table className="blog-table">
              <thead><tr><th>Subject</th><th>Grade</th><th>Grade Points</th><th>Credits</th><th>Points × Credits</th></tr></thead>
              <tbody>
                {[["Mathematics","A+","9","4","36"],["Physics","A","8","3","24"],["Programming","O","10","4","40"],["English","B+","7","2","14"],["Workshop","A","8","1","8"]].map(r=>(
                  <tr key={r[0]}>{r.map((c,i)=><td key={i}>{c}</td>)}</tr>
                ))}
                <tr className="blog-table-total"><td colSpan={3}><strong>Total</strong></td><td><strong>14</strong></td><td><strong>122</strong></td></tr>
              </tbody>
            </table>
          </div>
          <div className="blog-formula">GPA = 122 ÷ 14 = <strong>8.71</strong></div>

          <h2>How to calculate CGPA across semesters</h2>
          <p>CGPA is the weighted average of your semester GPAs, weighted by the total credits in each semester:</p>
          <div className="blog-formula">CGPA = Σ (Semester GPA × Semester Credits) ÷ Total Credits across all semesters</div>
          <p>For example, if you scored 8.71 in Semester 1 (14 credits) and 8.20 in Semester 2 (16 credits):</p>
          <div className="blog-formula">CGPA = (8.71 × 14 + 8.20 × 16) ÷ (14 + 16) = 253.14 ÷ 30 = <strong>8.44</strong></div>

          <h2>How to convert CGPA to percentage</h2>
          <p>The most widely accepted conversion formula recommended by UGC is:</p>
          <div className="blog-formula">Percentage = CGPA × 9.5</div>
          <p>So a CGPA of 8.44 converts to approximately <strong>80.2%</strong>. Note that some universities use their own multiplier — always check your institution's specific policy before submitting to employers.</p>

          <h2>Common mistakes students make</h2>
          <ul className="blog-list">
            <li><strong>Ignoring credit weightage</strong> — a 4-credit subject matters twice as much as a 2-credit one.</li>
            <li><strong>Mixing up GPA and CGPA</strong> — semester GPA can go up or down each semester, while CGPA changes gradually.</li>
            <li><strong>Using the wrong conversion factor</strong> — not all universities use ×9.5. Check your university's own guidelines.</li>
            <li><strong>Not counting backlog grades correctly</strong> — if you cleared a backlog, the new grade typically replaces the old one, but rules vary by institution.</li>
          </ul>

          <h2>Use our free GPA/CGPA Calculator</h2>
          <p>Rather than doing all this manually, use our free browser-based GPA calculator. Enter your subjects, grades, and credit hours — it computes both semester GPA and overall CGPA instantly, with no signup required.</p>
          <button className="primary-btn blog-cta-btn ripple-btn" onClick={() => navigate("/gpa-calculator")}>🎓 Open GPA / CGPA Calculator →</button>

          <h2>Frequently asked questions</h2>
          <div className="blog-faqs">
            {[
              ["Is 7.5 CGPA good in India?","Yes — a CGPA of 7.5 on a 10-point scale is generally considered good. Most reputable companies set their eligibility cutoff between 6.0 and 7.5. Above 8.0 is considered very good."],
              ["Does CGPA matter for placements?","Yes, most campus recruiters have a minimum CGPA cutoff (often 6.0–7.5) to be eligible for the placement process."],
              ["Can I improve my CGPA in the final semester?","Yes, but the impact reduces as you complete more semesters because each new semester carries less weight relative to total accumulated credits."],
              ["What is the difference between SGPA and CGPA?","SGPA (Semester Grade Point Average) refers to a single semester's performance. CGPA is the cumulative average across all semesters combined."],
            ].map(([q,a])=>(
              <div key={q} className="blog-faq-item">
                <div className="blog-faq-q">{q}</div>
                <div className="blog-faq-a">{a}</div>
              </div>
            ))}
          </div>

          <div className="blog-related">
            <div className="blog-related-title">Related tools</div>
            <div className="blog-related-grid">
              {[{path:"/grade-percentage-calculator",icon:"📊",label:"Grade Percentage Calculator"},{path:"/percentage-calculator",icon:"%",label:"Percentage Calculator"},{path:"/calculator",icon:"🧮",label:"Scientific Calculator"}].map(t=>(
                <button key={t.path} className="nf-tool-chip" onClick={()=>navigate(t.path)}>{t.icon} {t.label}</button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}