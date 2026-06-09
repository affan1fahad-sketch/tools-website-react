import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AdBanner from "../components/AdBanner";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import "./ToolPage.css";
import "./SimpleTools.css";

const faqs = [
  { q: "What is BMI?", a: "BMI (Body Mass Index) is a measure of body fat based on height and weight. It applies to adult men and women." },
  { q: "Is BMI accurate?", a: "BMI is a useful screening tool but not a diagnostic measure. It doesn't account for muscle mass, age, or body composition. Consult a doctor for medical advice." },
  { q: "What is a healthy BMI?", a: "A BMI between 18.5 and 24.9 is considered normal weight for most adults." },
  { q: "Does this support imperial units?", a: "Yes! Toggle between metric (kg/cm) and imperial (lbs/ft) using the buttons at the top." },
];
const related = [
  { path: "/age-calculator", icon: "🎂", color: "#fce7f3", title: "Age Calculator", desc: "Calculate your exact age" },
  { path: "/unit-converter", icon: "📐", color: "#dbeafe", title: "Unit Converter", desc: "Convert kg to lbs and more" },
  { path: "/percentage-calculator", icon: "%", color: "#fef9c3", title: "Percentage Calculator", desc: "Calculate percentages" },
];

function rgbToHsl(r,g,b){r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b);let h,s,l=(max+min)/2;if(max===min){h=s=0;}else{const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}}return{h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)};}

export default function BMICalculator() {
  const [unit, setUnit] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    let bmi;
    if (unit === "metric") { const h = parseFloat(height)/100; bmi = parseFloat(weight)/(h*h); }
    else { const totalIn = parseFloat(heightFt)*12 + parseFloat(heightIn||0); bmi = (parseFloat(weight)/(totalIn*totalIn))*703; }
    if (isNaN(bmi)||bmi<=0) return;
    bmi = Math.round(bmi*10)/10;
    let category, color, advice;
    if(bmi<18.5){category="Underweight";color="#3b82f6";advice="Consider consulting a nutritionist to gain healthy weight.";}
    else if(bmi<25){category="Normal weight";color="#22c55e";advice="Great! Maintain your current lifestyle.";}
    else if(bmi<30){category="Overweight";color="#f59e0b";advice="Consider a balanced diet and regular physical activity.";}
    else{category="Obese";color="#ef4444";advice="Please consult a healthcare professional for guidance.";}
    const pct = Math.min(Math.max(((bmi-10)/30)*100,0),100);
    setResult({ bmi, category, color, advice, pct });
  };

  const canCalc = unit==="metric" ? weight&&height : weight&&heightFt;

  return (
    <>
      <Helmet>
        <title>Free BMI Calculator — Check Your Body Mass Index Online</title>
        <meta name="description" content="Calculate your BMI instantly. Supports metric and imperial units. Free online BMI calculator with health category and advice." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/bmi-calculator" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header"><div className="tool-header-icon" style={{background:"#dcfce7"}}>⚖️</div><div><h1>BMI Calculator</h1><p>Calculate your Body Mass Index with metric or imperial units</p></div></div>
        <AdBanner />
        <div className="simple-card">
          <div className="unit-toggle">
            <button className={`unit-btn ${unit==="metric"?"active":""}`} onClick={()=>{setUnit("metric");setResult(null);}}>Metric (kg/cm)</button>
            <button className={`unit-btn ${unit==="imperial"?"active":""}`} onClick={()=>{setUnit("imperial");setResult(null);}}>Imperial (lb/ft)</button>
          </div>
          <label className="field-label">Weight ({unit==="metric"?"kg":"lbs"})<input type="number" className="simple-input" placeholder={unit==="metric"?"e.g. 70":"e.g. 154"} value={weight} onChange={e=>{setWeight(e.target.value);setResult(null);}} min="1"/></label>
          {unit==="metric" ? (
            <label className="field-label">Height (cm)<input type="number" className="simple-input" placeholder="e.g. 175" value={height} onChange={e=>{setHeight(e.target.value);setResult(null);}} min="1"/></label>
          ) : (
            <div className="two-col">
              <label className="field-label">Feet<input type="number" className="simple-input" placeholder="5" value={heightFt} onChange={e=>{setHeightFt(e.target.value);setResult(null);}} min="1"/></label>
              <label className="field-label">Inches<input type="number" className="simple-input" placeholder="9" value={heightIn} onChange={e=>{setHeightIn(e.target.value);setResult(null);}} min="0" max="11"/></label>
            </div>
          )}
          <button className="primary-btn ripple-btn" onClick={calculate} disabled={!canCalc}>Calculate BMI</button>
        </div>
        {result && (
          <div className="bmi-result animate-scaleIn">
            <div className="bmi-number" style={{color:result.color}}>{result.bmi}</div>
            <div className="bmi-category" style={{color:result.color}}>{result.category}</div>
            <div className="bmi-bar-wrap">
              <div className="bmi-bar-track"><div className="bmi-marker" style={{left:`${result.pct}%`}}/></div>
              <div className="bmi-labels"><span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span></div>
            </div>
            <div className="info-banner" style={{marginTop:"1rem"}}>💡 {result.advice}</div>
          </div>
        )}
        <div className="tool-info-box"><h2>BMI Categories</h2><ul><li><strong>Below 18.5</strong> — Underweight</li><li><strong>18.5–24.9</strong> — Normal weight</li><li><strong>25.0–29.9</strong> — Overweight</li><li><strong>30.0+</strong> — Obese</li></ul></div>
        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}