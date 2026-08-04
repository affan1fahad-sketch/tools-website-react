import { useState } from "react";
import { Helmet } from "react-helmet-async";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./SimpleTools.css";

const faqs = [
  { q: "What is Base64 encoding?", a: "Base64 is a way of encoding binary data (like an image) as a plain text string made up of letters, numbers, and symbols. It lets you embed images directly in HTML, CSS, or JSON without needing a separate file." },
  { q: "When should I use Base64 images?", a: "For small icons or inline images in HTML emails, CSS stylesheets, or data URIs. For large images it's inefficient — Base64 increases file size by about 33%." },
  { q: "Is the output safe to use in HTML?", a: "Yes. The data URI format (data:image/...;base64,...) is supported in all modern browsers and can be used anywhere a regular image URL is accepted." },
  { q: "Does this upload my image anywhere?", a: "No. Conversion happens entirely in your browser using the FileReader API. Your image never leaves your device." },
  { q: "Why is the Base64 string so long?", a: "Base64 represents every 3 bytes of binary data as 4 text characters, making the output about 33% larger than the original file. A 100KB image becomes roughly 133KB of Base64 text." },
];

const related = [
  { path: "/image-resizer", icon: "🖼️", color: "#dbeafe", title: "Image Resizer", desc: "Resize images to exact dimensions" },
  { path: "/image-compressor", icon: "🗜️", color: "#dcfce7", title: "Image Compressor", desc: "Reduce image file size" },
  { path: "/image-to-pdf", icon: "📄", color: "#dbeafe", title: "Image to PDF", desc: "Convert images to PDF" },
];

export default function ImageToBase64() {
  const [result, setResult] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [preview, setPreview] = useState("");
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState("datauri"); // datauri or raw

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setFileName(file.name);
    setFileSize(file.size);
    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target.result;
      const base64 = dataUri.split(",")[1];
      setPreview(dataUri);
      setResult(dataUri);
      setFormat("datauri");
      setCopied(false);
      // store raw separately
      reader._raw = base64;
    };
    reader.readAsDataURL(file);
  };

  const displayValue = format === "raw" ? result.split(",")[1] || result : result;

  const copy = () => {
    navigator.clipboard.writeText(displayValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const blob = new Blob([displayValue], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName.replace(/\.[^.]+$/, "") + "-base64.txt";
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>Free Image to Base64 Converter — Encode Images Online</title>
        <meta name="description" content="Convert any image to a Base64 string or data URI instantly. Free, private, runs in your browser. Copy the result for use in HTML, CSS, or JSON." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/image-to-base64" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#fef9c3" }}>🔢</div>
          <div><h1>Image to Base64 Converter</h1><p>Convert any image to a Base64 string or data URI for use in HTML and CSS</p></div>
        </div>
        <AdBanner />

        <div
          className="drop-zone"
          onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
          onDragOver={e => e.preventDefault()}
        >
          {!preview ? (<>
            <div className="drop-icon">🖼️</div>
            <p className="drop-title">Drag & drop an image here</p>
            <p className="drop-sub">JPG, PNG, WebP, SVG supported</p>
            <label className="upload-btn">Browse image<input type="file" accept="image/*" onChange={e => handleFile(e.target.files[0])} hidden /></label>
          </>) : (
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
              <img src={preview} alt="preview" style={{ maxHeight: 100, maxWidth: 180, borderRadius: 8, objectFit: "contain" }} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{fileName}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{mimeType} · {(fileSize / 1024).toFixed(1)} KB</div>
                <label className="upload-btn-small" style={{ marginTop: 8, display: "inline-block" }}>Change<input type="file" accept="image/*" onChange={e => handleFile(e.target.files[0])} hidden /></label>
              </div>
            </div>
          )}
        </div>

        {result && (
          <div className="simple-card">
            <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
              <button className={`char-btn ${format === "datauri" ? "active" : ""}`} onClick={() => setFormat("datauri")}>Data URI</button>
              <button className={`char-btn ${format === "raw" ? "active" : ""}`} onClick={() => setFormat("raw")}>Raw Base64</button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
              <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "monospace" }}>
                {displayValue.length.toLocaleString()} characters
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={copy}>{copied ? "✓ Copied" : "Copy"}</button>
                <button className="primary-btn" style={{ padding: "8px 16px", fontSize: 13 }} onClick={download}>⬇ Download .txt</button>
              </div>
            </div>
            <textarea
              className="simple-input"
              rows={8}
              readOnly
              value={displayValue}
              style={{ fontFamily: "monospace", fontSize: 11, wordBreak: "break-all", resize: "vertical" }}
            />
            {format === "datauri" && (
              <div className="info-banner" style={{ marginTop: 12, marginBottom: 0, fontSize: 12 }}>
                💡 Use this directly in HTML: <code style={{ fontFamily: "monospace" }}>{"<img src=\"[paste here]\" />"}</code>
              </div>
            )}
          </div>
        )}

        <div className="tool-info-box">
          <h2>What is a data URI?</h2>
          <p style={{ marginBottom: 10 }}>
            A data URI looks like <code style={{ fontFamily: "monospace", fontSize: 12, background: "var(--bg-card2)", padding: "1px 5px", borderRadius: 4 }}>data:image/png;base64,iVBOR...</code> and lets you
            embed an image directly in your HTML or CSS without linking to an external file. This means one
            fewer HTTP request, which can slightly speed up small pages.
          </p>
          <p>
            The trade-off is file size — Base64 increases the image data by about 33%, and large Base64
            strings can bloat your HTML significantly. Best used for small icons and inline images.
          </p>
        </div>

        <div className="tool-info-box">
          <h2>Common uses for Base64 images</h2>
          <ul>
            <li>Embedding small icons directly in a CSS stylesheet</li>
            <li>HTML email templates where external images may be blocked</li>
            <li>Sending images in JSON API payloads</li>
            <li>React or Vue components that need an image without a file import</li>
            <li>Offline web apps where you can't rely on a network request</li>
          </ul>
        </div>

        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}