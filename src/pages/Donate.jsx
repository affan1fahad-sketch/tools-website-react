import { Helmet } from "react-helmet-async";
import { useRipple } from "../hooks/useRipple";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./Donate.css";

const RAZORPAY_LINK = "https://rzp.io/rzp/X5CeCTb";

const amounts = [
  { label: "☕ ₹29", desc: "Buy me a chai", amount: "29" },
  { label: "🍕 ₹99", desc: "Buy me a snack", amount: "99" },
  { label: "💛 ₹199", desc: "Super supporter", amount: "199" },
  { label: "🚀 ₹499", desc: "You're amazing!", amount: "499" },
];

export default function Donate() {
  const ripple = useRipple();

  const handleDonate = (e) => {
    ripple(e);
    window.open(RAZORPAY_LINK, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Support ToolKit — Buy Me a Chai ☕</title>
        <meta name="description" content="Support ToolKit and help keep all tools free forever. Donate via Razorpay — any amount helps!" />
      </Helmet>

      <main className="tool-page">
        <div className="donate-hero">
          <div className="donate-emoji">☕</div>
          <h1>Support ToolKit</h1>
          <p>All tools are 100% free and always will be. If they saved you time, consider buying me a chai!</p>
        </div>

        <AdBanner />

        <div className="donate-card">
          <div className="donate-amounts">
            {amounts.map((a) => (
              <button
                key={a.amount}
                className="amount-btn ripple-btn"
                onClick={handleDonate}
              >
                <span className="amount-label">{a.label}</span>
                <span className="amount-desc">{a.desc}</span>
              </button>
            ))}
          </div>

          <div className="donate-divider">
            <span>or donate any amount</span>
          </div>

          <button
            className="donate-main-btn ripple-btn"
            onClick={handleDonate}
          >
            💳 Donate via Razorpay
          </button>

          <div className="donate-methods">
            <span>🏦 UPI</span>
            <span>💳 Cards</span>
            <span>🏧 Net Banking</span>
            <span>📱 Wallets</span>
          </div>
        </div>

        <div className="donate-why">
          <h2>Why support?</h2>
          <div className="donate-reasons">
            <div className="reason-item">
              <span>⚡</span>
              <div>
                <strong>Keep tools free</strong>
                <p>Your support keeps all tools free with no paywalls</p>
              </div>
            </div>
            <div className="reason-item">
              <span>🛠️</span>
              <div>
                <strong>Build more tools</strong>
                <p>Donations help me add new tools every week</p>
              </div>
            </div>
            <div className="reason-item">
              <span>🚀</span>
              <div>
                <strong>Better performance</strong>
                <p>Helps cover hosting and development costs</p>
              </div>
            </div>
          </div>
        </div>

        <div className="donate-note">
          🔒 Payments are securely processed by <strong>Razorpay</strong>. We never store your payment details.
        </div>
      </main>
    </>
  );
}