import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { QRCodeCanvas } from "qrcode.react";
import AdBanner from "../components/AdBanner";
import RippleButton from "../components/RippleButton";
import "./ToolPage.css";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [size, setSize] = useState(256);
  const canvasRef = useRef(null);

  const downloadQR = () => {
    const canvas = document.querySelector("#qr-canvas canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>Free QR Code Generator — Create QR Codes Online Instantly</title>
        <meta name="description" content="Generate QR codes for any URL, text, email, or phone number for free. Download as PNG instantly. No signup, no watermark." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/qr-code-generator" />
      </Helmet>

      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#dcfce7" }}>▦</div>
          <div>
            <h1>QR Code Generator</h1>
            <p>Generate a QR code for any URL, text, or contact info — free & instant</p>
          </div>
        </div>

        <AdBanner />

        <div className="qr-layout">
          <div className="qr-inputs">
            <label className="field-label">
              Text or URL
              <textarea
                className="qr-textarea"
                placeholder="https://your-website.com"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
              />
            </label>

            <div className="qr-options-row">
              <label className="field-label" style={{ flex: 1 }}>
                QR Color
                <div className="color-row">
                  <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="color-input" />
                  <span className="color-val">{fgColor}</span>
                </div>
              </label>

              <label className="field-label" style={{ flex: 1 }}>
                Size: {size}px
                <input type="range" min="128" max="512" step="32" value={size}
                  onChange={(e) => setSize(Number(e.target.value))} className="range-input" />
              </label>
            </div>

            {text && (
              <RippleButton className="primary-btn" onClick={downloadQR}>
                ⬇ Download QR Code (PNG)
              </RippleButton>
            )}
          </div>

          <div className="qr-preview" id="qr-canvas">
            {text ? (
              <QRCodeCanvas value={text} size={Math.min(size, 280)} fgColor={fgColor} includeMargin={true} />
            ) : (
              <div className="qr-placeholder">
                <p>QR preview</p>
                <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>Type something above</p>
              </div>
            )}
          </div>
        </div>

        <div className="tool-info-box">
          <h2>What can I encode in a QR code?</h2>
          <ul>
            <li>Website URLs (https://...)</li>
            <li>Plain text or messages</li>
            <li>Email addresses</li>
            <li>Phone numbers</li>
            <li>WiFi credentials</li>
          </ul>
        </div>
      </main>
    </>
  );
}