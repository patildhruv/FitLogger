import { forwardRef } from "react";
import { useActivities } from "../hooks/useActivities";
import { theme } from "../utils/cardTheme";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function fmtTime(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

const ShareableMonthCard = forwardRef(function ShareableMonthCard({ monthData, year, month, daysInMonth }, ref) {
  const activities = useActivities();
  const t = theme();

  const activeDays = Object.keys(monthData).length;
  const totals = {};
  activities.forEach((a) => { totals[a.key] = 0; });
  Object.values(monthData).forEach((d) => {
    activities.forEach((a) => {
      if (d[a.key]) totals[a.key] += d[a.key];
    });
  });
  const grandTotal = Object.values(totals).reduce((s, v) => s + v, 0);
  const activeActs = activities.filter((a) => totals[a.key] > 0);

  return (
    <div
      ref={ref}
      style={{
        background: t.bg,
        borderRadius: 24,
        padding: "28px 20px 24px",
        color: t.text,
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
        width: 420,
      }}
    >
      <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: t.decorC }} />
      <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: t.decorB }} />

      <div style={{ textAlign: "center", marginBottom: 20, position: "relative" }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 3, color: t.textSub, textTransform: "uppercase", marginBottom: 4 }}>
          Monthly Fitness Summary
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 800, marginBottom: 2 }}>
          {MONTH_NAMES[month - 1]} {year}
        </div>
        <div style={{ fontSize: 11, color: t.textSub, fontWeight: 500 }}>
          FitLogger
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1, marginBottom: 4 }}>
          {grandTotal > 0 ? fmtTime(grandTotal) : "No Data"}
        </div>
        {grandTotal > 0 && (
          <div style={{ fontSize: 12, color: t.textSub, fontWeight: 500 }}>
            Total workout time
          </div>
        )}
      </div>

      {activeActs.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 18 }}>
          {activeActs.map((a) => (
            <div
              key={a.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: `${a.color}${t.pillBgAlpha}`,
                border: `1px solid ${a.color}${t.pillBorderAlpha}`,
                borderRadius: 12,
                padding: "8px 12px",
              }}
            >
              <span style={{ fontSize: 18 }}>{a.emoji}</span>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: a.color, opacity: 0.9 }}>{a.label}</div>
                <div style={{ fontSize: 15, fontWeight: 800 }}>{fmtTime(totals[a.key])}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, background: t.statBg, borderRadius: 12, padding: "10px 8px", textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{activeDays}<span style={{ fontSize: 11, fontWeight: 500, opacity: 0.5 }}>/{daysInMonth}</span></div>
          <div style={{ fontSize: 9, fontWeight: 600, color: t.textSub, textTransform: "uppercase", letterSpacing: 0.5 }}>Active Days</div>
        </div>
        <div style={{ flex: 1, background: t.statBg, borderRadius: 12, padding: "10px 8px", textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{activeActs.length}</div>
          <div style={{ fontSize: 9, fontWeight: 600, color: t.textSub, textTransform: "uppercase", letterSpacing: 0.5 }}>Activities</div>
        </div>
        <div style={{ flex: 1, background: t.statBg, borderRadius: 12, padding: "10px 8px", textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{fmtTime(grandTotal)}</div>
          <div style={{ fontSize: 9, fontWeight: 600, color: t.textSub, textTransform: "uppercase", letterSpacing: 0.5 }}>Total</div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 16, fontSize: 9, color: t.textFaint, letterSpacing: 1 }}>
        FitLogger — Consistency is the real strength 💪
      </div>
    </div>
  );
});

export default ShareableMonthCard;
