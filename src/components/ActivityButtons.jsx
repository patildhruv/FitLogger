import { useActivities } from "../hooks/useActivities";
import { haptic } from "../utils/haptics";

export default function ActivityButtons({ onStart, isRunning, activeActivity }) {
  const activities = useActivities();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 10,
        maxWidth: 420,
        width: "100%",
        marginBottom: 16,
      }}
    >
      {activities.map((a) => {
        const isActive = isRunning && activeActivity === a.key;
        const isDisabled = isRunning && !isActive;
        return (
          <button
            key={a.key}
            onClick={() => { if (!isRunning) { haptic.tap(); onStart(a.key); } }}
            disabled={isDisabled}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "16px 8px",
              borderRadius: 14,
              border: isActive ? `2px solid ${a.color}` : "1.5px solid var(--card-border)",
              background: isActive
                ? `${a.color}15`
                : isDisabled
                ? "var(--button-disabled-bg)"
                : "var(--card-bg-strong)",
              cursor: isDisabled ? "not-allowed" : "pointer",
              opacity: isDisabled ? 0.4 : 1,
              transition: "all 0.15s ease",
              fontFamily: "'DM Sans', sans-serif",
              animation: isActive ? "breathe 2s ease-in-out infinite" : "fadeInUp 0.3s ease",
            }}
            onPointerDown={(e) => { if (!isDisabled) e.currentTarget.style.transform = "scale(0.95)"; }}
            onPointerUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            onPointerLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            <span style={{ fontSize: 28 }}>{a.emoji}</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: isActive ? a.color : "var(--text-secondary)",
              }}
            >
              {a.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
