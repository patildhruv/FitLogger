import { ACTIVITIES } from "../data/activities";

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export default function Timer({ activeTimer, elapsed, onStop, onCancel }) {
  if (!activeTimer) return null;

  const activity = ACTIVITIES.find((a) => a.key === activeTimer.activity);
  if (!activity) return null;

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${activity.color}18, ${activity.color}08)`,
        border: `2px solid ${activity.color}40`,
        borderRadius: 20,
        padding: "20px 16px",
        maxWidth: 420,
        width: "100%",
        marginBottom: 16,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: activity.color, textTransform: "uppercase", marginBottom: 6 }}>
        Timer Running
      </div>
      <div style={{ fontSize: 36, marginBottom: 4 }}>{activity.emoji}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>
        {activity.label}
      </div>
      <div
        style={{
          fontFamily: "'DM Sans', monospace",
          fontSize: 42,
          fontWeight: 700,
          color: activity.color,
          letterSpacing: 2,
          marginBottom: 16,
        }}
      >
        {formatTime(elapsed)}
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button
          onClick={onStop}
          style={{
            background: activity.color,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "10px 28px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Stop & Log
        </button>
        <button
          onClick={onCancel}
          style={{
            background: "rgba(0,0,0,0.06)",
            color: "#888",
            border: "none",
            borderRadius: 12,
            padding: "10px 20px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
