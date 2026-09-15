export const SPLASH_SEEN_KEY = "eventorias.splashSeen";
export const SPLASH_RESET_EVENT = "eventorias-splash-reset";

export function hasSeenSplash(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(SPLASH_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function markSplashSeen() {
  try {
    sessionStorage.setItem(SPLASH_SEEN_KEY, "1");
  } catch {
    // Prototype: ignore quota / private-mode failures.
  }
}

/** Clears the one-shot flag and notifies SplashScreen (used by Maze ?reset=true). */
export function clearSplashSeen() {
  try {
    sessionStorage.removeItem(SPLASH_SEEN_KEY);
  } catch {
    // ignore
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(SPLASH_RESET_EVENT));
  }
}
