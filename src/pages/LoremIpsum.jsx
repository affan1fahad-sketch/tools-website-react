import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AdBanner from "../components/AdBanner";
import RippleButton from "../components/RippleButton";
import "./ToolPage.css";
import "./SimpleTools.css";

const WORDS = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate","velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum","curabitur","pretium","tincidunt","lacus","nunc","purus","ante","pellentesque","varius","orci","faucibus","pulvinar","facilisis","posuere","erat","arcu","mauris","interdum","augue","bibendum","neque"];

function sentence() {
  const len = Math.floor(Math.random() * 10) + 8;
  const words = Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function paragraph(sentCount = 5) {
  return Array.from({ length: sentCount }, sentence).join(" ");
}

export default function LoremIpsum() {
  const [type, setType] = useState("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [startWithLorem, setStartWithLorem] = useState(true);

  const generate = () => {
    let text = "";
    if (type === "paragraphs") {
      const paras = Array.from({ length: count }, (_, i) => {
        const p = paragraph();
        if (i === 0 && startWithLorem) return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + p;
        return p;
      });
      text = paras.join("\n\n");
    } else if (type === "sentences") {
      const sents = Array.from({ length: count }, (_, i) => {
        if (i === 0 && startWithLorem) return "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        return sentence();
      });
      text = sents.join(" ");
    } else {
      const words = Array.from({ length: count }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);
      if (startWithLorem) words[0] = "Lorem";
      text = words.join(" ");
    }
    setOutput(text);
    setCopied(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Free Lorem Ipsum Generator — Placeholder Text Online</title>
        <meta name="description" content="Generate Lorem Ipsum placeholder text instantly. Choose paragraphs, sentences or words. Free online Lorem Ipsum generator for designers and developers." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/lorem-ipsum-generator" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#f3e8ff" }}>📄</div>
          <div>
            <h1>Lorem Ipsum Generator</h1>
            <p>Generate placeholder text for designs and prototypes instantly</p>
          </div>
        </div>
        <AdBanner />

        <div className="simple-card">
          <div className="lorem-options">
            <div className="unit-toggle">
              {["paragraphs","sentences","words"].map(t => (
                <button key={t} className={`unit-btn ${type === t ? "active" : ""}`}
                  onClick={() => setType(t)}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            <label className="field-label">
              Number of {type}: <strong>{count}</strong>
              <input type="range" min="1" max={type === "words" ? 200 : type === "sentences" ? 20 : 10}
                value={count} onChange={e => setCount(Number(e.target.value))} className="range-input" />
            </label>

            <label className="lorem-check">
              <input type="checkbox" checked={startWithLorem} onChange={e => setStartWithLorem(e.target.checked)} />
              Start with "Lorem ipsum..."
            </label>
          </div>

          <RippleButton className="primary-btn" onClick={generate}>
            Generate Lorem Ipsum
          </RippleButton>
        </div>

        {output && (
          <div className="lorem-output animate-fadeUp">
            <div className="lorem-output-header">
              <span className="lorem-count">{output.split(/\s+/).length} words</span>
              <button className={`cp-copy-btn ${copied ? "copied" : ""}`} onClick={copy}>
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>
            <div className="lorem-text">{output}</div>
          </div>
        )}

        <div className="tool-info-box">
          <h2>What is Lorem Ipsum?</h2>
          <ul>
            <li>Lorem Ipsum is standard placeholder text used in design and publishing</li>
            <li>It helps designers focus on layout without being distracted by readable content</li>
            <li>Originated from a work by Cicero written in 45 BC</li>
          </ul>
        </div>
      </main>
    </>
  );
}