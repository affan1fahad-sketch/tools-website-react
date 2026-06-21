import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./SimpleTools.css";
import "./TipCalculator.css";

const faqs = [
  { q: "How is the tip calculated?", a: "Tip = Bill Amount × (Tip % / 100). Total = Bill + Tip." },
  { q: "How does splitting work?", a: "The total bill (including tip) is divided equally among the number of people you select." },
  { q: "What tip percentage should I leave?", a: "10% is minimal, 15% is standard, 18-20% is good service, 25%+ is excellent service." },
  { q: "Can I enter a custom tip percentage?", a: "Yes! Type any percentage into the custom field to override the presets." },
];

const related = [
  { path: "/percentage-calculator", icon: "%", color: "#fef9c3", title: "Percentage Calculator", desc: "Calculate percentages" },
  { path: "/calculator", icon: "🧮", color: "#dbeafe", title: "Calculator", desc: "Scientific calculator" },
  { path: "/unit-converter", icon: "📐", color: "#dbeafe", title: "Unit Converter", desc: "Convert units instantly" },
];

const TIP_PRESETS = [10, 15, 18, 20, 25];

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState(15);
  const [custom, setCustom] = useState("");
  const [people, setPeople] = useState(1);

  const activeTip = custom !== "" ? parseFloat(custom) || 0 : tipPct;

  const calc = useMemo(() => {
    const b = parseFloat(bill) || 0;
    const tip = b * (activeTip / 100);
    const total = b + tip;
    const perPerson = total / (people || 1);
    const tipPerPerson = tip / (people || 1);
    return { tip, total, perPerson, tipPerPerson };
  }, [bill, activeTip, people]);

  const fmtMoney = n => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      <Helmet>
        <title>Free Tip Calculator — Calculate Tip and Split Bill Online</title>
        <meta name="description" content="Calculate tip amount and split bills easily. Choose tip percentage, number of people and get instant results. Free online tip calculator." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/tip-calculator" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#dcfce7" }}>💰</div>
          <div><h1>Tip Calculator</h1><p>Calculate tip amount and split bills between friends</p></div>
        </div>
        <AdBanner />

        <div className="simple-card">
          <label className="field-label">
            Bill Amount (₹)
            <input type="number" className="simple-input" placeholder="e.g. 1500" value={bill} onChange={e => setBill(e.target.value)} min="0" />
          </label>

          <div>
            <div className="field-label" style={{ marginBottom: 8 }}>Tip Percentage</div>
            <div className="tip-presets">
              {TIP_PRESETS.map(p => (
                <button key={p}
                  className={`tip-preset-btn ${tipPct === p && custom === "" ? "active" : ""}`}
                  onClick={() => { setTipPct(p); setCustom(""); }}>
                  {p}%
                </button>
              ))}
            </div>
            <input type="number" className="simple-input" placeholder="Custom %" value={custom}
              onChange={e => setCustom(e.target.value)} min="0" max="100" style={{ marginTop: 8 }} />
          </div>

          <label className="field-label">
            Number of people: <strong>{people}</strong>
            <input type="range" min="1" max="20" value={people} onChange={e => setPeople(Number(e.target.value))} className="range-input" />
          </label>
        </div>

        {bill && (
          <div className="tip-results animate-scaleIn">
            <div className="tip-result-grid">
              <div className="tip-result-card accent">
                <div className="tip-result-label">Tip Amount</div>
                <div className="tip-result-val">₹{fmtMoney(calc.tip)}</div>
                <div className="tip-result-sub">{activeTip}% of ₹{fmtMoney(parseFloat(bill) || 0)}</div>
              </div>
              <div className="tip-result-card">
                <div className="tip-result-label">Total Bill</div>
                <div className="tip-result-val">₹{fmtMoney(calc.total)}</div>
                <div className="tip-result-sub">Bill + tip</div>
              </div>
              {people > 1 && (
                <>
                  <div className="tip-result-card">
                    <div className="tip-result-label">Per Person</div>
                    <div className="tip-result-val">₹{fmtMoney(calc.perPerson)}</div>
                    <div className="tip-result-sub">Split {people} ways</div>
                  </div>
                  <div className="tip-result-card">
                    <div className="tip-result-label">Tip Per Person</div>
                    <div className="tip-result-val">₹{fmtMoney(calc.tipPerPerson)}</div>
                    <div className="tip-result-sub">Each person's tip</div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="tool-info-box">
          <h2>Tip guide</h2>
          <ul>
            <li><strong>10%</strong> — Minimal / poor service</li>
            <li><strong>15%</strong> — Standard / okay service</li>
            <li><strong>18%</strong> — Good service</li>
            <li><strong>20%</strong> — Great service</li>
            <li><strong>25%+</strong> — Exceptional service</li>
          </ul>
        </div>
        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}