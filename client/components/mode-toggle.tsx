import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center bg-transparent border-none outline-none cursor-pointer"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <span className="sr-only">Toggle theme</span>
      <span className="absolute transition-all duration-500 ease-in-out"
        style={{ opacity: isDark ? 0 : 1, transform: isDark ? "scale(0.7) rotate(-90deg)" : "scale(1) rotate(0deg)" }}
      >
        {/* Sun SVG */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="5" fill="#facc15" />
          <g stroke="#facc15" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </svg>
      </span>
      <span className="absolute transition-all duration-500 ease-in-out"
        style={{ opacity: isDark ? 1 : 0, transform: isDark ? "scale(1) rotate(0deg)" : "scale(0.7) rotate(90deg)" }}
      >
        {/* Moon SVG */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
            fill="#facc15"
            stroke="#facc15"
            strokeWidth="2"
          />
        </svg>
      </span>
    </button>
  );
}
