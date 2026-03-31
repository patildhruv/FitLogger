import { useState, useCallback } from "react";

const STORAGE_KEY = "pappa-fit-logs";

function loadLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLogs(logs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function useLogs() {
  const [logs, setLogs] = useState(loadLogs);

  const addLog = useCallback((activityKey, minutes) => {
    const key = todayKey();
    setLogs((prev) => {
      const dayLog = prev[key] || {};
      const updated = {
        ...prev,
        [key]: {
          ...dayLog,
          [activityKey]: (dayLog[activityKey] || 0) + minutes,
        },
      };
      saveLogs(updated);
      return updated;
    });
  }, []);

  const getToday = useCallback(() => {
    return logs[todayKey()] || {};
  }, [logs]);

  const getMonth = useCallback(
    (year, month) => {
      const result = {};
      const daysInMonth = new Date(year, month, 0).getDate();
      for (let d = 1; d <= daysInMonth; d++) {
        const key = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        if (logs[key]) {
          result[d] = logs[key];
        }
      }
      return result;
    },
    [logs]
  );

  return { logs, addLog, getToday, getMonth, todayKey };
}
