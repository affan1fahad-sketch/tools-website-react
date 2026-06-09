import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import AdBanner from "../components/AdBanner";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import "./ToolPage.css";
import "./WordCounter.css";

const faqs = [
  { q: "How accurate is the word count?", a: "Very accurate. Words are counted by splitting on whitespace, which matches how most word processors count." },
  { q: "Does it count characters with or without spaces?", a: "Both! We show characters with spaces and characters without spaces separately." },
  { q: "How is reading time calculated?", a: "Reading time is estimated at 200 words per minute, which is the average adult reading speed." },
  { q: "Is my text saved anywhere?", a: "No. Your text stays in your browser and is never sent to any server." },
];
const related = [
  { path: "/lorem-ipsum-generator", icon: "📄", color: "#f3e8ff", title: "Lorem Ipsum", desc: "Generate placeholder text" },
  { path: "/password-generator", icon: "🔐", color: "#fef9c3", title: "Password Generator", desc: "Create strong passwords" },
  { path: "/percentage-calculator", icon: "%", color: "#fef9c3", title: "Percentage Calculator", desc: "Calculate percentages" },
];

export default function WordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter(p => p.trim().length > 0).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    const speakingTime = Math.max(1, Math.ceil(words / 130));
    const wordList = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const freq = {}; wordList.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    const topWords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return { words, chars, charsNoSpace, sentences, paragraphs, readingTime, speakingTime, topWords };
  }, [text]);

  return (
    <>
      <Helmet>
        <title>Free Word Counter — Count Words, Characters & Reading Time Online</title>
        <meta name="description" content="Count words, characters, sentences and paragraphs instantly. Get reading time and speaking time estimates. Free online word counter tool." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/word-counter" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header"><div className="tool-header-icon" style={{background:"#fce7f3"}}>📝</div><div><h1>Word Counter</h1><p>Count words, characters, sentences and reading time instantly</p></div></div>
        <AdBanner />
        <div className="wc-layout">
          <div className="wc-editor">
            <div className="wc-toolbar">
              <span className="wc-label">Type or paste your text</span>
              <div className="wc-toolbar-actions">
                <button className="ghost-btn-sm" onClick={()=>navigator.clipboard.writeText(text)} disabled={!text}>Copy</button>
                <button className="ghost-btn-sm danger" onClick={()=>setText("")} disabled={!text}>Clear</button>
              </div>
            </div>
            <textarea className="wc-textarea" placeholder="Start typing or paste your text here…" value={text} onChange={e=>setText(e.target.value)} rows={12} />
          </div>
          <div className="wc-stats">
            <div className="wc-stats-grid">
              {[["blue",stats.words.toLocaleString(),"Words"],["pink",stats.chars.toLocaleString(),"Characters"],["green",stats.charsNoSpace.toLocaleString(),"No spaces"],["amber",stats.sentences,"Sentences"],["purple",stats.paragraphs,"Paragraphs"],["teal",stats.readingTime+" min","Read time"]].map(([color,val,lab])=>(
                <div key={lab} className={`stat-card ${color}`}><div className="stat-val">{val}</div><div className="stat-lab">{lab}</div></div>
              ))}
            </div>
            <div className="wc-time-row">
              <div className="time-item"><span className="time-icon">📖</span><div><div className="time-val">{stats.readingTime} min</div><div className="time-lab">Reading time</div></div></div>
              <div className="time-item"><span className="time-icon">🎤</span><div><div className="time-val">{stats.speakingTime} min</div><div className="time-lab">Speaking time</div></div></div>
            </div>
            {stats.topWords.length > 0 && (
              <div className="top-words">
                <div className="top-words-title">Top words</div>
                {stats.topWords.map(([word, count]) => (
                  <div key={word} className="top-word-row">
                    <span className="top-word">{word}</span>
                    <div className="top-word-bar-wrap"><div className="top-word-bar" style={{width:`${(count/stats.topWords[0][1])*100}%`}}/></div>
                    <span className="top-word-count">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="tool-info-box"><h2>About this tool</h2><ul><li>Reading time estimated at 200 words per minute</li><li>Speaking time estimated at 130 words per minute</li><li>Your text is never stored or sent anywhere</li></ul></div>
        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}