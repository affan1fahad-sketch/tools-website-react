import { useRipple } from "../hooks/useRipple";

export default function RippleButton({ onClick, disabled, className, children, dark }) {
  const ripple = useRipple();

  const handleClick = (e) => {
    if (!disabled) {
      ripple(e);
      if (onClick) onClick(e);
    }
  };

  return (
    <button
      className={`ripple-btn ${dark ? "ripple-dark" : ""} ${className || ""}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}