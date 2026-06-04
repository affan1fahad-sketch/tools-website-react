export default function Logo() {
  return (
    <svg width="130" height="36" viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Icon box */}
      <rect width="36" height="36" rx="9" fill="#2563eb"/>
      {/* Lightning bolt */}
      <polygon points="21,5 11,19 17,19 9,31 23,15 16,15" fill="white"/>
      {/* ToolKit text */}
      <text x="44" y="23" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="700" fill="#0f172a">Tool</text>
      <text x="82" y="23" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="700" fill="#2563eb">Kit</text>
    </svg>
  );
}