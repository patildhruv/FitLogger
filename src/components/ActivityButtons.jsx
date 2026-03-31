import { ACTIVITIES } from "../data/activities";

export default function ActivityButtons({ onStart, isRunning, activeActivity }) {
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
      {ACTIVITIES.map((a) => {
        const isActive = isRunning && activeActivity === a.key;
        const isDisabled = isRunning && !isActive;
        return (
          <button
            key={a.key}
            onClick={() => !isRunning && onStart(a.key)}
            disabled={isDisabled}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: "14px 8px",
              borderRadius: 14,
              border: isActive ? `2px solid ${a.color}` : "1.5px solid rgba(0,0,0,0.06)",
              background: isActive
                ? `${a.color}15`
                : isDisabled
                ? "rgba(0,0,0,0.03)"
                : "rgba(255,255,255,0.7)",
              cursor: isDisabled ? "not-allowed" : "pointer",
              opacity: isDisabled ? 0.4 : 1,
              transition: "all 0.2s ease",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <span style={{ fontSize: 24 }}>{a.emoji}</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: isActive ? a.color : "#555",
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
