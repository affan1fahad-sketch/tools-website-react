import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./SimpleTools.css";

const faqs = [
  { q: "What is EMI?", a: "EMI stands for Equated Monthly Installment — a fixed payment amount made by a borrower to a lender at a specified date each month, covering both interest and principal." },
  { q: "How is EMI calculated?", a: "EMI = [P × r × (1+r)^n] / [(1+r)^n − 1], where P is the loan amount, r is the monthly interest rate, and n is the number of monthly installments." },
  { q: "Does a longer loan tenure mean lower total cost?", a: "No — a longer tenure lowers your monthly EMI but increases the total interest paid over the life of the loan, since interest accrues for longer." },
  { q: "Is this calculator accurate for my actual loan?", a: "It gives a close estimate using standard EMI formula. Your actual bank may apply slightly different compounding, processing fees, or insurance charges." },
];

const related = [
  { path: "/percentage-calculator", icon: "%", color: "#fef9c3", title: "Percentage Calculator", desc: "Calculate percentages" },
  { path: "/currency-converter", icon: "💱", color: "#dcfce7", title: "Currency Converter", desc: "Convert between currencies" },
  { path: "/calculator", icon: "🧮", color: "#dbeafe", title: "Calculator", desc: "Scientific calculator" },
];

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState("500000");
  const [rate, setRate] = useState("9.5");
  const [tenure, setTenure] = useState("5");

  const result = useMemo(() => {
    const P = parseFloat(principal) || 0;
    const annualRate = parseFloat(rate) || 0;
    const years = parseFloat(tenure) || 0;
    const r = annualRate / 12 / 100;
    const n = years * 12;
    if (P <= 0 || r <= 0 || n <= 0) return { emi: 0, totalPayment: 0, totalInterest: 0 };
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;
    return { emi, totalPayment, totalInterest };
  }, [principal, rate, tenure]);

  const fmt = n => n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
  const interestPct = result.totalPayment > 0 ? (result.totalInterest / result.totalPayment) * 100 : 0;

  return (
    <>
      <Helmet>
        <title>Free EMI Calculator — Loan EMI & Interest Calculator Online</title>
        <meta name="description" content="Calculate your monthly loan EMI, total interest, and total payment instantly. Free online EMI calculator for home, car, and personal loans." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/emi-calculator" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#dbeafe" }}>🏦</div>
          <div><h1>EMI Calculator</h1><p>Calculate your monthly loan installment and total interest</p></div>
        </div>
        <AdBanner />

        <div className="simple-card">
          <label className="field-label">
            Loan Amount (₹)
            <input type="number" className="simple-input" value={principal} onChange={e => setPrincipal(e.target.value)} min="0" />
          </label>
          <div className="two-col">
            <label className="field-label">
              Interest Rate (% per year)
              <input type="number" className="simple-input" value={rate} onChange={e => setRate(e.target.value)} min="0" step="0.1" />
            </label>
            <label className="field-label">
              Tenure (years)
              <input type="number" className="simple-input" value={tenure} onChange={e => setTenure(e.target.value)} min="1" />
            </label>
          </div>
        </div>

        <div className="result-grid animate-scaleIn">
          <div className="result-card blue">
            <div className="result-val">₹{fmt(result.emi)}</div>
            <div className="result-lab">Monthly EMI</div>
          </div>
          <div className="result-card amber">
            <div className="result-val">₹{fmt(result.totalInterest)}</div>
            <div className="result-lab">Total Interest</div>
          </div>
          <div className="result-card green">
            <div className="result-val">₹{fmt(result.totalPayment)}</div>
            <div className="result-lab">Total Payment</div>
          </div>
        </div>

        {result.totalPayment > 0 && (
          <div className="info-banner">
            💡 Interest makes up <strong>{interestPct.toFixed(1)}%</strong> of your total payment
          </div>
        )}

        <div className="tool-info-box">
          <h2>How EMI is calculated</h2>
          <p style={{ marginBottom: 10 }}>
            Every EMI payment is split between interest and principal. Early in the loan, a larger portion of
            each EMI goes toward interest because the outstanding balance is still high. As you pay down the
            principal over time, more of each EMI goes toward principal and less toward interest — even though
            the EMI amount itself stays constant.
          </p>
          <p>
            This is why paying even a small amount extra toward principal early in a loan can meaningfully
            reduce total interest paid over its full term.
          </p>
        </div>

        <div className="tool-info-box">
          <h2>Tenure vs. total cost trade-off</h2>
          <ul>
            <li>A <strong>longer tenure</strong> gives you a smaller monthly EMI, which helps cash flow, but increases total interest paid.</li>
            <li>A <strong>shorter tenure</strong> means higher EMIs but significantly less interest over the life of the loan.</li>
            <li>Try adjusting the tenure above and watch how the total interest changes — even an extra 1-2 years can add a large amount to your total cost.</li>
          </ul>
        </div>

        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}