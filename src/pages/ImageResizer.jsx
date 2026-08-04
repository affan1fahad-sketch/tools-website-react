import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./SimpleTools.css";

const faqs = [
  { q: "Is this image resizer free?", a: "Yes, completely free with no watermark and no signup required." },
  { q: "Will resizing reduce image quality?", a: "Enlarging an image beyond its original size will reduce sharpness since pixels are being invented. Reducing size generally maintains quality well." },
  { q: "What formats are supported?", a: "JPG, PNG, WebP and most other common image formats. The output is always a PNG to preserve quality." },
  { q: "Does my image get uploaded anywhere?", a: "No. All resizing happens directly in your browser using the Canvas API. Your image never leaves your device." },
  { q: "What does 'maintain aspect ratio' mean?", a: "It means if you change the width, the height adjusts automatically to keep the image proportions the same, preventing distortion." },
];

const related = [
  { path: "/image-to-pdf", icon: "📄", color: "#dbeafe", title: "Image to PDF", desc: "Convert images to PDF" },
  { path: "/image-compressor", icon: "🗜️", color: "#dcfce7", title: "Image Compressor", desc: "Reduce image file size" },
  { path: "/image-to-base64", icon: "🔢", color: "#fef9c3", title: "Image to Base64", desc: "Convert image to Base64" },
];

export default function ImageResizer() {
  const [original, setOriginal] = useState(null);
  const [origSize, setOrigSize] = useState({ w: 0, h: 0 });
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [mode, setMode] = useState("px"); // px or percent
  const [resized, setResized] = useState(null);
  const canvasRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setOriginal({ url, img });
      setOrigSize({ w: img.width, h: img.height });
      setWidth(String(img.width));
      setHeight(String(img.height));
      setResized(null);
    };
    img.src = url;
  };

  const handleWidthChange = (val) => {
    setWidth(val);
    if (maintainRatio && origSize.w) {
      const ratio = origSize.h / origSize.w;
      setHeight(String(Math.round(Number(val) * ratio)));
    }
  };

  const handleHeightChange = (val) => {
    setHeight(val);
    if (maintainRatio && origSize.h) {
      const ratio = origSize.w / origSize.h;
      setWidth(String(Math.round(Number(val) * ratio)));
    }
  };

  const resize = () => {
    if (!original) return;
    let targetW = Number(width);
    let targetH = Number(height);
    if (mode === "percent") {
      targetW = Math.round(origSize.w * targetW / 100);
      targetH = Math.round(origSize.h * targetH / 100);
    }
    const canvas = canvasRef.current;
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(original.img, 0, 0, targetW, targetH);
    setResized({ url: canvas.toDataURL("image/png"), w: targetW, h: targetH });
  };

  const download = () => {
    if (!resized) return;
    const a = document.createElement("a");
    a.href = resized.url;
    a.download = `resized-${resized.w}x${resized.h}.png`;
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>Free Image Resizer — Resize Images Online Without Losing Quality</title>
        <meta name="description" content="Resize any image to exact pixel dimensions or a percentage of original size. Free, instant, no upload needed — runs entirely in your browser." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/image-resizer" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#dbeafe" }}>🖼️</div>
          <div><h1>Image Resizer</h1><p>Resize images to exact dimensions or a percentage — free and private</p></div>
        </div>
        <AdBanner />

        <canvas ref={canvasRef} style={{ display: "none" }} />

        <div
          className="drop-zone"
          onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
          onDragOver={e => e.preventDefault()}
        >
          {!original ? (<>
            <div className="drop-icon">🖼️</div>
            <p className="drop-title">Drag & drop an image here</p>
            <p className="drop-sub">JPG, PNG, WebP supported</p>
            <label className="upload-btn">Browse image<input type="file" accept="image/*" onChange={e => handleFile(e.target.files[0])} hidden /></label>
          </>) : (
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
              <img src={original.url} alt="preview" style={{ maxHeight: 120, maxWidth: 200, borderRadius: 8, objectFit: "contain" }} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>Original</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{origSize.w} × {origSize.h} px</div>
                <label className="upload-btn-small" style={{ marginTop: 8, display: "inline-block" }}>Change image<input type="file" accept="image/*" onChange={e => handleFile(e.target.files[0])} hidden /></label>
              </div>
            </div>
          )}
        </div>

        {original && (
          <div className="simple-card">
            <div className="two-col" style={{ marginBottom: 12 }}>
              <button className={`char-btn ${mode === "px" ? "active" : ""}`} onClick={() => { setMode("px"); setWidth(String(origSize.w)); setHeight(String(origSize.h)); }}>Pixels (px)</button>
              <button className={`char-btn ${mode === "percent" ? "active" : ""}`} onClick={() => { setMode("percent"); setWidth("100"); setHeight("100"); }}>Percentage (%)</button>
            </div>
            <div className="two-col">
              <label className="field-label">Width {mode === "px" ? "(px)" : "(%)"}
                <input type="number" className="simple-input" value={width} onChange={e => handleWidthChange(e.target.value)} min="1" />
              </label>
              <label className="field-label">Height {mode === "px" ? "(px)" : "(%)"}
                <input type="number" className="simple-input" value={height} onChange={e => handleHeightChange(e.target.value)} min="1" />
              </label>
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-secondary)", cursor: "pointer", margin: "4px 0 12px" }}>
              <input type="checkbox" checked={maintainRatio} onChange={e => setMaintainRatio(e.target.checked)} />
              Maintain aspect ratio
            </label>
            <button className="primary-btn ripple-btn" onClick={resize}>Resize Image</button>
          </div>
        )}

        {resized && (
          <div className="simple-card" style={{ textAlign: "center" }}>
            <img src={resized.url} alt="resized" style={{ maxWidth: "100%", maxHeight: 240, borderRadius: 10, marginBottom: 12, objectFit: "contain" }} />
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>{resized.w} × {resized.h} px</div>
            <button className="primary-btn ripple-btn" onClick={download}>⬇ Download Resized Image</button>
          </div>
        )}

        <div className="tool-info-box">
          <h2>How to use</h2>
          <ol>
            <li>Upload any image file</li>
            <li>Enter a target width and height in pixels, or a percentage</li>
            <li>Toggle "Maintain aspect ratio" to avoid distortion</li>
            <li>Click Resize and download the result</li>
          </ol>
          <p>✅ Your image <strong>never leaves your device</strong>.</p>
        </div>

        <div className="tool-info-box">
          <h2>When to resize vs compress</h2>
          <p style={{ marginBottom: 10 }}>
            <strong>Resizing</strong> changes the actual pixel dimensions of an image — useful when a platform
            requires a specific size (like a 400×400 profile picture or a 1200×630 OG image for social media).
          </p>
          <p>
            <strong>Compressing</strong> keeps the dimensions the same but reduces the file size by lowering
            quality slightly — useful for speeding up websites. If you need both, resize first then compress.
          </p>
        </div>

        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}