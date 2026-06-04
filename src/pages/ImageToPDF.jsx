import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { jsPDF } from "jspdf";
import AdBanner from "../components/AdBanner";
import RippleButton from "../components/RippleButton";
import "./ToolPage.css";

export default function ImageToPDF() {
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [pdfMode, setPdfMode] = useState("fit");
  const [converting, setConverting] = useState(false);

  const processFiles = (files) => {
    const urls = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({ url: URL.createObjectURL(f), name: f.name }));
    setImages((prev) => [...prev, ...urls]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const removeImage = (i) => setImages(images.filter((_, idx) => idx !== i));

  const moveUp = (i) => {
    if (i === 0) return;
    const a = [...images];
    [a[i - 1], a[i]] = [a[i], a[i - 1]];
    setImages(a);
  };

  const moveDown = (i) => {
    if (i === images.length - 1) return;
    const a = [...images];
    [a[i], a[i + 1]] = [a[i + 1], a[i]];
    setImages(a);
  };

  const convertToPDF = async () => {
    if (!images.length) return;
    setConverting(true);
    const pdf = new jsPDF("p", "mm", "a4");
    for (let i = 0; i < images.length; i++) {
      const img = new Image();
      img.src = images[i].url;
      await new Promise((res) => {
        img.onload = () => {
          const W = 210, H = 297;
          let w, h, x = 0, y = 0;
          if (pdfMode === "fit") {
            const r = Math.min(W / img.width, H / img.height);
            w = img.width * r; h = img.height * r;
            x = (W - w) / 2; y = (H - h) / 2;
          } else { w = W; h = H; }
          if (i > 0) pdf.addPage();
          pdf.addImage(img, "JPEG", x, y, w, h);
          res();
        };
      });
    }
    pdf.save("converted.pdf");
    setConverting(false);
  };

  return (
    <>
      <Helmet>
        <title>Free Image to PDF Converter — Merge Multiple Images Online</title>
        <meta name="description" content="Convert JPG, PNG, and other images to PDF for free. Upload multiple images, reorder them, choose fit or fill layout, and download instantly. No signup needed." />
        <link rel="canonical" href="https://free-online-tools1.netlify.app/image-to-pdf" />
      </Helmet>

      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#dbeafe" }}>📄</div>
          <div>
            <h1>Image to PDF Converter</h1>
            <p>Convert JPG, PNG, WebP images into a PDF — free, instant, private</p>
          </div>
        </div>

        <AdBanner />

        <div
          className={`drop-zone ${dragging ? "dragging" : ""} ${images.length ? "has-files" : ""}`}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
        >
          {images.length === 0 ? (
            <>
              <div className="drop-icon">📁</div>
              <p className="drop-title">Drag & drop images here</p>
              <p className="drop-sub">JPG, PNG, WebP, GIF supported</p>
              <label className="upload-btn">
                Browse files
                <input type="file" multiple accept="image/*" onChange={(e) => processFiles(e.target.files)} hidden />
              </label>
            </>
          ) : (
            <label className="upload-btn-small">
              + Add more images
              <input type="file" multiple accept="image/*" onChange={(e) => processFiles(e.target.files)} hidden />
            </label>
          )}
        </div>

        {images.length > 0 && (
          <>
            <div className="image-list">
              {images.map((img, i) => (
                <div key={i} className="image-row">
                  <img src={img.url} alt={img.name} className="thumb" />
                  <span className="img-name">{img.name}</span>
                  <div className="img-actions">
                    <button onClick={() => moveUp(i)} disabled={i === 0} title="Move up">↑</button>
                    <button onClick={() => moveDown(i)} disabled={i === images.length - 1} title="Move down">↓</button>
                    <button onClick={() => removeImage(i)} className="remove-btn" title="Remove">✕</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="tool-options">
              <label className="option-label">
                PDF Layout
                <select value={pdfMode} onChange={(e) => setPdfMode(e.target.value)} className="option-select">
                  <option value="fit">Fit — preserve aspect ratio</option>
                  <option value="fill">Fill — stretch to full page</option>
                </select>
              </label>
            </div>

            <RippleButton className="primary-btn" onClick={convertToPDF} disabled={converting}>
              {converting ? "Converting…" : `Convert ${images.length} image${images.length > 1 ? "s" : ""} to PDF`}
            </RippleButton>
          </>
        )}

        <div className="tool-info-box">
          <h2>How it works</h2>
          <ol>
            <li>Upload one or more images (JPG, PNG, WebP)</li>
            <li>Drag to reorder them as needed</li>
            <li>Choose fit or fill layout</li>
            <li>Click Convert — PDF downloads instantly</li>
          </ol>
          <p>✅ Your files <strong>never leave your browser</strong>. Nothing is uploaded to any server.</p>
        </div>
      </main>
    </>
  );
}