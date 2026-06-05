import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import AdBanner from "../components/AdBanner";
import RippleButton from "../components/RippleButton";
import "./ToolPage.css";
import "./ImageCompressor.css";

export default function ImageCompressor() {
  const [original, setOriginal] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [quality, setQuality] = useState(80);
  const [dragging, setDragging] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const canvasRef = useRef(null);

  const processFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setOriginal({ url, name: file.name, size: file.size, type: file.type });
    setCompressed(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  const compress = () => {
    if (!original) return;
    setCompressing(true);

    const img = new Image();
    img.src = original.url;
    img.onload = () => {
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const mimeType = original.type === "image/png" ? "image/png" : "image/jpeg";
      const q = quality / 100;

      canvas.toBlob((blob) => {
        const compressedUrl = URL.createObjectURL(blob);
        setCompressed({
          url: compressedUrl,
          size: blob.size,
          name: original.name.replace(/\.[^.]+$/, "") + "-compressed." + (mimeType === "image/png" ? "png" : "jpg"),
        });
        setCompressing(false);
      }, mimeType, q);
    };
  };

  const download = () => {
    if (!compressed) return;
    const a = document.createElement("a");
    a.href = compressed.url;
    a.download = compressed.name;
    a.click();
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const savings = original && compressed
    ? Math.round((1 - compressed.size / original.size) * 100)
    : 0;

  return (
    <>
      <Helmet>
        <title>Free Image Compressor — Compress JPG & PNG Online</title>
        <meta name="description" content="Compress JPG and PNG images online for free. Reduce image file size without losing quality. No upload, works in your browser instantly." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/image-compressor" />
      </Helmet>

      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#dcfce7" }}>🗜️</div>
          <div>
            <h1>Image Compressor</h1>
            <p>Reduce image file size instantly — free, private, no upload needed</p>
          </div>
        </div>

        <AdBanner />

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {!original ? (
          <div
            className={`drop-zone ${dragging ? "dragging" : ""}`}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
          >
            <div className="drop-icon">🖼️</div>
            <p className="drop-title">Drag & drop an image here</p>
            <p className="drop-sub">JPG or PNG supported</p>
            <label className="upload-btn">
              Browse image
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => processFile(e.target.files[0])} hidden />
            </label>
          </div>
        ) : (
          <>
            <div className="compressor-grid">
              <div className="comp-preview-box">
                <div className="comp-preview-label">Original</div>
                <img src={original.url} alt="original" className="comp-img" />
                <div className="comp-size">{formatSize(original.size)}</div>
              </div>

              <div className="comp-arrow">→</div>

              <div className="comp-preview-box">
                <div className="comp-preview-label">Compressed</div>
                {compressed ? (
                  <>
                    <img src={compressed.url} alt="compressed" className="comp-img" />
                    <div className="comp-size compressed">{formatSize(compressed.size)}</div>
                  </>
                ) : (
                  <div className="comp-placeholder">
                    <p>Preview here</p>
                  </div>
                )}
              </div>
            </div>

            {compressed && savings > 0 && (
              <div className="savings-badge">
                🎉 Reduced by <strong>{savings}%</strong> — saved {formatSize(original.size - compressed.size)}
              </div>
            )}

            <div className="tool-options" style={{ marginTop: "1.25rem" }}>
              <label className="option-label">
                Quality: <strong>{quality}%</strong>
                <input
                  type="range" min="10" max="100" step="5"
                  value={quality}
                  onChange={(e) => { setQuality(Number(e.target.value)); setCompressed(null); }}
                  className="range-input"
                />
                <div className="quality-hints">
                  <span>Smaller file</span>
                  <span>Better quality</span>
                </div>
              </label>
            </div>

            <div className="comp-actions">
              <RippleButton className="primary-btn" onClick={compress} disabled={compressing}>
                {compressing ? "Compressing…" : "Compress Image"}
              </RippleButton>
              {compressed && (
                <RippleButton className="secondary-btn" onClick={download}>
                  ⬇ Download
                </RippleButton>
              )}
              <button className="ghost-btn" onClick={() => { setOriginal(null); setCompressed(null); }}>
                ✕ Remove
              </button>
            </div>
          </>
        )}

        <div className="tool-info-box" style={{ marginTop: "2rem" }}>
          <h2>How it works</h2>
          <ol>
            <li>Upload a JPG or PNG image</li>
            <li>Adjust the quality slider (80% is a good balance)</li>
            <li>Click Compress — see the size reduction instantly</li>
            <li>Download your compressed image</li>
          </ol>
          <p>✅ Your image <strong>never leaves your browser</strong>. 100% private.</p>
        </div>
      </main>
    </>
  );
}