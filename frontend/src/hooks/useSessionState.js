import { useState, useEffect, useCallback } from "react";

const PREFIX = "cs2-session-";

/**
 * useState + sessionStorage 持久化。
 * 页面刷新后自动恢复上次会话状态。
 * @template T
 * @param {string} key sessionStorage key
 * @param {T | (() => T)} initialValue
 */
export default function useSessionState(key, initialValue) {
  const storageKey = PREFIX + key;

  const [state, setState] = useState(() => {
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (raw !== null) return JSON.parse(raw);
    } catch { /* ignore */ }
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      if (state === null || state === undefined) {
        sessionStorage.removeItem(storageKey);
      } else {
        sessionStorage.setItem(storageKey, JSON.stringify(state));
      }
    } catch { /* quota exceeded, ignore */ }
  }, [storageKey, state]);

  const reset = useCallback(() => {
    try { sessionStorage.removeItem(storageKey); } catch { /* ignore */ }
    setState(typeof initialValue === "function" ? initialValue() : initialValue);
  }, [storageKey, initialValue]);

  return [state, setState, reset];
}
