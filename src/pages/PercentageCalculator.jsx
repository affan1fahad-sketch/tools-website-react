import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./SimpleTools.css";

function CalcBlock({ title, inputs, formula, resultLabel }) {
  const [vals, setVals] = useState(inputs.map(() => ""));
  const result = (() => { try { return formula(vals.map(Number)); } catch { return null; } })();
  const valid = vals.every(v => v !== "") && result !== null && isFinite(result);

  return (
    <div className="pct-block">
      <div className="pct-block-title">{title}</div>
      <div className="pct-inputs">
        {inputs.map((ph, i) => (
          <input key={i} type="number" className="simple-input" placeholder={ph}
            value={vals[i]} onChange={e => { const n = [...vals]; n[i] = e.target.value; setVals(n); }} />
        ))}
      </div>
      {valid && (
        <div className="pct-result animate-scaleIn">
          {resultLabel(Math.round(result * 100) / 100)}
        </div>
      )}
    </div>
  );
}

export default function PercentageCalculator() {
  return (
    <>
      <Helmet>
        <title>Free Percentage Calculator — Calculate % Online Instantly</title>
        <meta name="description" content="Calculate percentages instantly — find what percent of a number is, percentage increase/decrease, and more. Free online percentage calculator." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/percentage-calculator" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#fef9c3" }}>%</div>
          <div>
            <h1>Percentage Calculator</h1>
            <p>Calculate percentages, increases, decreases and more instantly</p>
          </div>
        </div>
        <AdBanner />

        <div className="pct-grid">
          <CalcBlock
            title="What is X% of Y?"
            inputs={["X (percentage)", "Y (number)"]}
            formula={([x, y]) => (x / 100) * y}
            resultLabel={r => `= ${r}`}
          />
          <CalcBlock
            title="X is what % of Y?"
            inputs={["X (part)", "Y (total)"]}
            formula={([x, y]) => (x / y) * 100}
            resultLabel={r => `= ${r}%`}
          />
          <CalcBlock
            title="% Increase from X to Y"
            inputs={["X (original)", "Y (new value)"]}
            formula={([x, y]) => ((y - x) / x) * 100}
            resultLabel={r => `= ${r > 0 ? "+" : ""}${r}%`}
          />
          <CalcBlock
            title="% Decrease from X to Y"
            inputs={["X (original)", "Y (new value)"]}
            formula={([x, y]) => ((x - y) / x) * 100}
            resultLabel={r => `= ${r}%`}
          />
          <CalcBlock
            title="Add X% to Y"
            inputs={["Y (number)", "X (percentage)"]}
            formula={([y, x]) => y + (y * x / 100)}
            resultLabel={r => `= ${r}`}
          />
          <CalcBlock
            title="Subtract X% from Y"
            inputs={["Y (number)", "X (percentage)"]}
            formula={([y, x]) => y - (y * x / 100)}
            resultLabel={r => `= ${r}`}
          />
        </div>

        <div className="tool-info-box" style={{ marginTop: "1.5rem" }}>
          <h2>How to use</h2>
          <ul>
            <li>Pick the calculation type you need</li>
            <li>Enter the values in the input fields</li>
            <li>Result appears instantly — no button needed</li>
          </ul>
        </div>
      </main>
    </>
  );
}