import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import "./ToolPage.css";
import "./NotFound.css";

const POPULAR_TOOLS = [
  { path: "/image-to-pdf", icon: "📄", label: "Image to PDF" },
  { path: "/qr-code-generator", icon: "▦", label: "QR Code Generator" },
  { path: "/password-generator", icon: "🔐", label: "Password Generator" },
  { path: "/calculator", icon: "🧮", label: "Calculator" },
  { path: "/gpa-calculator", icon: "🎓", label: "GPA Calculator" },
  { path: "/currency-converter", icon: "💱", label: "Currency Converter" },
];

export default function NotFound() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(search)}`);
  };

  return (
    <>
      <Helmet>
        <title>Page Not Found — ToolKit</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <main className="tool-page nf-page">
        <div className="nf-content">
          <div className="nf-code">404</div>
          <h1 className="nf-title">This page wandered off</h1>
          <p className="nf-sub">The page you're looking for doesn't exist, or may have moved. Try searching for a tool, or jump back to the homepage.</p>
          <form className="nf-search" onSubmit={handleSearch}>
            <span className="search-icon">🔍</span>
            <input type="text" className="search-input" placeholder="Search for a tool..." value={search} onChange={e => setSearch(e.target.value)} />
          </form>
          <button className="primary-btn" style={{ maxWidth: 220, margin: "0 auto 2rem" }} onClick={() => navigate("/")}>← Back to home</button>
          <div className="nf-popular-title">Popular tools</div>
          <div className="nf-grid">
            {POPULAR_TOOLS.map(t => (
              <button key={t.path} className="nf-tool-chip" onClick={() => navigate(t.path)}>
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}