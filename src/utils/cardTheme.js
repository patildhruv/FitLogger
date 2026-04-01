function isDark() {
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
}

export function theme() {
  const dark = isDark();
  return {
    bg: dark
      ? "linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
      : "linear-gradient(145deg, #fef9f0 0%, #f0ebe3 50%, #e8e0d4 100%)",
    text: dark ? "#e8e0d4" : "#1a1a2e",
    textSub: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
    textFaint: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)",
    statBg: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
    noteBg: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
    noteText: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
    decorA: dark ? "rgba(45,156,219,0.12)" : "rgba(45,156,219,0.1)",
    decorB: dark ? "rgba(242,153,74,0.1)" : "rgba(242,153,74,0.08)",
    decorC: dark ? "rgba(155,81,224,0.12)" : "rgba(155,81,224,0.08)",
    pillBgAlpha: dark ? "25" : "18",
    pillBorderAlpha: dark ? "40" : "30",
  };
}
