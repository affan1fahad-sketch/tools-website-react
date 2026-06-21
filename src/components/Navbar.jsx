import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

const allTools = [
  { path: "/image-to-pdf", label: "📄 Image to PDF" },
  { path: "/image-compressor", label: "🗜️ Image Compressor" },
  { path: "/qr-code-generator", label: "▦ QR Code Generator" },
  { path: "/password-generator", label: "🔐 Password Generator" },
  { path: "/word-counter", label: "📝 Word Counter" },
  { path: "/color-picker", label: "🎨 Color Picker" },
  { path: "/age-calculator", label: "🎂 Age Calculator" },
  { path: "/bmi-calculator", label: "⚖️ BMI Calculator" },
  { path: "/unit-converter", label: "📐 Unit Converter" },
  { path: "/percentage-calculator", label: "% Percentage Calc" },
  { path: "/lorem-ipsum-generator", label: "📄 Lorem Ipsum" },
  { path: "/markdown-to-html", label: "📋 Markdown to HTML" },
  { path: "/calculator", label: "🧮 Calculator" },
  { path: "/text-case-converter", label: "🔤 Text Case Converter" },
  { path: "/stopwatch", label: "⏱️ Stopwatch & Timer" },
  { path: "/tip-calculator", label: "💰 Tip Calculator" },
];

function LogoIcon() {
  return (
    <div className="logo-icon-box">
      <svg width="18" height="18" viewBox="0 0 36 36" fill="none">
        <polygon points="21,5 11,19 17,19 9,31 23,15 16,15" fill="white"/>
      </svg>
    </div>
  );
}

export default function Navbar() {
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { dark, toggle } = useTheme();

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="nav-logo" onClick={closeMobile}>
          <LogoIcon />
          <span className="logo-text">Tool<span>Kit</span></span>
          <span className="logo-badge">FREE</span>
        </NavLink>

        {/* Desktop links */}
        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          <div className="nav-dropdown"
            onMouseEnter={() => setDropOpen(true)}
            onMouseLeave={() => setDropOpen(false)}>
            <button className="nav-link dropdown-trigger">Tools ▾</button>
            {dropOpen && (
              <div className="dropdown-menu">
                {allTools.map(t => (
                  <NavLink key={t.path} to={t.path} className="dropdown-item" onClick={() => setDropOpen(false)}>
                    {t.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
          <button className="theme-toggle-btn" onClick={toggle} title={dark ? "Switch to light mode" : "Switch to dark mode"} aria-label="Toggle dark mode">
            {dark ? "☀️" : "🌙"}
          </button>
          <NavLink to="/donate" className="nav-link donate-nav-btn">☕ Support</NavLink>
        </div>

        {/* Mobile right side: toggle + hamburger */}
        <div className="nav-right-mobile">
          <button className="theme-toggle-btn" onClick={toggle} aria-label="Toggle dark mode">
            {dark ? "☀️" : "🌙"}
          </button>
          <button className={`hamburger ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <div className="mobile-menu-section">
          <div className="mobile-menu-title">Navigation</div>
          <div className="mobile-menu-grid">
            <NavLink to="/" end className={({ isActive }) => `mobile-menu-item ${isActive ? "active" : ""}`} onClick={closeMobile}>🏠 Home</NavLink>
            <NavLink to="/donate" className="mobile-menu-item" onClick={closeMobile}>☕ Support</NavLink>
          </div>
        </div>
        <div className="mobile-menu-section">
          <div className="mobile-menu-title">All Tools</div>
          <div className="mobile-menu-grid">
            {allTools.map(t => (
              <NavLink key={t.path} to={t.path}
                className={({ isActive }) => `mobile-menu-item ${isActive ? "active" : ""}`}
                onClick={closeMobile}>
                {t.label}
              </NavLink>
            ))}
          </div>
        </div>
        <NavLink to="/donate" className="mobile-donate-btn" onClick={closeMobile}>
          ☕ Support this project
        </NavLink>
      </div>
    </>
  );
}