import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import AdBanner from "../components/AdBanner";
import { useRipple } from "../hooks/useRipple";
import "./Home.css";

const tools = [
  { path: "/image-to-pdf", icon: "📄", color: "#dbeafe", cardClass: "card-blue", title: "Image to PDF", desc: "Merge multiple images into one PDF.", badge: "Popular", badgeClass: "badge-popular", category: "Convert" },
  { path: "/image-compressor", icon: "🗜️", color: "#dcfce7", cardClass: "card-green", title: "Image Compressor", desc: "Reduce JPG & PNG file size instantly.", category: "Convert" },
  { path: "/qr-code-generator", icon: "▦", color: "#fae8ff", cardClass: "card-purple", title: "QR Code Generator", desc: "Generate QR codes for any URL.", category: "Generate" },
  { path: "/password-generator", icon: "🔐", color: "#fef9c3", cardClass: "card-yellow", title: "Password Generator", desc: "Create strong random passwords.", category: "Generate" },
  { path: "/word-counter", icon: "📝", color: "#fce7f3", cardClass: "card-pink", title: "Word Counter", desc: "Count words, characters and reading time.", category: "Text" },
  { path: "/color-picker", icon: "🎨", color: "#fce7f3", cardClass: "card-pink", title: "Color Picker", desc: "Convert HEX, RGB, HSL and CMYK colors.", category: "Convert" },
  { path: "/lorem-ipsum-generator", icon: "📄", color: "#f3e8ff", cardClass: "card-purple", title: "Lorem Ipsum", desc: "Generate placeholder text for designs.", category: "Generate" },
  { path: "/age-calculator", icon: "🎂", color: "#fce7f3", cardClass: "card-pink", title: "Age Calculator", desc: "Calculate your exact age and birthday.", badge: "New", badgeClass: "badge-new", category: "Calculate" },
  { path: "/bmi-calculator", icon: "⚖️", color: "#dcfce7", cardClass: "card-green", title: "BMI Calculator", desc: "Check your Body Mass Index instantly.", badge: "New", badgeClass: "badge-new", category: "Calculate" },
  { path: "/unit-converter", icon: "📐", color: "#dbeafe", cardClass: "card-blue", title: "Unit Converter", desc: "Convert length, weight, temperature & more.", badge: "New", badgeClass: "badge-new", category: "Convert" },
  { path: "/percentage-calculator", icon: "%", color: "#fef9c3", cardClass: "card-yellow", title: "Percentage Calculator", desc: "Calculate percentages and changes.", badge: "New", badgeClass: "badge-new", category: "Calculate" },
];

const CATEGORIES = ["All", "Convert", "Calculate", "Generate", "Text"];

const features = [
  { icon: "🔒", color: "#dbeafe", title: "100% Private", desc: "Files never leave your device" },
  { icon: "⚡", color: "#fef9c3", title: "Instant results", desc: "No waiting, no queues ever" },
  { icon: "📱", color: "#dcfce7", title: "Works on mobile", desc: "Fully responsive on all devices" },
];

export default function Home() {
  const navigate = useNavigate();
  const ripple = useRipple();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return tools.filter(t => {
      const matchCat = category === "All" || t.category === category;
      const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.desc.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, category]);

  return (
    <>
      <Helmet>
        <title>Free Online Tools — PDF, QR Code, Password, BMI, Age Calculator & More</title>
        <meta name="description" content="Free browser-based tools: Image to PDF, QR code generator, password generator, BMI calculator, age calculator, unit converter and more. No signup, 100% free." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/" />
      </Helmet>

      <main className="home">
        <section className="hero">
          <div className="hero-badge"><div className="badge-dot"></div>100% Free · No signup needed</div>
          <h1>Free Online<br />Tools</h1>
          <p className="hero-sub">Fast, browser-based tools that work instantly. No files uploaded, no accounts required.</p>
          <div className="hero-stats">
            <div className="stat-item"><span className="stat-number">11+</span><span className="stat-label">Free tools</span></div>
            <div className="stat-item"><span className="stat-number">0</span><span className="stat-label">Uploads needed</span></div>
            <div className="stat-item"><span className="stat-number">100%</span><span className="stat-label">Private</span></div>
          </div>
        </section>

        <div className="ad-wrap"><AdBanner /></div>

        <section className="tools-section">
          {/* Search bar */}
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search tools..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button className="search-clear" onClick={() => setSearch("")}>✕</button>}
          </div>

          {/* Category filters */}
          <div className="category-filters">
            {CATEGORIES.map(cat => (
              <button key={cat}
                className={`cat-filter-btn ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="section-header">
            <span className="section-title">
              {search || category !== "All"
                ? `${filtered.length} tool${filtered.length !== 1 ? "s" : ""} found`
                : "All tools"}
            </span>
          </div>

          {/* Tools grid */}
          {filtered.length === 0 ? (
            <div className="no-results">
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🔍</div>
              <p>No tools found for "<strong>{search}</strong>"</p>
              <button className="cat-filter-btn active" style={{ marginTop: "0.75rem" }}
                onClick={() => { setSearch(""); setCategory("All"); }}>
                Clear search
              </button>
            </div>
          ) : (
            <div className="tools-grid">
              {filtered.map((tool, i) => (
                <button key={tool.path}
                  className={`tool-card ${tool.cardClass} ripple-btn ripple-dark`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                  onClick={(e) => { ripple(e); navigate(tool.path); }}>
                  <div className="tool-card-top">
                    <div className="tool-icon-wrap" style={{ background: tool.color }}>
                      <span>{tool.icon}</span>
                    </div>
                    {tool.badge && <span className={`tool-badge ${tool.badgeClass}`}>{tool.badge}</span>}
                  </div>
                  <h3 className="tool-title">{tool.title}</h3>
                  <p className="tool-desc">{tool.desc}</p>
                  <span className="tool-cta">Open tool →</span>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="features">
          {features.map((f, i) => (
            <div key={i} className="feature-card" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
              <div className="f-icon-wrap" style={{ background: f.color }}>{f.icon}</div>
              <div><strong>{f.title}</strong><p>{f.desc}</p></div>
            </div>
          ))}
        </section>

        <div className="ad-wrap"><AdBanner /></div>
      </main>
    </>
  );
}