import { useNavigate } from "react-router-dom";
import { useRipple } from "../hooks/useRipple";
import "./RelatedTools.css";

export default function RelatedTools({ tools }) {
  const navigate = useNavigate();
  const ripple = useRipple();

  return (
    <div className="related-wrap">
      <h2 className="related-title">Related tools</h2>
      <div className="related-grid">
        {tools.map(tool => (
          <button key={tool.path}
            className="related-card ripple-btn ripple-dark"
            onClick={e => { ripple(e); navigate(tool.path); }}>
            <span className="related-icon" style={{ background: tool.color }}>{tool.icon}</span>
            <div>
              <div className="related-name">{tool.title}</div>
              <div className="related-desc">{tool.desc}</div>
            </div>
            <span className="related-arrow">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}