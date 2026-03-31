import { ACTIVITIES } from "../data/activities";

export default function DayCell({ day, data, selected, onSelect, isSunday }) {
  if (day === null) return <div style={{ width: 44, height: 52 }} />;

  const hasActivity = data && ACTIVITIES.some((a) => data[a.key]);
  const activeActs = ACTIVITIES.filter((a) => data?.[a.key]);

  const bgColor =
    selected === day
      ? "rgba(45,156,219,0.15)"
      : isSunday && !hasActivity
      ? "rgba(155,81,224,0.06)"
      : hasActivity
      ? "rgba(255,255,255,0.6)"
      : "rgba(255,255,255,0.35)";

  return (
    <div
      onClick={() => onSelect(day)}
      style={{
        width: 44,
        height: 52,
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        background: bgColor,
        border:
          selected === day
            ? "2px solid #2D9CDB"
            : isSunday
            ? "1.5px dashed rgba(155,81,224,0.25)"
            : "1.5px solid rgba(0,0,0,0.06)",
        transition: "all 0.2s ease",
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: isSunday && !hasActivity ? "#b388d9" : "#1a1a2e",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {day}
      </span>
      <div
        style={{
          display: "flex",
          gap: 1.5,
          marginTop: 2,
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 36,
        }}
      >
        {activeActs.map((a) => (
          <div
            key={a.key}
            style={{
              width: 5.5,
              height: 5.5,
              borderRadius: "50%",
              background: a.color,
            }}
          />
        ))}
        {isSunday && !hasActivity && (
          <span style={{ fontSize: 8, color: "#b388d9" }}>rest</span>
        )}
      </div>
    </div>
  );
}
