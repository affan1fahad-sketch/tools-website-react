import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import AdBanner from "../components/AdBanner";
import "./ToolPage.css";
import "./MarkdownToHtml.css";

function mdToHtml(md) {
  let html = md;
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  html = html.replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${code.trim()}</code></pre>`);
  html = html.replace(/^###### (.*$)/gim, "<h6>$1</h6>");
  html = html.replace(/^##### (.*$)/gim, "<h5>$1</h5>");
  html = html.replace(/^#### (.*$)/gim, "<h4>$1</h4>");
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
  html = html.replace(/^&gt; (.*$)/gim, "<blockquote>$1</blockquote>");
  html = html.replace(/^(---|\*\*\*)$/gim, "<hr/>");
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" />');
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/^\s*[-*] (.*$)/gim, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>\n${m}</ul>\n`);
  html = html.replace(/^\s*\d+\. (.*$)/gim, "<li>$1</li>");
  html = html.split(/\n{2,}/).map(block => {
    if (/^\s*<(h[1-6]|ul|ol|li|pre|blockquote|hr|img)/.test(block.trim())) return block;
    if (block.trim() === "") return "";
    return `<p>${block.trim()}</p>`;
  }).join("\n");
  return html.trim();
}

const SAMPLE = `# Hello World

This is **bold** and this is *italic*.

- Item one
- Item two
- Item three

[Visit ToolKit](https://free-online-tools1.vercel.app)`;

export default function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const [view, setView] = useState("code");
  const [copied, setCopied] = useState(false);

  const html = useMemo(() => mdToHtml(markdown), [markdown]);

  const copy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Free Markdown to HTML Converter — Convert MD to HTML Online</title>
        <meta name="description" content="Convert Markdown to HTML instantly with live preview. Supports headings, bold, italic, links, images, lists and code blocks. Free online tool." />
        <link rel="canonical" href="https://free-online-tools1.vercel.app/markdown-to-html" />
      </Helmet>
      <main className="tool-page">
        <div className="tool-header">
          <div className="tool-header-icon" style={{ background: "#dbeafe" }}>📋</div>
          <div><h1>Markdown to HTML Converter</h1><p>Convert Markdown to HTML with live preview, instantly</p></div>
        </div>
        <AdBanner />

        <div className="md-layout">
          <div className="md-col">
            <div className="md-col-header"><span className="md-col-label">Markdown Input</span></div>
            <textarea className="md-textarea" value={markdown} onChange={e => setMarkdown(e.target.value)} placeholder="# Type your markdown here..." />
          </div>
          <div className="md-col">
            <div className="md-col-header">
              <span className="md-col-label">{view === "code" ? "HTML Output" : "Live Preview"}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button className={`md-toggle-btn ${view === "code" ? "active" : ""}`} onClick={() => setView("code")}>Code</button>
                <button className={`md-toggle-btn ${view === "preview" ? "active" : ""}`} onClick={() => setView("preview")}>Preview</button>
              </div>
            </div>
            {view === "code" ? (
              <textarea className="md-textarea" readOnly value={html} />
            ) : (
              <div className="md-preview" dangerouslySetInnerHTML={{ __html: html }} />
            )}
          </div>
        </div>

        <button className="primary-btn" onClick={copy}>
          {copied ? "✓ Copied to clipboard!" : "📋 Copy HTML"}
        </button>

        <div className="tool-info-box">
          <h2>Supported Markdown syntax</h2>
          <ul>
            <li><strong># Heading</strong> — H1 through H6 headings</li>
            <li><strong>**bold**</strong> and <strong>*italic*</strong> text</li>
            <li><strong>[link](url)</strong> and <strong>![image](url)</strong></li>
            <li><strong>- list item</strong> — bullet and numbered lists</li>
            <li><strong>`code`</strong> and triple-backtick code blocks</li>
          </ul>
          <p>✅ Your text <strong>never leaves your browser</strong>.</p>
        </div>
      </main>
    </>
  );
}