import { useRef, useEffect } from "react";
import { useActivities } from "../hooks/useActivities";

const DAYS_TO_SHOW = 30;

function getLastNDays(logs, activities, n) {
  const days = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    const dayNum = d.getDate();
    const data = logs[key] || {};
    const segments = activities.filter((a) => data[a.key]).map((a) => ({
      key: a.key,
      color: a.color,
      minutes: data[a.key],
    }));
    const total = segments.reduce((s, seg) => s + seg.minutes, 0);
    const isToday = i === 0;
    days.push({ key, dayName, dayNum, segments, total, isToday });
  }
  return days;
}

export default function WeeklyBarChart({ logs }) {
  const activities = useActivities();
  const scrollRef = useRef(null);
  const days = getLastNDays(logs, activities, DAYS_TO_SHOW);
  const maxTotal = Math.max(...days.map((d) => d.total), 1);

  const barW = 38;
  const barGap = 8;
  const chartH = 130;
  const topPad = 10;
  const barMaxH = chartH - topPad;
  const totalW = days.length * (barW + barGap);

  // Scroll to end (today) on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, []);

  return (
    <div
      style={{
        background: "var(--card-bg)",
        borderRadius: 18,
        padding: "14px 0 14px 12px",
        maxWidth: 420,
        width: "100%",
        border: "1px solid var(--card-border)",
        marginBottom: 16,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: 12, marginBottom: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", letterSpacing: 0.5, textTransform: "uppercase" }}>
          Last {DAYS_TO_SHOW} Days
        </div>
        <div style={{ fontSize: 10, color: "var(--text-faint)" }}>
          ← swipe
        </div>
      </div>
      <div
        ref={scrollRef}
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          paddingBottom: 4,
          paddingRight: 12,
        }}
      >
        <svg
          viewBox={`0 0 ${totalW} ${chartH + 28}`}
          style={{ width: totalW, height: chartH + 28, display: "block" }}
        >
          {days.map((day, i) => {
            const x = i * (barW + barGap);
            let yOffset = chartH;

            return (
              <g key={day.key}>
                {/* Background track */}
                <rect
                  x={x}
                  y={topPad}
                  width={barW}
                  height={barMaxH}
                  rx={6}
                  fill="var(--bar-track)"
                />
                {/* Stacked segments */}
                {day.segments.map((seg) => {
                  const segH = (seg.minutes / maxTotal) * barMaxH;
                  yOffset -= segH;
                  return (
                    <rect
                      key={seg.key}
                      x={x}
                      y={yOffset}
                      width={barW}
                      height={segH}
                      rx={segH === (day.total / maxTotal) * barMaxH ? 6 : 0}
                      fill={seg.color}
                      opacity={0.85}
                    >
                      <animate attributeName="height" from="0" to={segH} dur="0.6s" fill="freeze" />
                      <animate attributeName="y" from={chartH} to={yOffset} dur="0.6s" fill="freeze" />
                    </rect>
                  );
                })}
                {/* Total on top */}
                {day.total > 0 && (
                  <text
                    x={x + barW / 2}
                    y={chartH - (day.total / maxTotal) * barMaxH - 3}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="600"
                    fill="var(--text-muted)"
                  >
                    {day.total}m
                  </text>
                )}
                {/* Day label */}
                <text
                  x={x + barW / 2}
                  y={chartH + 13}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight={day.isToday ? "800" : "500"}
                  fill={day.isToday ? "var(--text-primary)" : "var(--text-muted)"}
                >
                  {day.isToday ? "Today" : day.dayName}
                </text>
                <text
                  x={x + barW / 2}
                  y={chartH + 24}
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="500"
                  fill="var(--text-faint)"
                >
                  {day.dayNum}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
