import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import AdBanner from "../components/AdBanner";
import { useRipple } from "../hooks/useRipple";
import "./Home.css";

const tools = [
  { path: "/image-to-pdf", icon: "📄", color: "#dbeafe", cardClass: "card-blue", title: "Image to PDF", desc: "Merge multiple images into one PDF.", badge: "Popular", badgeClass: "badge-popular" },
  { path: "/image-compressor", icon: "🗜️", color: "#dcfce7", cardClass: "card-green", title: "Image Compressor", desc: "Reduce JPG & PNG file size instantly." },
  { path: "/password-generator", icon: "🔐", color: "#fef9c3", cardClass: "card-yellow", title: "Password Generator", desc: "Create strong random passwords." },
  { path: "/qr-code-generator", icon: "▦", color: "#fae8ff", cardClass: "card-purple", title: "QR Code Generator", desc: "Generate QR codes for any URL." },
  { path: "/word-counter", icon: "📝", color: "#fce7f3", cardClass: "card-pink", title: "Word Counter", desc: "Count words, characters and reading time." },
  { path: "/color-picker", icon: "🎨", color: "#fce7f3", cardClass: "card-pink", title: "Color Picker", desc: "Convert HEX, RGB, HSL and CMYK colors." },
  { path: "/age-calculator", icon: "🎂", color: "#fce7f3", cardClass: "card-pink", title: "Age Calculator", desc: "Calculate your exact age and birthday.", badge: "New", badgeClass: "badge-new" },
  { path: "/bmi-calculator", icon: "⚖️", color: "#dcfce7", cardClass: "card-green", title: "BMI Calculator", desc: "Check your Body Mass Index instantly.", badge: "New", badgeClass: "badge-new" },
  { path: "/unit-converter", icon: "📐", color: "#dbeafe", cardClass: "card-blue", title: "Unit Converter", desc: "Convert length, weight, temperature & more.", badge: "New", badgeClass: "badge-new" },
  { path: "/percentage-calculator", icon: "%", color: "#fef9c3", cardClass: "card-yellow", title: "Percentage Calculator", desc: "Calculate percentages and changes.", badge: "New", badgeClass: "badge-new" },
  { path: "/lorem-ipsum-generator", icon: "📄", color: "#f3e8ff", cardClass: "card-purple", title: "Lorem Ipsum", desc: "Generate placeholder text for designs.", badge: "New", badgeClass: "badge-new" },
];

const features = [
  { icon: "🔒", color: "#dbeafe", title: "100% Private", desc: "Files never leave your device" },
  { icon: "⚡", color: "#fef9c3", title: "Instant results", desc: "No waiting, no queues ever" },
  { icon: "📱", color: "#dcfce7", title: "Works on mobile", desc: "Fully responsive on all devices" },
];

export default function Home() {
  const navigate = useNavigate();
  const ripple = useRipple();

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
          <div className="section-header"><span className="section-title">All tools</span></div>
          <div className="tools-grid">
            {tools.map((tool, i) => (
              <button key={tool.path} className={`tool-card ${tool.cardClass} ripple-btn ripple-dark`}
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