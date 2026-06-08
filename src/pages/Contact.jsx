import { useState } from "react";
import { Helmet } from "react-helmet-async";
import RippleButton from "../components/RippleButton";
import "./ToolPage.css";
import "./About.css";
import "./SimpleTools.css";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    window.location.href = `mailto:affan1fahad@gmail.com?subject=ToolKit Feedback from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.name} (${form.email})`;
    setSent(true);
  };

  return (
    <>
      <Helmet>
        <title>Contact ToolKit — Send Feedback or Suggestions</title>
        <meta name="description" content="Contact ToolKit to send feedback, report bugs, or suggest new tools. We'd love to hear from you!" />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/contact" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#dbeafe" }}>✉️</div>
          <div>
            <h1>Contact Us</h1>
            <p>Send feedback, report bugs, or suggest new tools</p>
          </div>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            {[
              { icon: "📧", title: "Email", val: "affan1fahad@gmail.com" },
              { icon: "📍", title: "Location", val: "kozhikode, Kerala, India" },
              { icon: "⚡", title: "Response time", val: "Usually within 24 hours" },
            ].map(item => (
              <div key={item.title} className="contact-info-item">
                <span className="ci-icon">{item.icon}</span>
                <div>
                  <div className="ci-title">{item.title}</div>
                  <div className="ci-val">{item.val}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="simple-card" style={{ marginBottom: 0 }}>
            {sent ? (
              <div className="info-banner" style={{ margin: 0 }}>
                ✅ Thanks! Your message has been sent.
              </div>
            ) : (
              <>
                <label className="field-label">
                  Your name
                  <input className="simple-input" type="text" placeholder="eg:Akhil"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </label>
                <label className="field-label">
                  Email address
                  <input className="simple-input" type="email" placeholder="you@example.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </label>
                <label className="field-label">
                  Message
                  <textarea className="simple-input" rows={5} placeholder="Your feedback, bug report, or tool suggestion..."
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ resize: "vertical" }} />
                </label>
                <RippleButton className="primary-btn" onClick={handleSubmit}
                  disabled={!form.name || !form.email || !form.message}>
                  Send message →
                </RippleButton>
              </>
            )}
          </div>
        </div>

        <div className="tool-info-box" style={{ marginTop: "1.5rem" }}>
          <h2>What can I contact you about?</h2>
          <ul>
            <li>🐛 Report a bug or broken tool</li>
            <li>💡 Suggest a new tool to add</li>
            <li>🎨 UI/UX improvement ideas</li>
            <li>🤝 Collaboration or partnership</li>
          </ul>
        </div>
      </main>
    </>
  );
}