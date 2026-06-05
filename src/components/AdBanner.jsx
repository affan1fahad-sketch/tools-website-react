import { useEffect } from "react";

export default function AdBanner() {
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