import { useState } from "react";
import { NavLink } from "react-router-dom";
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
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="nav-logo" onClick={closeMobile}>
          <LogoIcon />
          <span className="logo-text">Tool<span>Kit</span></span>
          <span className="logo-badge">FREE</span>
        </NavLink>
        <div className="nav-links">
          <NavLink to="/" end className={({isActive})=>isActive?"nav-link active":"nav-link"}>Home</NavLink>
          <div className="nav-dropdown" onMouseEnter={()=>setDropOpen(true)} onMouseLeave={()=>setDropOpen(false)}>
            <button className="nav-link dropdown-trigger">Tools ▾</button>
            {dropOpen && (
              <div className="dropdown-menu">
                {allTools.map(t=><NavLink key={t.path} to={t.path} className="dropdown-item" onClick={()=>setDropOpen(false)}>{t.label}</NavLink>)}
              </div>
            )}
          </div>
          <NavLink to="/about" className={({isActive})=>isActive?"nav-link active":"nav-link"}>About</NavLink>
          <NavLink to="/contact" className={({isActive})=>isActive?"nav-link active":"nav-link"}>Contact</NavLink>
          <NavLink to="/donate" className="nav-link donate-nav-btn">☕ Support</NavLink>
        </div>
        <button className={`hamburger ${mobileOpen?"open":""}`} onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>

      <div className={`mobile-menu ${mobileOpen?"open":""}`}>
        <div className="mobile-menu-section">
          <div className="mobile-menu-title">Navigation</div>
          <div className="mobile-menu-grid">
            <NavLink to="/" end className={({isActive})=>`mobile-menu-item ${isActive?"active":""}`} onClick={closeMobile}>🏠 Home</NavLink>
            <NavLink to="/about" className={({isActive})=>`mobile-menu-item ${isActive?"active":""}`} onClick={closeMobile}>👋 About</NavLink>
            <NavLink to="/contact" className={({isActive})=>`mobile-menu-item ${isActive?"active":""}`} onClick={closeMobile}>✉️ Contact</NavLink>
            <NavLink to="/donate" className="mobile-menu-item" onClick={closeMobile}>☕ Support</NavLink>
          </div>
        </div>
        <div className="mobile-menu-section">
          <div className="mobile-menu-title">All Tools</div>
          <div className="mobile-menu-grid">
            {allTools.map(t=><NavLink key={t.path} to={t.path} className={({isActive})=>`mobile-menu-item ${isActive?"active":""}`} onClick={closeMobile}>{t.label}</NavLink>)}
          </div>
        </div>
        <NavLink to="/donate" className="mobile-donate-btn" onClick={closeMobile}>☕ Support this project</NavLink>
      </div>
    </>
  );
}