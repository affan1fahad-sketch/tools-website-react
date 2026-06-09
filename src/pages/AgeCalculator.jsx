import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AdBanner from "../components/AdBanner";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import "./ToolPage.css";
import "./SimpleTools.css";

const faqs = [
  { q: "How accurate is this age calculator?", a: "Very accurate. It calculates your exact age in years, months, and days based on your date of birth." },
  { q: "What is the days to next birthday feature?", a: "It counts exactly how many days remain until your next birthday from today's date." },
  { q: "Can I calculate someone else's age?", a: "Yes! Just enter their date of birth and the calculator will show their exact age." },
];
const related = [
  { path: "/bmi-calculator", icon: "⚖️", color: "#dcfce7", title: "BMI Calculator", desc: "Check body mass index" },
  { path: "/percentage-calculator", icon: "%", color: "#fef9c3", title: "Percentage Calculator", desc: "Calculate percentages" },
  { path: "/unit-converter", icon: "📐", color: "#dbeafe", title: "Unit Converter", desc: "Convert units instantly" },
];

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!dob) return;
    const birth = new Date(dob), today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((today - birth) / (1000*60*60*24));
    const totalWeeks = Math.floor(totalDays / 7);
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);
    const daysToNext = Math.ceil((nextBirthday - today) / (1000*60*60*24));
    const dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][birth.getDay()];
    setResult({ years, months, days, totalDays, totalWeeks, daysToNext, dayName });
  };

  return (
    <>
      <Helmet>
        <title>Free Age Calculator — Calculate Your Exact Age Online</title>
        <meta name="description" content="Calculate your exact age in years, months, days and weeks. Find days until your next birthday. Free online age calculator." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/age-calculator" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header"><div className="tool-header-icon" style={{background:"#fce7f3"}}>🎂</div><div><h1>Age Calculator</h1><p>Calculate your exact age and days until your next birthday</p></div></div>
        <AdBanner />
        <div className="simple-card">
          <label className="field-label">Date of Birth<input type="date" className="simple-input" value={dob} onChange={e=>{setDob(e.target.value);setResult(null);}} max={new Date().toISOString().split("T")[0]} /></label>
          <button className="primary-btn ripple-btn" onClick={calculate} disabled={!dob}>Calculate Age</button>
        </div>
        {result && (<><div className="result-grid animate-scaleIn">
          {[["blue",result.years,"Years"],["pink",result.months,"Months"],["green",result.days,"Days"],["amber",result.totalDays.toLocaleString(),"Total Days"],["purple",result.totalWeeks.toLocaleString(),"Total Weeks"],["teal",result.daysToNext,"Days to Birthday"]].map(([c,v,l])=>(
            <div key={l} className={`result-card ${c}`}><div className="result-val">{v}</div><div className="result-lab">{l}</div></div>
          ))}
        </div>
        <div className="info-banner animate-fadeUp">🗓️ You were born on a <strong>{result.dayName}</strong> &nbsp;·&nbsp; 🎉 Next birthday in <strong>{result.daysToNext} days</strong></div></>)}
        <div className="tool-info-box"><h2>How it works</h2><ul><li>Select your date of birth</li><li>Click Calculate Age</li><li>See your exact age in years, months, days and weeks</li></ul></div>
        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}