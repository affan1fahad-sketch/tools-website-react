import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./SimpleTools.css";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!dob) return;
    const birth = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);
    const daysToNext = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    const dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][birth.getDay()];
    setResult({ years, months, days, totalDays, totalWeeks, totalMonths, daysToNext, dayName });
  };

  return (
    <>
      <Helmet>
        <title>Free Age Calculator — Calculate Your Exact Age Online</title>
        <meta name="description" content="Calculate your exact age in years, months, days and weeks. Find days until your next birthday. Free online age calculator." />
        <link rel="canonical" href="https://free-online-tools1.netlify.app/age-calculator" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#fce7f3" }}>🎂</div>
          <div>
            <h1>Age Calculator</h1>
            <p>Calculate your exact age and days until your next birthday</p>
          </div>
        </div>
        <AdBanner />
        <div className="simple-card">
          <label className="field-label">
            Date of Birth
            <input type="date" className="simple-input" value={dob}
              onChange={e => { setDob(e.target.value); setResult(null); }}
              max={new Date().toISOString().split("T")[0]} />
          </label>
          <button className="primary-btn ripple-btn" onClick={calculate} disabled={!dob}>
            Calculate Age
          </button>
        </div>

        {result && (
          <div className="result-grid animate-scaleIn">
            <div className="result-card blue">
              <div className="result-val">{result.years}</div>
              <div className="result-lab">Years</div>
            </div>
            <div className="result-card pink">
              <div className="result-val">{result.months}</div>
              <div className="result-lab">Months</div>
            </div>
            <div className="result-card green">
              <div className="result-val">{result.days}</div>
              <div className="result-lab">Days</div>
            </div>
            <div className="result-card amber">
              <div className="result-val">{result.totalDays.toLocaleString()}</div>
              <div className="result-lab">Total Days</div>
            </div>
            <div className="result-card purple">
              <div className="result-val">{result.totalWeeks.toLocaleString()}</div>
              <div className="result-lab">Total Weeks</div>
            </div>
            <div className="result-card teal">
              <div className="result-val">{result.daysToNext}</div>
              <div className="result-lab">Days to Birthday</div>
            </div>
          </div>
        )}
        {result && (
          <div className="info-banner animate-fadeUp">
            🗓️ You were born on a <strong>{result.dayName}</strong> &nbsp;·&nbsp; 🎉 Next birthday in <strong>{result.daysToNext} days</strong>
          </div>
        )}
        <div className="tool-info-box">
          <h2>How it works</h2>
          <ul><li>Select your date of birth</li><li>Click Calculate Age</li><li>See your exact age in years, months, days, weeks and more</li></ul>
        </div>
      </main>
    </>
  );
}