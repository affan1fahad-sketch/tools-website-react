import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import AdBanner from "../components/AdBanner";
import RippleButton from "../components/RippleButton";
import "./ToolPage.css";
import "./ColorPicker.css";

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function rgbToCmyk(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - r - k) / (1 - k)) * 100),
    m: Math.round(((1 - g - k) / (1 - k)) * 100),
    y: Math.round(((1 - b - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

function getLuminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function generateShades(hex) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s } = rgbToHsl(r, g, b);
  return [10, 20, 30, 40, 50, 60, 70, 80, 90].map(l => {
    return hslToHex(h, s, l);
  });
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const PRESETS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
  "#0f172a", "#64748b", "#e2e8f0", "#ffffff",
];

export default function ColorPicker() {
  const [color, setColor] = useState("#3b82f6");
  const [copied, setCopied] = useState("");

  const { r, g, b } = hexToRgb(color);
  const hsl = rgbToHsl(r, g, b);
  const cmyk = rgbToCmyk(r, g, b);
  const shades = generateShades(color);
  const luminance = getLuminance(r, g, b);
  const textColor = luminance > 128 ? "#0f172a" : "#ffffff";

  const copy = useCallback((text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const formats = [
    { label: "HEX", value: color.toUpperCase(), copy: color.toUpperCase() },
    { label: "RGB", value: `rgb(${r}, ${g}, ${b})`, copy: `rgb(${r}, ${g}, ${b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, copy: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: "CMYK", value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`, copy: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
  ];

  return (
    <>
      <Helmet>
        <title>Free Color Picker — HEX, RGB, HSL Converter Online</title>
        <meta name="description" content="Pick any color and instantly convert between HEX, RGB, HSL and CMYK formats. Generate color shades and tints. Free online color picker tool." />
        <link rel="canonical" href="https://free-online-tools1.netlify.app/color-picker" />
      </Helmet>

      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#fce7f3" }}>🎨</div>
          <div>
            <h1>Color Picker</h1>
            <p>Pick any color and convert between HEX, RGB, HSL and CMYK</p>
          </div>
        </div>

        <AdBanner />

        <div className="cp-layout">
          <div className="cp-left">
            <div className="cp-preview" style={{ background: color }}>
              <div className="cp-preview-hex" style={{ color: textColor }}>
                {color.toUpperCase()}
              </div>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="cp-input-hidden"
                title="Pick a color"
              />
              <div className="cp-preview-hint" style={{ color: textColor, opacity: 0.6 }}>
                Click to pick
              </div>
            </div>

            <div className="cp-presets">
              <div className="cp-section-label">Presets</div>
              <div className="cp-preset-grid">
                {PRESETS.map(preset => (
                  <button
                    key={preset}
                    className={`cp-preset-swatch ${color === preset ? "active" : ""}`}
                    style={{ background: preset }}
                    onClick={() => setColor(preset)}
                    title={preset}
                  />
                ))}
              </div>
            </div>

            <div className="cp-shades">
              <div className="cp-section-label">Shades & tints</div>
              <div className="cp-shades-row">
                {shades.map((shade, i) => (
                  <button
                    key={i}
                    className="cp-shade-swatch"
                    style={{ background: shade }}
                    onClick={() => setColor(shade)}
                    title={shade}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="cp-right">
            <div className="cp-section-label">Color formats</div>
            <div className="cp-formats">
              {formats.map(fmt => (
                <div key={fmt.label} className="cp-format-row">
                  <div className="cp-format-label">{fmt.label}</div>
                  <div className="cp-format-value">{fmt.value}</div>
                  <button
                    className={`cp-copy-btn ${copied === fmt.label ? "copied" : ""}`}
                    onClick={() => copy(fmt.copy, fmt.label)}
                  >
                    {copied === fmt.label ? "✓" : "Copy"}
                  </button>
                </div>
              ))}
            </div>

            <div className="cp-section-label" style={{ marginTop: "1.25rem" }}>Color values</div>
            <div className="cp-sliders">
              {[
                { label: "R", value: r, color: "#ef4444", max: 255 },
                { label: "G", value: g, color: "#22c55e", max: 255 },
                { label: "B", value: b, color: "#3b82f6", max: 255 },
              ].map(ch => (
                <div key={ch.label} className="cp-channel-row">
                  <span className="cp-channel-label" style={{ color: ch.color }}>{ch.label}</span>
                  <div className="cp-channel-bar-wrap">
                    <div
                      className="cp-channel-bar"
                      style={{ width: `${(ch.value / ch.max) * 100}%`, background: ch.color }}
                    />
                  </div>
                  <span className="cp-channel-val">{ch.value}</span>
                </div>
              ))}
            </div>

            <div className="cp-contrast-box">
              <div className="cp-section-label">Contrast preview</div>
              <div className="cp-contrast-row">
                <div className="cp-contrast-chip" style={{ background: color, color: "#ffffff" }}>
                  White text
                </div>
                <div className="cp-contrast-chip" style={{ background: color, color: "#000000" }}>
                  Black text
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tool-info-box">
          <h2>Color format guide</h2>
          <ul>
            <li><strong>HEX</strong> — used in CSS and web design (#RRGGBB)</li>
            <li><strong>RGB</strong> — Red, Green, Blue values (0–255 each)</li>
            <li><strong>HSL</strong> — Hue, Saturation, Lightness — best for adjusting colors</li>
            <li><strong>CMYK</strong> — used in print design (Cyan, Magenta, Yellow, Key/Black)</li>
          </ul>
        </div>
      </main>
    </>
  );
}