import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./SimpleTools.css";

const CATEGORIES = {
  Length: {
    units: ["Meter","Kilometer","Centimeter","Millimeter","Mile","Yard","Foot","Inch"],
    base: { Meter:1, Kilometer:1000, Centimeter:0.01, Millimeter:0.001, Mile:1609.344, Yard:0.9144, Foot:0.3048, Inch:0.0254 }
  },
  Weight: {
    units: ["Kilogram","Gram","Milligram","Pound","Ounce","Ton"],
    base: { Kilogram:1, Gram:0.001, Milligram:0.000001, Pound:0.453592, Ounce:0.0283495, Ton:1000 }
  },
  Temperature: { units: ["Celsius","Fahrenheit","Kelvin"], base: null },
  Speed: {
    units: ["km/h","m/s","mph","Knot"],
    base: { "km/h":1, "m/s":3.6, "mph":1.60934, "Knot":1.852 }
  },
  Area: {
    units: ["m²","km²","cm²","Hectare","Acre","ft²"],
    base: { "m²":1, "km²":1e6, "cm²":0.0001, "Hectare":10000, "Acre":4046.86, "ft²":0.092903 }
  },
  Volume: {
    units: ["Liter","Milliliter","Gallon","Quart","Cup","Tablespoon"],
    base: { Liter:1, Milliliter:0.001, Gallon:3.78541, Quart:0.946353, Cup:0.236588, Tablespoon:0.0147868 }
  },
};

function convertTemp(val, from, to) {
  let c;
  if (from === "Celsius") c = val;
  else if (from === "Fahrenheit") c = (val - 32) * 5/9;
  else c = val - 273.15;
  if (to === "Celsius") return c;
  if (to === "Fahrenheit") return c * 9/5 + 32;
  return c + 273.15;
}

export default function UnitConverter() {
  const [category, setCategory] = useState("Length");
  const [from, setFrom] = useState("Meter");
  const [to, setTo] = useState("Kilometer");
  const [input, setInput] = useState("");

  const cat = CATEGORIES[category];

  const convert = () => {
    const val = parseFloat(input);
    if (isNaN(val)) return "";
    if (category === "Temperature") return Math.round(convertTemp(val, from, to) * 10000) / 10000;
    return Math.round((val * cat.base[from] / cat.base[to]) * 10000) / 10000;
  };

  const result = input !== "" ? convert() : "";

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <>
      <Helmet>
        <title>Free Unit Converter — Length, Weight, Temperature, Speed Online</title>
        <meta name="description" content="Convert units instantly — length, weight, temperature, speed, area and volume. Free online unit converter, no signup needed." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/unit-converter" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#dbeafe" }}>📐</div>
          <div>
            <h1>Unit Converter</h1>
            <p>Convert length, weight, temperature, speed, area and volume</p>
          </div>
        </div>
        <AdBanner />
        <div className="simple-card">
          <div className="category-tabs">
            {Object.keys(CATEGORIES).map(c => (
              <button key={c} className={`cat-tab ${category === c ? "active" : ""}`}
                onClick={() => { setCategory(c); setFrom(CATEGORIES[c].units[0]); setTo(CATEGORIES[c].units[1]); setInput(""); }}>
                {c}
              </button>
            ))}
          </div>

          <div className="converter-row">
            <div className="converter-col">
              <label className="field-label">From</label>
              <select className="simple-input" value={from} onChange={e => setFrom(e.target.value)}>
                {cat.units.map(u => <option key={u}>{u}</option>)}
              </select>
              <input type="number" className="simple-input" placeholder="Enter value"
                value={input} onChange={e => setInput(e.target.value)} />
            </div>

            <button className="swap-btn" onClick={swap} title="Swap units">⇄</button>

            <div className="converter-col">
              <label className="field-label">To</label>
              <select className="simple-input" value={to} onChange={e => setTo(e.target.value)}>
                {cat.units.map(u => <option key={u}>{u}</option>)}
              </select>
              <div className="result-display">
                {result !== "" ? result : <span style={{ color: "#cbd5e1" }}>Result</span>}
              </div>
            </div>
          </div>

          {result !== "" && (
            <div className="info-banner animate-scaleIn">
              <strong>{input} {from}</strong> = <strong>{result} {to}</strong>
            </div>
          )}
        </div>

        <div className="tool-info-box">
          <h2>Available conversions</h2>
          <ul>
            <li><strong>Length</strong> — Meter, Kilometer, Mile, Foot, Inch and more</li>
            <li><strong>Weight</strong> — Kilogram, Pound, Ounce, Gram and more</li>
            <li><strong>Temperature</strong> — Celsius, Fahrenheit, Kelvin</li>
            <li><strong>Speed</strong> — km/h, mph, m/s, Knot</li>
            <li><strong>Area</strong> — m², km², Acre, Hectare and more</li>
            <li><strong>Volume</strong> — Liter, Gallon, Cup and more</li>
          </ul>
        </div>
      </main>
    </>
  );
}