import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import FAQ from "../components/FAQ";
import RelatedTools from "../components/RelatedTools";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./SimpleTools.css";
import "./Stopwatch.css";

const faqs = [
  { q: "Can I use this as a countdown timer?", a: "Yes! Switch to Timer mode, set your desired time, then press Start." },
  { q: "Does it work in the background?", a: "Yes, the timer continues running even if you switch browser tabs." },
  { q: "Can I record lap times?", a: "Yes! Press the Lap button while the stopwatch is running to record lap times." },
  { q: "Is my data saved?", a: "No data is saved. The timer resets when you close or refresh the tab." },
];

const related = [
  { path: "/calculator", icon: "🧮", color: "#dbeafe", title: "Calculator", desc: "Scientific calculator" },
  { path: "/percentage-calculator", icon: "%", color: "#fef9c3", title: "Percentage Calculator", desc: "Calculate percentages" },
  { path: "/age-calculator", icon: "🎂", color: "#fce7f3", title: "Age Calculator", desc: "Calculate your exact age" },
];

function fmt(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const c = Math.floor((ms % 1000) / 10);
  return `${h > 0 ? String(h).padStart(2, "0") + ":" : ""}${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(c).padStart(2, "0")}`;
}

export default function Stopwatch() {
  const [mode, setMode] = useState("stopwatch");
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState([]);
  const [timerInput, setTimerInput] = useState({ h: 0, m: 0, s: 30 });
  const [timerTotal, setTimerTotal] = useState(0);
  const [timerLeft, setTimerLeft] = useState(0);
  const startRef = useRef(null);
  const elapsedRef = useRef(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (running) {
      startRef.current = Date.now() - elapsedRef.current;
      const tick = () => {
        const now = Date.now() - startRef.current;
        elapsedRef.current = now;
        if (mode === "stopwatch") {
          setElapsed(now);
        } else {
          const left = Math.max(0, timerTotal - now);
          setTimerLeft(left);
          if (left === 0) { setRunning(false); return; }
        }
        frameRef.current = requestAnimationFrame(tick);
      };
      frameRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(frameRef.current);
    }
    return () => cancelAnimationFrame(frameRef.current);
  }, [running, mode, timerTotal]);

  const start = () => {
    if (mode === "timer") {
      const total = (timerInput.h * 3600 + timerInput.m * 60 + timerInput.s) * 1000;
      if (total === 0) return;
      setTimerTotal(total);
      setTimerLeft(total);
      elapsedRef.current = 0;
    }
    setRunning(true);
  };

  const pause = () => setRunning(false);

  const reset = () => {
    setRunning(false);
    setElapsed(0);
    setTimerLeft(0);
    setTimerTotal(0);
    setLaps([]);
    elapsedRef.current = 0;
  };

  const lap = () => {
    if (running && mode === "stopwatch") setLaps(l => [elapsed, ...l]);
  };

  const display = mode === "stopwatch" ? fmt(elapsed) : fmt(timerLeft);
  const pct = mode === "timer" && timerTotal > 0 ? ((timerTotal - timerLeft) / timerTotal) * 100 : 0;

  return (
    <>
      <Helmet>
        <title>Free Online Stopwatch & Timer — Start Stop Lap Timer</title>
        <meta name="description" content="Free online stopwatch and countdown timer. Record lap times, set countdown timers. Works in browser with no download needed." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/stopwatch" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#dcfce7" }}>⏱️</div>
          <div><h1>Stopwatch & Timer</h1><p>Precise stopwatch with lap times and countdown timer</p></div>
        </div>
        <AdBanner />

        <div className="sw-card">
          <div className="sw-mode-toggle">
            <button className={`unit-btn ${mode === "stopwatch" ? "active" : ""}`} onClick={() => { setMode("stopwatch"); reset(); }}>⏱ Stopwatch</button>
            <button className={`unit-btn ${mode === "timer" ? "active" : ""}`} onClick={() => { setMode("timer"); reset(); }}>⏳ Timer</button>
          </div>

          {mode === "timer" && !running && timerLeft === 0 && (
            <div className="sw-timer-inputs">
              {[["h", "Hours", 23], ["m", "Minutes", 59], ["s", "Seconds", 59]].map(([k, label, max]) => (
                <div key={k} className="sw-time-input">
                  <input type="number" min="0" max={max} value={timerInput[k]}
                    onChange={e => setTimerInput(t => ({ ...t, [k]: Math.min(max, Math.max(0, Number(e.target.value))) }))}
                    className="simple-input" style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 700, marginTop: 0 }} />
                  <span className="sw-time-label">{label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="sw-display">{display}</div>

          {mode === "timer" && timerTotal > 0 && (
            <div className="sw-progress-wrap">
              <div className="sw-progress-bar" style={{ width: `${pct}%` }} />
            </div>
          )}

          <div className="sw-controls">
            {!running ? (
              <button className="primary-btn" onClick={start} style={{ flex: 1 }}>▶ Start</button>
            ) : (
              <button className="primary-btn" onClick={pause} style={{ flex: 1, background: "linear-gradient(135deg,#f59e0b,#ef4444)" }}>⏸ Pause</button>
            )}
            {mode === "stopwatch" && (
              <button className="sw-lap-btn" onClick={lap} disabled={!running}>⊕ Lap</button>
            )}
            <button className="ghost-btn" onClick={reset}>↺ Reset</button>
          </div>

          {laps.length > 0 && (
            <div className="sw-laps">
              <div className="sw-laps-title">Lap times</div>
              {laps.map((lapTime, i) => (
                <div key={i} className="sw-lap-row">
                  <span className="sw-lap-num">Lap {laps.length - i}</span>
                  <span className="sw-lap-time">{fmt(lapTime)}</span>
                  {i < laps.length - 1 && <span className="sw-lap-diff">+{fmt(lapTime - laps[i + 1])}</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        <FAQ items={faqs} />
        <RelatedTools tools={related} />
      </main>
    </>
  );
}