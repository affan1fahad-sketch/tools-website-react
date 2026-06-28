import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./SimpleTools.css";

const faqs = [
  { q: "How accurate are the exchange rates?", a: "Rates are fetched from a live exchange rate API and update in real time. Rates can shift slightly between providers and throughout the trading day." },
  { q: "Is this currency converter free?", a: "Yes, completely free with no signup and no limit on conversions." },
  { q: "Which currencies are supported?", a: "All major world currencies including USD, EUR, GBP, INR, JPY, AUD, CAD and more." },
  { q: "Why do rates change throughout the day?", a: "Currency exchange rates float continuously based on global trading markets, central bank policy, and supply/demand — they are never perfectly fixed." },
];

const related = [
  { path: "/percentage-calculator", icon: "%", color: "#fef9c3", title: "Percentage Calculator", desc: "Calculate percentages" },
  { path: "/emi-calculator", icon: "🏦", color: "#dbeafe", title: "EMI Calculator", desc: "Calculate loan EMI instantly" },
  { path: "/unit-converter", icon: "📐", color: "#dbeafe", title: "Unit Converter", desc: "Convert units instantly" },
];

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD", "CHF", "CNY", "SGD", "AED", "ZAR"];

// Static fallback rates relative to USD, used if live fetch fails
const FALLBACK_RATES = {
  USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.2, JPY: 156.3, AUD: 1.52,
  CAD: 1.37, CHF: 0.91, CNY: 7.24, SGD: 1.35, AED: 3.67, ZAR: 18.4,
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [rates, setRates] = useState(FALLBACK_RATES);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          setRates(data.rates);
          setUsingFallback(false);
        }
        setLoading(false);
      })
      .catch(() => { setUsingFallback(true); setLoading(false); });
  }, []);

  const convert = useCallback(() => {
    const amt = parseFloat(amount) || 0;
    const fromRate = rates[from] || 1;
    const toRate = rates[to] || 1;
    return (amt / fromRate) * toRate;
  }, [amount, from, to, rates]);

  const swap = () => { setFrom(to); setTo(from); };
  const result = convert();
  const rate = (rates[to] || 1) / (rates[from] || 1);

  return (
    <>
      <Helmet>
        <title>Free Currency Converter — Live Exchange Rates Online</title>
        <meta name="description" content="Convert between world currencies with live exchange rates. USD, EUR, GBP, INR and more. Free online currency converter, no signup needed." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/currency-converter" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#dcfce7" }}>💱</div>
          <div><h1>Currency Converter</h1><p>Convert between currencies using live exchange rates</p></div>
        </div>
        <AdBanner />

        <div className="simple-card">
          <label className="field-label">
            Amount
            <input type="number" className="simple-input" value={amount} onChange={e => setAmount(e.target.value)} min="0" />
          </label>

          <div className="converter-row">
            <div className="converter-col">
              <label className="field-label">From
                <select className="simple-input" value={from} onChange={e => setFrom(e.target.value)}>
                  {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
            </div>
            <button className="swap-btn" onClick={swap} title="Swap currencies">⇄</button>
            <div className="converter-col">
              <label className="field-label">To
                <select className="simple-input" value={to} onChange={e => setTo(e.target.value)}>
                  {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
            </div>
          </div>

          <div className="result-display">
            {loading ? "Loading rates…" : `${result.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to}`}
          </div>

          {!loading && (
            <div className="info-banner" style={{ marginBottom: 0 }}>
              1 {from} = {rate.toFixed(4)} {to}
              {usingFallback && " (using approximate offline rates)"}
            </div>
          )}
        </div>

        <div className="tool-info-box">
          <h2>How exchange rates work</h2>
          <p style={{ marginBottom: 10 }}>
            Currency exchange rates float continuously based on global trading activity, interest rate
            decisions by central banks, and overall supply and demand for each currency. The rate you see
            right now can be slightly different an hour from now — this is completely normal and is why
            banks and money changers always quote a "live" rate rather than a fixed one.
          </p>
          <p>
            This tool fetches current rates from a live exchange rate provider whenever the page loads, so
            your conversion reflects real market pricing rather than a stale, hardcoded number.
          </p>
        </div>

        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}