import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import "./ToolPage.css";
import "./About.css";

export default function About() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>About ToolKit — Free Online Tools Built in Kerala, India</title>
        <meta name="description" content="ToolKit is a free collection of browser-based tools built by Affan Fahad, a Computer Engineering student from Kerala, India. No signup, no uploads, 100% private." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/about" />
      </Helmet>
      <main className="tool-page">
        <div className="about-hero">
          <div className="about-avatar">⚡</div>
          <h1>About ToolKit</h1>
          <p>Free browser-based tools built with ❤️ in Kerala, India</p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <div className="about-card-icon">🎯</div>
            <h2>Our mission</h2>
            <p>To provide fast, free, and private tools that work entirely in your browser. No signup required, no files uploaded to any server, ever.</p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">👨‍💻</div>
            <h2>Who built this</h2>
            <p>Hi! I'm Affan Fahad, a Computer Engineering student at Model Polytechnic College Vadakara, Kerala. I built ToolKit as a learning project using React + Vite.</p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">🔒</div>
            <h2>Privacy first</h2>
            <p>Every tool runs 100% in your browser using JavaScript. No data is ever sent to our servers. Your files and information stay on your device.</p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">🚀</div>
            <h2>Tech stack</h2>
            <p>Built with React.js, Vite, React Router, and deployed on Vercel. Uses jsPDF for PDF generation and qrcode.react for QR codes.</p>
          </div>
        </div>

        <div className="about-tools-count">
          <div className="count-item"><span className="count-num">11+</span><span className="count-lab">Free tools</span></div>
          <div className="count-item"><span className="count-num">0</span><span className="count-lab">Uploads needed</span></div>
          <div className="count-item"><span className="count-num">100%</span><span className="count-lab">Free forever</span></div>
          <div className="count-item"><span className="count-num">0</span><span className="count-lab">Ads (coming soon)</span></div>
        </div>

        <div className="about-cta">
          <h2>Want to support this project?</h2>
          <p>ToolKit is completely free. If it saved you time, consider buying me a chai! ☕</p>
          <button className="primary-btn ripple-btn" style={{maxWidth:240}} onClick={() => navigate("/donate")}>
            ☕ Support ToolKit
          </button>
        </div>
      </main>
    </>
  );
}