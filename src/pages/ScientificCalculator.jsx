import { useState } from "react";
import { Helmet } from "react-helmet-async";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./Calculator.css";

const faqs = [
  { q: "Is this calculator free?", a: "Yes, completely free with no signup needed." },
  { q: "Does it support trigonometry?", a: "Yes! sin, cos, tan functions are all supported (in degrees)." },
  { q: "What does the % button do?", a: "It converts the current number to a percentage (divides by 100)." },
  { q: "How do I calculate square root?", a: "Press √ to calculate the square root of the current displayed number." },
];

const related = [
  { path: "/percentage-calculator", icon: "%", color: "#fef9c3", title: "Percentage Calculator", desc: "Calculate percentages" },
  { path: "/unit-converter", icon: "📐", color: "#dbeafe", title: "Unit Converter", desc: "Convert units instantly" },
  { path: "/text-case-converter", icon: "🔤", color: "#fce7f3", title: "Text Case Converter", desc: "Convert text case" },
];

const BUTTONS = [
  ["C", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "⌫", "="],
];

const SCI_BUTTONS = [
  ["sin", "cos", "tan", "π"],
  ["√", "x²", "xʸ", "log"],
  ["(", ")", "e", "1/x"],
];

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [expr, setExpr] = useState("");
  const [newNum, setNewNum] = useState(true);

  const press = (btn) => {
    try {
      if (btn === "C") { setDisplay("0"); setExpr(""); setNewNum(true); return; }
      if (btn === "⌫") { setDisplay(d => d.length > 1 ? d.slice(0, -1) : "0"); return; }
      if (btn === "=") {
        const result = Function(`"use strict"; return (${expr || display})`)();
        setDisplay(String(parseFloat(result.toFixed(10))));
        setExpr(""); setNewNum(true); return;
      }
      if (btn === "±") { setDisplay(d => String(-parseFloat(d))); return; }
      if (btn === "%") { setDisplay(d => String(parseFloat(d) / 100)); return; }
      if (btn === "π") { setDisplay(String(Math.PI)); setNewNum(true); return; }
      if (btn === "e") { setDisplay(String(Math.E)); setNewNum(true); return; }
      if (btn === "√") { setDisplay(d => String(Math.sqrt(parseFloat(d)))); return; }
      if (btn === "x²") { setDisplay(d => String(parseFloat(d) ** 2)); return; }
      if (btn === "log") { setDisplay(d => String(Math.log10(parseFloat(d)))); return; }
      if (btn === "1/x") { setDisplay(d => String(1 / parseFloat(d))); return; }
      if (btn === "sin") { setDisplay(d => String(parseFloat(Math.sin(parseFloat(d) * Math.PI / 180).toFixed(10)))); return; }
      if (btn === "cos") { setDisplay(d => String(parseFloat(Math.cos(parseFloat(d) * Math.PI / 180).toFixed(10)))); return; }
      if (btn === "tan") { setDisplay(d => String(parseFloat(Math.tan(parseFloat(d) * Math.PI / 180).toFixed(10)))); return; }
      if (["÷", "×", "−", "+", "xʸ"].includes(btn)) {
        const op = btn === "÷" ? "/" : btn === "×" ? "*" : btn === "−" ? "-" : btn === "xʸ" ? "**" : "+";
        setExpr(expr + display + op); setNewNum(true); return;
      }
      if (["(", ")"].includes(btn)) { setExpr(e => e + btn); return; }
      if (newNum) { setDisplay(btn === "." ? "0." : btn); setNewNum(false); }
      else { setDisplay(d => d === "0" && btn !== "." ? btn : d + btn); }
    } catch { setDisplay("Error"); setNewNum(true); }
  };

  return (
    <>
      <Helmet>
        <title>Free Scientific Calculator Online — Math Calculator</title>
        <meta name="description" content="Free online scientific calculator with sin, cos, tan, square root, logarithm and more. No download needed, works in your browser instantly." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/calculator" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#dbeafe" }}>🧮</div>
          <div><h1>Scientific Calculator</h1><p>Full featured calculator with scientific functions</p></div>
        </div>
        <AdBanner />
        <div className="calc-wrap">
          <div className="calc-display">
            <div className="calc-expr">{expr}</div>
            <div className="calc-num">{display}</div>
          </div>
          <div className="calc-sci-grid">
            {SCI_BUTTONS.map((row, i) => (
              <div key={i} className="calc-row">
                {row.map(btn => (
                  <button key={btn} className="calc-btn sci" onClick={() => press(btn)}>{btn}</button>
                ))}
              </div>
            ))}
          </div>
          <div className="calc-main-grid">
            {BUTTONS.map((row, i) => (
              <div key={i} className="calc-row">
                {row.map(btn => (
                  <button key={btn}
                    className={`calc-btn ${["÷", "×", "−", "+", "="].includes(btn) ? "op" : ["C", "±", "%"].includes(btn) ? "fn" : ""}`}
                    onClick={() => press(btn)}>{btn}</button>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="tool-info-box">
          <h2>How to use</h2>
          <ul>
            <li>Use the number pad for basic arithmetic</li>
            <li>Trig functions (sin, cos, tan) work in degrees</li>
            <li>Use brackets for complex expressions</li>
          </ul>
        </div>
        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}