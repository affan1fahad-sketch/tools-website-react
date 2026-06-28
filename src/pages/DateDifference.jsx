import { useState } from "react";
import { Helmet } from "react-helmet-async";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./SimpleTools.css";

const faqs = [
  { q: "Does this include both the start and end date?", a: "The calculation counts the number of full days between the two dates. The start date itself is day zero." },
  { q: "Can I calculate dates in the future?", a: "Yes! Enter any two dates, past or future, and the calculator works the same way either direction." },
  { q: "Why would I need to calculate the difference between two dates?", a: "Common uses include counting days until a deadline, calculating someone's exact age, project timelines, contract durations, or how long ago an event happened." },
  { q: "Does it account for leap years?", a: "Yes, the calculation uses standard JavaScript date math which correctly accounts for leap years automatically." },
];

const related = [
  { path: "/age-calculator", icon: "🎂", color: "#fce7f3", title: "Age Calculator", desc: "Calculate your exact age" },
  { path: "/stopwatch", icon: "⏱️", color: "#dcfce7", title: "Stopwatch & Timer", desc: "Track time with lap and countdown" },
  { path: "/percentage-calculator", icon: "%", color: "#fef9c3", title: "Percentage Calculator", desc: "Calculate percentages" },
];

export default function DateDifference() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = Math.abs(end - start);
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = Math.floor(totalDays / 30.44);
    const totalYears = (totalDays / 365.25).toFixed(2);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    if (days < 0) { months--; days += new Date(end.getFullYear(), end.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    if (end < start) { years = -years; months = -months; days = -days; }

    setResult({ totalDays, totalWeeks, totalMonths, totalYears, years: Math.abs(years), months: Math.abs(months), days: Math.abs(days), isPast: end < start });
  };

  return (
    <>
      <Helmet>
        <title>Free Date Difference Calculator — Days Between Two Dates Online</title>
        <meta name="description" content="Calculate the number of days, weeks, months, and years between any two dates. Free online date difference calculator, no signup needed." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/date-difference-calculator" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#dbeafe" }}>📅</div>
          <div><h1>Date Difference Calculator</h1><p>Calculate the exact number of days, weeks, and months between two dates</p></div>
        </div>
        <AdBanner />

        <div className="simple-card">
          <div className="two-col">
            <label className="field-label">
              Start Date
              <input type="date" className="simple-input" value={startDate} onChange={e => { setStartDate(e.target.value); setResult(null); }} />
            </label>
            <label className="field-label">
              End Date
              <input type="date" className="simple-input" value={endDate} onChange={e => { setEndDate(e.target.value); setResult(null); }} />
            </label>
          </div>
          <button className="primary-btn ripple-btn" onClick={calculate} disabled={!startDate || !endDate}>Calculate Difference</button>
        </div>

        {result && (
          <>
            <div className="info-banner">
              {result.isPast ? "⏪" : "⏩"} <strong>{result.years} years, {result.months} months, {result.days} days</strong>
            </div>
            <div className="result-grid animate-scaleIn">
              <div className="result-card blue">
                <div className="result-val">{result.totalDays.toLocaleString()}</div>
                <div className="result-lab">Total Days</div>
              </div>
              <div className="result-card green">
                <div className="result-val">{result.totalWeeks.toLocaleString()}</div>
                <div className="result-lab">Total Weeks</div>
              </div>
              <div className="result-card amber">
                <div className="result-val">{result.totalMonths.toLocaleString()}</div>
                <div className="result-lab">Total Months</div>
              </div>
            </div>
          </>
        )}

        <div className="tool-info-box">
          <h2>Common uses for date difference calculations</h2>
          <ul>
            <li>Counting down to a deadline, exam date, or event</li>
            <li>Calculating contract or lease duration</li>
            <li>Figuring out how many days pregnant or how old a baby is</li>
            <li>Project timeline planning between milestones</li>
            <li>Calculating how long ago a historical event happened</li>
          </ul>
        </div>

        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}