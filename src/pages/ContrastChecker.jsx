import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./SimpleTools.css";
import "./ContrastChecker.css";

const faqs = [
  { q: "What is WCAG and why does it matter?", a: "WCAG (Web Content Accessibility Guidelines) is the standard used to judge whether text is readable enough for people with low vision or color blindness. Many countries legally require public websites to meet WCAG AA." },
  { q: "What's the difference between AA and AAA?", a: "AA is the standard most sites aim for (4.5:1 for normal text, 3:1 for large text). AAA is stricter (7:1 for normal text) and is recommended but not always required." },
  { q: "What counts as 'large text'?", a: "Text that is at least 18pt (24px) regular weight, or 14pt (18.66px) bold, qualifies for the relaxed large-text contrast requirement." },
  { q: "Does this check colorblind accessibility too?", a: "Contrast ratio alone doesn't fully cover colorblindness, but high contrast generally helps. For full colorblind testing, also avoid relying on color alone to convey meaning (e.g. red vs green status)." },
];

const related = [
  { path: "/color-picker", icon: "🎨", color: "#fce7f3", title: "Color Picker", desc: "Convert HEX, RGB, HSL colors" },
  { path: "/word-counter", icon: "📝", color: "#fce7f3", title: "Word Counter", desc: "Count words and characters" },
  { path: "/markdown-to-html", icon: "📋", color: "#dbeafe", title: "Markdown to HTML", desc: "Convert Markdown to HTML" },
];

function hexToRgb(hex) {
  const m = hex.replace("#", "").match(/.{1,2}/g);
  if (!m || m.length < 3) return null;
  return m.slice(0, 3).map(x => parseInt(x, 16));
}

function luminance([r, g, b]) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 0;
  const l1 = luminance(rgb1);
  const l2 = luminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export default function ContrastChecker() {
  const [fg, setFg] = useState("#0f172a");
  const [bg, setBg] = useState("#ffffff");

  const ratio = useMemo(() => contrastRatio(fg, bg), [fg, bg]);

  const passAA_normal = ratio >= 4.5;
  const passAA_large = ratio >= 3;
  const passAAA_normal = ratio >= 7;
  const passAAA_large = ratio >= 4.5;

  return (
    <>
      <Helmet>
        <title>Free Color Contrast Checker — WCAG Accessibility Checker Online</title>
        <meta name="description" content="Check color contrast ratio between text and background colors for WCAG AA and AAA accessibility compliance. Free online contrast checker." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/color-contrast-checker" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#f3e8ff" }}>🌗</div>
          <div><h1>Color Contrast Checker</h1><p>Check WCAG accessibility compliance for text and background colors</p></div>
        </div>
        <AdBanner />

        <div className="simple-card">
          <div className="two-col">
            <label className="field-label">
              Text color
              <div className="color-row" style={{ marginTop: 6 }}>
                <input type="color" value={fg} onChange={e => setFg(e.target.value)} className="color-input" />
                <span className="color-val">{fg}</span>
              </div>
            </label>
            <label className="field-label">
              Background color
              <div className="color-row" style={{ marginTop: 6 }}>
                <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="color-input" />
                <span className="color-val">{bg}</span>
              </div>
            </label>
          </div>
        </div>

        <div className="cc-preview" style={{ background: bg, color: fg }}>
          <div className="cc-preview-large">Large preview text</div>
          <div className="cc-preview-normal">Normal sized body text looks like this. The quick brown fox jumps over the lazy dog.</div>
        </div>

        <div className="cc-ratio-box">
          <div className="cc-ratio-num">{ratio.toFixed(2)}:1</div>
          <div className="cc-ratio-lab">Contrast ratio</div>
        </div>

        <div className="cc-checks">
          <div className={`cc-check ${passAA_normal ? "pass" : "fail"}`}>
            <span>{passAA_normal ? "✅" : "❌"}</span> WCAG AA — Normal text (4.5:1 required)
          </div>
          <div className={`cc-check ${passAA_large ? "pass" : "fail"}`}>
            <span>{passAA_large ? "✅" : "❌"}</span> WCAG AA — Large text (3:1 required)
          </div>
          <div className={`cc-check ${passAAA_normal ? "pass" : "fail"}`}>
            <span>{passAAA_normal ? "✅" : "❌"}</span> WCAG AAA — Normal text (7:1 required)
          </div>
          <div className={`cc-check ${passAAA_large ? "pass" : "fail"}`}>
            <span>{passAAA_large ? "✅" : "❌"}</span> WCAG AAA — Large text (4.5:1 required)
          </div>
        </div>

        <div className="tool-info-box">
          <h2>Why contrast ratio matters</h2>
          <p style={{ marginBottom: 10 }}>
            Low contrast between text and its background is one of the most common accessibility failures on
            the web — affecting people with low vision, color blindness, or anyone reading a screen in bright
            sunlight. The WCAG contrast ratio gives an objective number, from 1:1 (no contrast) to 21:1
            (pure black on pure white), so designers can verify readability rather than guessing.
          </p>
          <p>
            Meeting at least AA level is considered the practical minimum for any public-facing website, and
            is a legal requirement in several countries under accessibility laws.
          </p>
        </div>

        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}