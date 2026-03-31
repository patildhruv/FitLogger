import { useState, useEffect, useCallback, useRef } from "react";

const STORAGE_KEY = "pappa-fit-active-timer";

function loadTimer() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveTimer(timer) {
  if (timer) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timer));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function computeElapsed(startedAt) {
  return Math.max(0, Date.now() - startedAt);
}

export function useTimer(onComplete) {
  const [activeTimer, setActiveTimer] = useState(loadTimer);
  const [elapsed, setElapsed] = useState(() => {
    const t = loadTimer();
    return t ? computeElapsed(t.startedAt) : 0;
  });
  const intervalRef = useRef(null);

  useEffect(() => {
    if (activeTimer) {
      setElapsed(computeElapsed(activeTimer.startedAt));
      intervalRef.current = setInterval(() => {
        setElapsed(computeElapsed(activeTimer.startedAt));
      }, 1000);
    } else {
      setElapsed(0);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeTimer]);

  const startTimer = useCallback((activityKey) => {
    const timer = { activity: activityKey, startedAt: Date.now() };
    setActiveTimer(timer);
    saveTimer(timer);
  }, []);

  const stopTimer = useCallback(() => {
    if (!activeTimer) return;
    const elapsedMs = computeElapsed(activeTimer.startedAt);
    const minutes = Math.round(elapsedMs / 60000);
    if (onComplete) {
      onComplete(activeTimer.activity, Math.max(1, minutes));
    }
    setActiveTimer(null);
    saveTimer(null);
  }, [activeTimer, onComplete]);

  const cancelTimer = useCallback(() => {
    setActiveTimer(null);
    saveTimer(null);
  }, []);

  return {
    activeTimer,
    elapsed,
    isRunning: !!activeTimer,
    startTimer,
    stopTimer,
    cancelTimer,
  };
}
