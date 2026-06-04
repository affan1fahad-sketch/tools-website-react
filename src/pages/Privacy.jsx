import { Helmet } from "react-helmet-async";
import "./ToolPage.css";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — Free Online Tools</title>
        <meta name="description" content="Privacy policy for Free Online Tools. We don't store your files or data — everything runs in your browser." />
      </Helmet>
      <main className="tool-page">
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a", marginBottom: "1.5rem" }}>Privacy Policy</h1>
        <div className="tool-info-box">
          <h2>Your data stays on your device</h2>
          <ul>
            <li>Files you upload are processed entirely in your browser using JavaScript.</li>
            <li>No files, images, or passwords are ever sent to our servers.</li>
            <li>We use Google AdSense to show ads. Google may use cookies for personalization.</li>
            <li>We use Google Analytics to understand traffic. No personal data is collected.</li>
          </ul>
        </div>
        <p style={{ marginTop: "1.5rem", fontSize: 13, color: "#94a3b8" }}>Last updated: June 2026 · Contact: affanfahad7@gmail.com</p>
      </main>
    </>
  );
}