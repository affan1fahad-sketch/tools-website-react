import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import AdBanner from "../components/AdBanner";
import RippleButton from "../components/RippleButton";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import "./ToolPage.css";

const SETS = { upper:"ABCDEFGHIJKLMNOPQRSTUVWXYZ", lower:"abcdefghijklmnopqrstuvwxyz", numbers:"0123456789", symbols:"!@#$%^&*()_+-=[]{}|;:,.<>?" };
function getStrength(pw) {
  if(!pw) return {label:"",score:0,color:"#e2e8f0"};
  let s=0; if(pw.length>=8)s++; if(pw.length>=12)s++; if(pw.length>=16)s++; if(/[A-Z]/.test(pw))s++; if(/[0-9]/.test(pw))s++; if(/[^A-Za-z0-9]/.test(pw))s++;
  if(s<=2)return{label:"Weak",score:1,color:"#ef4444"}; if(s<=4)return{label:"Fair",score:2,color:"#f59e0b"}; if(s<=5)return{label:"Strong",score:3,color:"#22c55e"}; return{label:"Very strong",score:4,color:"#16a34a"};
}
const faqs = [
  { q: "Is this password generator safe to use?", a: "Yes. Passwords are generated entirely in your browser using JavaScript's Math.random(). Nothing is sent to any server." },
  { q: "How long should my password be?", a: "We recommend at least 16 characters for important accounts like email and banking. 12+ is acceptable for less critical accounts." },
  { q: "Should I include symbols in my password?", a: "Yes! Including symbols like !@#$ significantly increases password strength and makes it much harder to crack." },
  { q: "Can I use these passwords everywhere?", a: "Yes, but never reuse the same password across multiple sites. Use a password manager like Bitwarden or 1Password to store them." },
];
const related = [
  { path: "/word-counter", icon: "📝", color: "#fce7f3", title: "Word Counter", desc: "Count words and characters" },
  { path: "/qr-code-generator", icon: "▦", color: "#fae8ff", title: "QR Code Generator", desc: "Generate QR codes" },
  { path: "/percentage-calculator", icon: "%", color: "#fef9c3", title: "Percentage Calculator", desc: "Calculate percentages" },
];
export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper:true, lower:true, numbers:true, symbols:false });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const generate = useCallback(() => {
    let cs=""; if(opts.upper)cs+=SETS.upper; if(opts.lower)cs+=SETS.lower; if(opts.numbers)cs+=SETS.numbers; if(opts.symbols)cs+=SETS.symbols; if(!cs)return;
    let pw=""; for(let i=0;i<length;i++)pw+=cs[Math.floor(Math.random()*cs.length)]; setPassword(pw); setCopied(false);
  }, [length, opts]);
  const copy = () => { if(!password)return; navigator.clipboard.writeText(password); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  const toggleOpt = key => { const active=Object.values({...opts,[key]:!opts[key]}).filter(Boolean).length; if(active===0)return; setOpts(o=>({...o,[key]:!o[key]})); };
  const strength = getStrength(password);
  return (
    <>
      <Helmet>
        <title>Free Password Generator — Strong Random Passwords Online</title>
        <meta name="description" content="Generate strong, random passwords instantly. Customize length and character types. Free, secure, runs in your browser — nothing is ever stored." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/password-generator" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header"><div className="tool-header-icon" style={{background:"#fef9c3"}}>🔐</div><div><h1>Password Generator</h1><p>Generate secure, random passwords with custom options</p></div></div>
        <AdBanner />
        <div className="pw-card">
          <div className="pw-output-wrap">
            <span className="pw-output">{password||"Click generate below"}</span>
            <button className={`copy-btn ${copied?"copied":""}`} onClick={copy} disabled={!password}>{copied?"✓ Copied":"Copy"}</button>
          </div>
          {password && (<div className="strength-row"><div className="strength-bars">{[1,2,3,4].map(n=><div key={n} className="strength-bar" style={{background:n<=strength.score?strength.color:"#e2e8f0"}}/>)}</div><span className="strength-label" style={{color:strength.color}}>{strength.label}</span></div>)}
          <div className="pw-options">
            <label className="field-label">Length: <strong>{length}</strong><input type="range" min="4" max="64" value={length} onChange={e=>setLength(Number(e.target.value))} className="range-input"/></label>
            <div className="char-opts">{Object.entries({upper:"A–Z",lower:"a–z",numbers:"0–9",symbols:"!@#"}).map(([key,label])=><button key={key} className={`char-btn ${opts[key]?"active":""}`} onClick={()=>toggleOpt(key)}>{label}</button>)}</div>
          </div>
          <RippleButton className="primary-btn" onClick={generate}>⟳ Generate password</RippleButton>
        </div>
        <div className="tool-info-box"><h2>Password security tips</h2><ul><li>Use at least 16 characters for critical accounts</li><li>Enable symbols for maximum entropy</li><li>Never reuse passwords across sites</li><li>Store passwords in a manager like Bitwarden</li></ul></div>
        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}