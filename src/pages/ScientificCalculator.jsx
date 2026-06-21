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

const OP_MAP = { "÷": "/", "×": "*", "−": "-", "+": "+", "xʸ": "**" };

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [stored, setStored] = useState(null);
  const [operator, setOperator] = useState(null);
  const [newNum, setNewNum] = useState(true);
  const [exprText, setExprText] = useState("");

  const clearAll = () => {
    setDisplay("0"); setStored(null); setOperator(null); setNewNum(true); setExprText("");
  };

  const inputDigit = (d) => {
    if (newNum) {
      setDisplay(d === "." ? "0." : d);
      setNewNum(false);
    } else {
      if (d === "." && display.includes(".")) return;
      setDisplay(display === "0" ? d : display + d);
    }
  };

  const formatNum = (n) => (n === null || n === undefined || isNaN(n)) ? "" : String(n);

  const compute = (a, b, op) => {
    const jsOp = OP_MAP[op];
    try {
      const result = Function(`"use strict"; return (${a}${jsOp}${b})`)();
      return parseFloat(result.toFixed(10));
    } catch {
      return NaN;
    }
  };

  const applyUnary = (fn) => {
    const val = parseFloat(display);
    if (isNaN(val)) return;
    const result = fn(val);
    setDisplay(String(parseFloat(result.toFixed(10))));
    setNewNum(true);
  };

  const chooseOperator = (op) => {
    const current = parseFloat(display);
    if (isNaN(current)) return;
    if (stored !== null && operator && !newNum) {
      const result = compute(stored, current, operator);
      setStored(result);
      setExprText(`${formatNum(result)} ${op}`);
      setDisplay(String(result));
    } else {
      setStored(current);
      setExprText(`${formatNum(current)} ${op}`);
    }
    setOperator(op);
    setNewNum(true);
  };

  const equals = () => {
    if (stored === null || operator === null) return;
    const current = parseFloat(display);
    if (isNaN(current)) { setDisplay("Error"); setNewNum(true); return; }
    const result = compute(stored, current, operator);
    setDisplay(isNaN(result) || !isFinite(result) ? "Error" : String(result));
    setExprText("");
    setStored(null);
    setOperator(null);
    setNewNum(true);
  };

  const press = (btn) => {
    if (display === "Error" && btn !== "C") { clearAll(); return; }
    if (btn === "C") { clearAll(); return; }
    if (btn === "⌫") { setDisplay(d => (d.length > 1 && d !== "Error") ? d.slice(0, -1) : "0"); return; }
    if (btn === "=") { equals(); return; }
    if (btn === "±") { const v = parseFloat(display); if (!isNaN(v)) setDisplay(String(-v)); return; }
    if (btn === "%") { const v = parseFloat(display); if (!isNaN(v)) setDisplay(String(v / 100)); return; }
    if (btn === "π") { setDisplay(String(Math.PI)); setNewNum(false); return; }
    if (btn === "e") { setDisplay(String(Math.E)); setNewNum(false); return; }
    if (btn === "√") { applyUnary(v => Math.sqrt(v)); return; }
    if (btn === "x²") { applyUnary(v => v ** 2); return; }
    if (btn === "log") { applyUnary(v => Math.log10(v)); return; }
    if (btn === "1/x") { applyUnary(v => 1 / v); return; }
    if (btn === "sin") { applyUnary(v => Math.sin(v * Math.PI / 180)); return; }
    if (btn === "cos") { applyUnary(v => Math.cos(v * Math.PI / 180)); return; }
    if (btn === "tan") { applyUnary(v => Math.tan(v * Math.PI / 180)); return; }
    if (["÷", "×", "−", "+", "xʸ"].includes(btn)) { chooseOperator(btn); return; }
    if (["(", ")"].includes(btn)) return;
    inputDigit(btn);
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
            <div className="calc-expr">{exprText}</div>
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
            <li>Press an operator, then the next number, then = to get your result</li>
          </ul>
        </div>
        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}