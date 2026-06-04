import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import AdBanner from "../components/AdBanner";
import RippleButton from "../components/RippleButton";
import "./ToolPage.css";
import "./WordCounter.css";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter(p => p.trim().length > 0).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    const speakingTime = Math.max(1, Math.ceil(words / 130));

    // Top words frequency
    const wordList = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const freq = {};
    wordList.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    const topWords = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return { words, chars, charsNoSpace, sentences, paragraphs, readingTime, speakingTime, topWords };
  }, [text]);

  const clear = () => setText("");

  const copyText = () => {
    if (text) navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Helmet>
        <title>Free Word Counter — Count Words, Characters & Reading Time Online</title>
        <meta name="description" content="Count words, characters, sentences and paragraphs instantly. Get reading time and speaking time estimates. Free online word counter tool — no signup needed." />
        <link rel="canonical" href="https://free-online-tools1.netlify.app/word-counter" />
      </Helmet>

      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#fce7f3" }}>📝</div>
          <div>
            <h1>Word Counter</h1>
            <p>Count words, characters, sentences and reading time instantly</p>
          </div>
        </div>

        <AdBanner />

        <div className="wc-layout">
          <div className="wc-editor">
            <div className="wc-toolbar">
              <span className="wc-label">Type or paste your text</span>
              <div className="wc-toolbar-actions">
                <button className="ghost-btn-sm" onClick={copyText} disabled={!text}>Copy</button>
                <button className="ghost-btn-sm danger" onClick={clear} disabled={!text}>Clear</button>
              </div>
            </div>
            <textarea
              className="wc-textarea"
              placeholder="Start typing or paste your text here…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
            />
          </div>

          <div className="wc-stats">
            <div className="wc-stats-grid">
              <div className="stat-card blue">
                <div className="stat-val">{stats.words.toLocaleString()}</div>
                <div className="stat-lab">Words</div>
              </div>
              <div className="stat-card pink">
                <div className="stat-val">{stats.chars.toLocaleString()}</div>
                <div className="stat-lab">Characters</div>
              </div>
              <div className="stat-card green">
                <div className="stat-val">{stats.charsNoSpace.toLocaleString()}</div>
                <div className="stat-lab">No spaces</div>
              </div>
              <div className="stat-card amber">
                <div className="stat-val">{stats.sentences}</div>
                <div className="stat-lab">Sentences</div>
              </div>
              <div className="stat-card purple">
                <div className="stat-val">{stats.paragraphs}</div>
                <div className="stat-lab">Paragraphs</div>
              </div>
              <div className="stat-card teal">
                <div className="stat-val">{stats.readingTime} min</div>
                <div className="stat-lab">Read time</div>
              </div>
            </div>

            <div className="wc-time-row">
              <div className="time-item">
                <span className="time-icon">📖</span>
                <div>
                  <div className="time-val">{stats.readingTime} min</div>
                  <div className="time-lab">Reading time</div>
                </div>
              </div>
              <div className="time-item">
                <span className="time-icon">🎤</span>
                <div>
                  <div className="time-val">{stats.speakingTime} min</div>
                  <div className="time-lab">Speaking time</div>
                </div>
              </div>
            </div>

            {stats.topWords.length > 0 && (
              <div className="top-words">
                <div className="top-words-title">Top words</div>
                {stats.topWords.map(([word, count]) => (
                  <div key={word} className="top-word-row">
                    <span className="top-word">{word}</span>
                    <div className="top-word-bar-wrap">
                      <div
                        className="top-word-bar"
                        style={{ width: `${(count / stats.topWords[0][1]) * 100}%` }}
                      />
                    </div>
                    <span className="top-word-count">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="tool-info-box">
          <h2>About this tool</h2>
          <ul>
            <li>Reading time is estimated at 200 words per minute</li>
            <li>Speaking time is estimated at 130 words per minute</li>
            <li>Top words excludes short words under 3 characters</li>
            <li>Your text is never stored or sent anywhere</li>
          </ul>
        </div>
      </main>
    </>
  );
}