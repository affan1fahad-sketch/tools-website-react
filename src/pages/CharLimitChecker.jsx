import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./SimpleTools.css";
import "./CharLimit.css";

const faqs = [
  { q: "Why does X (Twitter) count emoji and links differently?", a: "X counts most characters as 1, but links are automatically shortened to count as 23 characters regardless of actual length. This tool approximates that link-shortening behavior." },
  { q: "What's the ideal length for a meta description?", a: "Google typically displays up to about 155-160 characters before truncating with '...'. Staying under that keeps your full description visible in search results." },
  { q: "What's the ideal length for a title tag?", a: "Around 50-60 characters is the safe zone for most titles to display fully without being cut off in Google search results." },
  { q: "Does this tool save or send my text anywhere?", a: "No. All counting happens locally in your browser. Nothing is uploaded or stored." },
];

const related = [
  { path: "/word-counter", icon: "📝", color: "#fce7f3", title: "Word Counter", desc: "Count words and reading time" },
  { path: "/text-case-converter", icon: "🔤", color: "#fce7f3", title: "Text Case Converter", desc: "Convert text case" },
  { path: "/lorem-ipsum-generator", icon: "📄", color: "#f3e8ff", title: "Lorem Ipsum", desc: "Generate placeholder text" },
];

const PLATFORMS = [
  { key: "twitter", label: "X (Twitter) post", limit: 280, icon: "🐦" },
  { key: "meta", label: "Meta / SEO description", limit: 160, icon: "🔍" },
  { key: "title", label: "Page title tag", limit: 60, icon: "📑" },
  { key: "instagram", label: "Instagram caption", limit: 2200, icon: "📸" },
  { key: "linkedin", label: "LinkedIn post", limit: 3000, icon: "💼" },
  { key: "sms", label: "SMS message (1 segment)", limit: 160, icon: "💬" },
];

export default function CharLimitChecker() {
  const [text, setText] = useState("");

  const count = text.length;

  const results = useMemo(() => {
    return PLATFORMS.map(p => {
      const remaining = p.limit - count;
      const pct = Math.min(100, (count / p.limit) * 100);
      return { ...p, remaining, pct, over: remaining < 0 };
    });
  }, [count]);

  return (
    <>
      <Helmet>
        <title>Free Character & Word Limit Checker — Twitter, SEO, Instagram Limits</title>
        <meta name="description" content="Check character count against Twitter/X, Instagram, LinkedIn, SMS, and SEO meta description limits all at once. Free online character limit checker." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/character-limit-checker" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#fce7f3" }}>📏</div>
          <div><h1>Character Limit Checker</h1><p>Check your text against Twitter, SEO, Instagram and other platform limits</p></div>
        </div>
        <AdBanner />

        <div className="simple-card">
          <label className="field-label">
            Your text
            <textarea className="simple-input" rows={5} placeholder="Type or paste your post, title, or description..."
              value={text} onChange={e => setText(e.target.value)}
              style={{ resize: "vertical", marginTop: 6 }} />
          </label>
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{count.toLocaleString()} characters</div>
        </div>

        <div className="cl-grid">
          {results.map(r => (
            <div key={r.key} className={`cl-card ${r.over ? "over" : ""}`}>
              <div className="cl-card-top">
                <span className="cl-icon">{r.icon}</span>
                <span className="cl-label">{r.label}</span>
              </div>
              <div className="cl-bar-track">
                <div className="cl-bar-fill" style={{ width: `${r.pct}%`, background: r.over ? "#ef4444" : "var(--accent)" }} />
              </div>
              <div className="cl-count-row">
                <span className="cl-count">{count} / {r.limit}</span>
                <span className={`cl-remaining ${r.over ? "over" : ""}`}>
                  {r.over ? `${Math.abs(r.remaining)} over` : `${r.remaining} left`}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="tool-info-box">
          <h2>Why character limits matter</h2>
          <p style={{ marginBottom: 10 }}>
            Different platforms enforce different limits for very different reasons. Twitter/X limits posts
            to keep them scannable in a fast-moving feed. Google truncates long meta descriptions and titles
            in search results purely for display space — text beyond the limit still exists, it just gets
            cut off with "...", which looks unfinished and can hurt your click-through rate.
          </p>
          <p>
            SMS limits are different again — they're a technical constraint of the original SMS protocol,
            which splits longer messages into multiple "segments" that can cost more to send.
          </p>
        </div>

        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}