import { useState } from "react";
import { Helmet } from "react-helmet-async";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./SimpleTools.css";

const faqs = [
  { q: "Is this PDF to text converter free?", a: "Yes, completely free with no file size limits and no signup required." },
  { q: "Are my PDF files safe?", a: "Yes. Everything runs in your browser using PDF.js. Your files are never uploaded to any server." },
  { q: "Why is the extracted text garbled or empty?", a: "Scanned PDFs are images, not text — they require OCR software to extract text. This tool works best on digital PDFs (like those exported from Word or Google Docs)." },
  { q: "Can I copy the extracted text?", a: "Yes — click the Copy button after extraction to copy all text to your clipboard." },
  { q: "What is the difference between a digital PDF and a scanned PDF?", a: "A digital PDF was created from software and contains real selectable text. A scanned PDF is just a photo of a page — it looks like text but is actually an image with no embedded text data." },
];

const related = [
  { path: "/image-to-pdf", icon: "📄", color: "#dbeafe", title: "Image to PDF", desc: "Convert images to PDF" },
  { path: "/word-counter", icon: "📝", color: "#fce7f3", title: "Word Counter", desc: "Count words and characters" },
  { path: "/markdown-to-html", icon: "📋", color: "#dbeafe", title: "Markdown to HTML", desc: "Convert Markdown to HTML" },
];

export default function PdfToText() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [copied, setCopied] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const handleFile = async (file) => {
    if (!file || file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }
    setLoading(true);
    setError("");
    setText("");
    setFileName(file.name);
    setPageCount(0);

    try {
      const pdfjsLib = await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js");
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPageCount(pdf.numPages);

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str).join(" ");
        fullText += `--- Page ${i} ---\n${pageText}\n\n`;
      }
      setText(fullText.trim() || "No text found. This may be a scanned PDF.");
    } catch (e) {
      setError("Could not read this PDF. It may be encrypted or corrupted.");
    }
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName.replace(".pdf", "") + ".txt";
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>Free PDF to Text Converter — Extract Text from PDF Online</title>
        <meta name="description" content="Extract text from any PDF file instantly in your browser. Free PDF to text converter — no upload, no signup, works offline." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/pdf-to-text" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#fee2e2" }}>📑</div>
          <div><h1>PDF to Text Converter</h1><p>Extract all text from a PDF file instantly — free and private</p></div>
        </div>
        <AdBanner />

        <div
          className="drop-zone"
          onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
          onDragOver={e => e.preventDefault()}
        >
          <div className="drop-icon">📂</div>
          <p className="drop-title">Drag & drop a PDF here</p>
          <p className="drop-sub">Only digital PDFs supported (not scanned images)</p>
          <label className="upload-btn">
            Browse PDF
            <input type="file" accept="application/pdf" onChange={e => handleFile(e.target.files[0])} hidden />
          </label>
        </div>

        {loading && <div className="info-banner">⏳ Extracting text from {pageCount > 0 ? `${pageCount} pages` : "PDF"}…</div>}
        {error && <div className="info-banner" style={{ borderColor: "#fca5a5", background: "rgba(239,68,68,0.07)", color: "#ef4444" }}>⚠️ {error}</div>}

        {text && (
          <div className="simple-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{pageCount} pages · {text.length.toLocaleString()} characters</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={copy}>{copied ? "✓ Copied" : "Copy"}</button>
                <button className="primary-btn" style={{ padding: "8px 16px", fontSize: 13 }} onClick={download}>⬇ Download .txt</button>
              </div>
            </div>
            <textarea
              className="simple-input"
              rows={16}
              readOnly
              value={text}
              style={{ fontFamily: "monospace", fontSize: 13, resize: "vertical" }}
            />
          </div>
        )}

        <div className="tool-info-box">
          <h2>How it works</h2>
          <ol>
            <li>Upload any digital PDF file</li>
            <li>Text is extracted page by page in your browser</li>
            <li>Copy to clipboard or download as a .txt file</li>
          </ol>
          <p>✅ Your PDF <strong>never leaves your device</strong> — all processing happens locally.</p>
        </div>

        <div className="tool-info-box">
          <h2>Digital PDF vs scanned PDF</h2>
          <p style={{ marginBottom: 10 }}>
            A <strong>digital PDF</strong> was created by software — like exporting a Word document or saving
            a webpage as PDF. These contain real, selectable text that this tool can extract perfectly.
          </p>
          <p>
            A <strong>scanned PDF</strong> is just a photograph of a printed page. It looks like text on screen
            but the file contains only image data — no text for tools to extract. To get text from scanned PDFs
            you need OCR (Optical Character Recognition) software like Adobe Acrobat or Google Drive's built-in
            OCR feature.
          </p>
        </div>

        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}