import { NavLink } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="9" fill="#2563eb"/>
              <polygon points="21,5 11,19 17,19 9,31 23,15 16,15" fill="white"/>
            </svg>
            <span>ToolKit</span>
          </div>
          <p className="footer-tagline">Free browser-based tools. No signup, no uploads, 100% private.</p>
          <NavLink to="/donate" className="footer-donate-btn">☕ Support this project</NavLink>
        </div>
        <div className="footer-links-group">
          <div className="footer-col">
            <h4>Convert & Generate</h4>
            <NavLink to="/image-to-pdf">Image to PDF</NavLink>
            <NavLink to="/qr-code-generator">QR Code Generator</NavLink>
            <NavLink to="/image-compressor">Image Compressor</NavLink>
            <NavLink to="/lorem-ipsum-generator">Lorem Ipsum</NavLink>
            <NavLink to="/markdown-to-html">Markdown to HTML</NavLink>
            <NavLink to="/color-picker">Color Picker</NavLink>
          </div>
          <div className="footer-col">
            <h4>Calculators</h4>
            <NavLink to="/calculator">Calculator</NavLink>
            <NavLink to="/password-generator">Password Generator</NavLink>
            <NavLink to="/word-counter">Word Counter</NavLink>
            <NavLink to="/age-calculator">Age Calculator</NavLink>
            <NavLink to="/bmi-calculator">BMI Calculator</NavLink>
            <NavLink to="/unit-converter">Unit Converter</NavLink>
            <NavLink to="/percentage-calculator">Percentage Calculator</NavLink>
            <NavLink to="/text-case-converter">Text Case Converter</NavLink>
          </div>
          <div className="footer-col">
            <h4>Site</h4>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/donate">Support Us ☕</NavLink>
            <NavLink to="/privacy">Privacy Policy</NavLink>
            <a href="mailto:affanfahad7@gmail.com">Contact</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} ToolKit. All rights reserved.</span>
        <span>Built with ❤️ in Kerala, India</span>
      </div>
    </footer>
  );
}