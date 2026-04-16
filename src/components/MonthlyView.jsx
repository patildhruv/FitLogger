import { useState, useRef } from "react";
import { useLogs } from "../hooks/useLogs";
import { captureAndShare } from "../utils/shareCard";
import { haptic } from "../utils/haptics";
import Calendar from "./Calendar";
import ActivityDonut from "./ActivityDonut";
import Summary from "./Summary";
import ShareableMonthCard from "./ShareableMonthCard";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function MonthlyView() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const [viewYear, setViewYear] = useState(currentYear);
  const [viewMonth, setViewMonth] = useState(currentMonth);
  const [sharing, setSharing] = useState(false);
  const cardRef = useRef(null);

  const { getMonth } = useLogs();
  const monthData = getMonth(viewYear, viewMonth);
  const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();

  const isCurrentMonth = viewYear === currentYear && viewMonth === currentMonth;

  function goPrev() {
    haptic.tick();
    if (viewMonth === 1) {
      setViewYear((y) => y - 1);
      setViewMonth(12);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function goNext() {
    if (isCurrentMonth) return;
    haptic.tick();
    if (viewMonth === 12) {
      setViewYear((y) => y + 1);
      setViewMonth(1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  async function handleShare() {
    if (sharing) return;
    haptic.tap();
    setSharing(true);
    // Wait for card to render
    await new Promise((r) => setTimeout(r, 100));
    if (cardRef.current) {
      try {
        await captureAndShare(cardRef.current, {
          text: `My fitness summary for ${MONTH_NAMES[viewMonth - 1]} ${viewYear}!`,
          filename: `fitlogger-${viewYear}-${String(viewMonth).padStart(2, "0")}.png`,
        });
      } catch {}
    }
    setSharing(false);
  }

  return (
    <div style={{ maxWidth: 420, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Month Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 420,
          width: "100%",
          marginBottom: 14,
          padding: "0 4px",
        }}
      >
        <button
          onClick={goPrev}
          style={{
            background: "var(--card-bg-strong)",
            border: "1px solid var(--card-border)",
            borderRadius: 10,
            width: 38,
            height: 38,
            fontSize: 18,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-primary)",
          }}
        >
          ◀
        </button>
        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
          {MONTH_NAMES[viewMonth - 1]} {viewYear}
        </div>
        <button
          onClick={goNext}
          disabled={isCurrentMonth}
          style={{
            background: "var(--card-bg-strong)",
            border: "1px solid var(--card-border)",
            borderRadius: 10,
            width: 38,
            height: 38,
            fontSize: 18,
            cursor: isCurrentMonth ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-primary)",
            opacity: isCurrentMonth ? 0.3 : 1,
          }}
        >
          ▶
        </button>
      </div>

      {/* Calendar */}
      <Calendar monthData={monthData} year={viewYear} month={viewMonth} />

      {/* Activity Donut */}
      <ActivityDonut monthData={monthData} />

      {/* Summary Progress Bars */}
      <Summary monthData={monthData} daysInMonth={daysInMonth} />

      {/* Share Monthly Summary */}
      <div style={{ position: "absolute", left: -9999, top: 0, width: 420 }}>
        <ShareableMonthCard
          ref={cardRef}
          monthData={monthData}
          year={viewYear}
          month={viewMonth}
          daysInMonth={daysInMonth}
        />
      </div>

      <button
        onClick={handleShare}
        disabled={sharing}
        style={{
          width: "100%",
          maxWidth: 420,
          marginTop: 16,
          padding: "14px 0",
          borderRadius: 14,
          border: "none",
          background: sharing ? "var(--button-muted-bg)" : "linear-gradient(135deg, #9B51E0, #56CCF2)",
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          cursor: sharing ? "wait" : "pointer",
          fontFamily: "'DM Sans', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          animation: sharing ? "none" : "breathe 3s ease-in-out infinite",
        }}
      >
        {sharing ? "Preparing..." : "📤 Share Monthly Summary"}
      </button>
    </div>
  );
}
