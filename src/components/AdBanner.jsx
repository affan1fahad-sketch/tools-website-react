import { useEffect } from "react";

export default function AdBanner() {
  const isDev = import.meta.env.DEV;
  
  if (isDev) {
    return <div style={{ 
      height: "90px", 
      background: "#f1f5f9", 
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      color: "#94a3b8",
      margin: "1rem 0"
    }}>Ad placeholder (dev mode)</div>;
  }

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <div className="ad-wrap">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9243726078420554"
        data-ad-slot="3635053903"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}