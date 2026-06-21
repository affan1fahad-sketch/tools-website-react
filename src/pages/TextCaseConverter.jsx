import { useState } from "react";
import { Helmet } from "react-helmet-async";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./SimpleTools.css";
import "./TextCase.css";

const faqs = [
  { q: "What is Title Case?", a: "Title Case capitalizes the first letter of each word, like a book title." },
  { q: "What is camelCase?", a: "camelCase removes spaces and capitalizes each word except the first — commonly used in programming variable names." },
  { q: "What is snake_case?", a: "snake_case replaces spaces with underscores and uses all lowercase — common in Python and database fields." },
  { q: "Is my text saved anywhere?", a: "No. Your text stays in your browser and is never sent to any server." },
];

const related = [
  { path: "/word-counter", icon: "📝", color: "#fce7f3", title: "Word Counter", desc: "Count words and characters" },
  { path: "/lorem-ipsum-generator", icon: "📄", color: "#f3e8ff", title: "Lorem Ipsum", desc: "Generate placeholder text" },
  { path: "/calculator", icon: "🧮", color: "#dbeafe", title: "Calculator", desc: "Scientific calculator" },
];

const CASES = [
  { label: "UPPER CASE", fn: t => t.toUpperCase() },
  { label: "lower case", fn: t => t.toLowerCase() },
  { label: "Title Case", fn: t => t.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) },
  { label: "Sentence case", fn: t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase() },
  { label: "camelCase", fn: t => t.replace(/\s+(.)/g, (_, c) => c.toUpperCase()).replace(/^\w/, c => c.toLowerCase()) },
  { label: "PascalCase", fn: t => t.replace(/\s+(.)/g, (_, c) => c.toUpperCase()).replace(/^\w/, c => c.toUpperCase()) },
  { label: "snake_case", fn: t => t.toLowerCase().replace(/\s+/g, "_") },
  { label: "kebab-case", fn: t => t.toLowerCase().replace(/\s+/g, "-") },
  { label: "SCREAMING_SNAKE", fn: t => t.toUpperCase().replace(/\s+/g, "_") },
  { label: "aLtErNaTiNg", fn: t => t.split("").map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join("") },
];

export default function TextCaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState("");

  const copy = (val, label) => {
    navigator.clipboard.writeText(val);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Free Text Case Converter — UPPER, lower, Title, camelCase Online</title>
        <meta name="description" content="Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case and more. Free online text case converter, no signup needed." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/text-case-converter" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#fce7f3" }}>🔤</div>
          <div><h1>Text Case Converter</h1><p>Convert text between UPPER, lower, Title, camelCase, snake_case and more</p></div>
        </div>
        <AdBanner />

        <div className="simple-card">
          <label className="field-label">
            Enter your text
            <textarea className="simple-input" rows={4} placeholder="Type or paste your text here..."
              value={text} onChange={e => setText(e.target.value)}
              style={{ resize: "vertical", marginTop: 6 }} />
          </label>
        </div>

        {text && (
          <div className="tc-grid animate-fadeUp">
            {CASES.map(({ label, fn }) => {
              const result = fn(text);
              return (
                <div key={label} className="tc-card">
                  <div className="tc-label">{label}</div>
                  <div className="tc-result">{result}</div>
                  <button
                    className={`cp-copy-btn ${copied === label ? "copied" : ""}`}
                    onClick={() => copy(result, label)}>
                    {copied === label ? "✓" : "Copy"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="tool-info-box" style={{ marginTop: "1.5rem" }}>
          <h2>Available conversions</h2>
          <ul>
            <li><strong>UPPER CASE</strong> — ALL LETTERS CAPITALIZED</li>
            <li><strong>lower case</strong> — all letters lowercase</li>
            <li><strong>Title Case</strong> — First Letter Of Each Word</li>
            <li><strong>camelCase</strong> — used in JavaScript variables</li>
            <li><strong>snake_case</strong> — used in Python variables</li>
            <li><strong>kebab-case</strong> — used in CSS and URLs</li>
          </ul>
        </div>
        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}