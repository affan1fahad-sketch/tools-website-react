import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { jsPDF } from "jspdf";
import AdBanner from "../components/AdBanner";
import RippleButton from "../components/RippleButton";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import "./ToolPage.css";

const faqs = [
  { q: "Is this image to PDF converter free?", a: "Yes, completely free with no file size limits and no watermarks on your PDF." },
  { q: "Are my images safe?", a: "Yes. Everything runs in your browser using JavaScript. Your images are never uploaded to any server." },
  { q: "What image formats are supported?", a: "JPG, PNG, WebP, GIF and most other common image formats are supported." },
  { q: "How many images can I convert at once?", a: "There is no limit. You can add as many images as you need to a single PDF." },
  { q: "What is the difference between Fit and Fill mode?", a: "Fit mode preserves your image's aspect ratio and centers it on the page. Fill mode stretches the image to cover the full A4 page." },
  { q: "Can I reorder images before converting?", a: "Yes! Use the up and down arrows next to each image to reorder them before converting." },
];

const related = [
  { path: "/image-compressor", icon: "🗜️", color: "#dcfce7", title: "Image Compressor", desc: "Reduce image file size" },
  { path: "/qr-code-generator", icon: "▦", color: "#fae8ff", title: "QR Code Generator", desc: "Generate QR codes instantly" },
  { path: "/word-counter", icon: "📝", color: "#fce7f3", title: "Word Counter", desc: "Count words and characters" },
];

export default function ImageToPDF() {
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [pdfMode, setPdfMode] = useState("fit");
  const [converting, setConverting] = useState(false);

  const processFiles = (files) => {
    const urls = Array.from(files).filter(f => f.type.startsWith("image/")).map(f => ({ url: URL.createObjectURL(f), name: f.name }));
    setImages(prev => [...prev, ...urls]);
  };
  const handleDrop = (e) => { e.preventDefault(); setDragging(false); processFiles(e.dataTransfer.files); };
  const removeImage = i => setImages(images.filter((_, idx) => idx !== i));
  const moveUp = i => { if (i === 0) return; const a = [...images]; [a[i-1], a[i]] = [a[i], a[i-1]]; setImages(a); };
  const moveDown = i => { if (i === images.length - 1) return; const a = [...images]; [a[i], a[i+1]] = [a[i+1], a[i]]; setImages(a); };

  const convertToPDF = async () => {
    if (!images.length) return;
    setConverting(true);
    const pdf = new jsPDF("p", "mm", "a4");
    for (let i = 0; i < images.length; i++) {
      const img = new Image(); img.src = images[i].url;
      await new Promise(res => { img.onload = () => { const W=210,H=297; let w,h,x=0,y=0; if(pdfMode==="fit"){const r=Math.min(W/img.width,H/img.height);w=img.width*r;h=img.height*r;x=(W-w)/2;y=(H-h)/2;}else{w=W;h=H;} if(i>0)pdf.addPage(); pdf.addImage(img,"JPEG",x,y,w,h); res(); }; });
    }
    pdf.save("converted.pdf"); setConverting(false);
  };

  return (
    <>
      <Helmet>
        <title>Free Image to PDF Converter — Merge Multiple Images Online</title>
        <meta name="description" content="Convert JPG, PNG, and other images to PDF for free. Upload multiple images, reorder them, choose fit or fill layout, and download instantly. No signup needed." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/image-to-pdf" />
        <script type="application/ld+json">{JSON.stringify({ "@context":"https://schema.org","@type":"WebApplication","name":"Image to PDF Converter","url":"https://free-online-tools1.vercel.app/image-to-pdf","description":"Convert JPG, PNG images to PDF free online","applicationCategory":"UtilitiesApplication","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"} })}</script>
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#dbeafe" }}>📄</div>
          <div><h1>Image to PDF Converter</h1><p>Convert JPG, PNG, WebP images into a PDF — free, instant, private</p></div>
        </div>
        <AdBanner />
        <div className={`drop-zone ${dragging?"dragging":""} ${images.length?"has-files":""}`}
          onDrop={handleDrop} onDragOver={e=>{e.preventDefault();setDragging(true);}} onDragLeave={()=>setDragging(false)}>
          {images.length===0 ? (<>
            <div className="drop-icon">📁</div>
            <p className="drop-title">Drag & drop images here</p>
            <p className="drop-sub">JPG, PNG, WebP supported</p>
            <label className="upload-btn">Browse files<input type="file" multiple accept="image/*" onChange={e=>processFiles(e.target.files)} hidden /></label>
          </>) : (
            <label className="upload-btn-small">+ Add more<input type="file" multiple accept="image/*" onChange={e=>processFiles(e.target.files)} hidden /></label>
          )}
        </div>
        {images.length > 0 && (<>
          <div className="image-list">
            {images.map((img, i) => (
              <div key={i} className="image-row">
                <img src={img.url} alt={img.name} className="thumb" />
                <span className="img-name">{img.name}</span>
                <div className="img-actions">
                  <button onClick={()=>moveUp(i)} disabled={i===0}>↑</button>
                  <button onClick={()=>moveDown(i)} disabled={i===images.length-1}>↓</button>
                  <button onClick={()=>removeImage(i)} className="remove-btn">✕</button>
                </div>
              </div>
            ))}
          </div>
          <div className="tool-options">
            <label className="option-label">PDF Layout
              <select value={pdfMode} onChange={e=>setPdfMode(e.target.value)} className="option-select">
                <option value="fit">Fit — preserve aspect ratio</option>
                <option value="fill">Fill — stretch to full page</option>
              </select>
            </label>
          </div>
          <RippleButton className="primary-btn" onClick={convertToPDF} disabled={converting}>
            {converting ? "Converting…" : `Convert ${images.length} image${images.length>1?"s":""} to PDF`}
          </RippleButton>
        </>)}
        <div className="tool-info-box">
          <h2>How it works</h2>
          <ol><li>Upload one or more images</li><li>Reorder them as needed</li><li>Choose fit or fill layout</li><li>Click Convert — PDF downloads instantly</li></ol>
          <p>✅ Your files <strong>never leave your browser</strong>.</p>
        </div>
        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}