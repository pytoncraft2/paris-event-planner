import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { EventoriasLogo } from "./EventoriasLogo";
import {
  hasSeenSplash,
  markSplashSeen,
  SPLASH_RESET_EVENT,
} from "../splash";

/** Fully visible before fade — within the 1–1.5s target for Maze. */
const SPLASH_HOLD_MS = 1300;
const SPLASH_FADE_MS = 280;

/**
 * One-shot launch overlay inside MobileShell (covers BottomNav too).
 * Explore mounts underneath → no layout jump on dismiss.
 * Shown once per browser tab session; replayed on Maze `?reset=true`.
 */
export function SplashScreen() {
  // Same initial UI on server + client (avoids hydration mismatch).
  const [mounted, setMounted] = useState(true);
  const [opaque, setOpaque] = useState(true);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (hasSeenSplash()) {
      setMounted(false);
      return;
    }
    setRunId((n) => n + 1);
  }, []);

  useEffect(() => {
    const onReset = () => {
      setMounted(true);
      setOpaque(true);
      setRunId((n) => n + 1);
    };
    window.addEventListener(SPLASH_RESET_EVENT, onReset);
    return () => window.removeEventListener(SPLASH_RESET_EVENT, onReset);
  }, []);

  useEffect(() => {
    if (runId === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let fadeId = 0;
    const holdId = window.setTimeout(() => {
      markSplashSeen();
      if (reduced) {
        setMounted(false);
        return;
      }
      setOpaque(false);
      fadeId = window.setTimeout(() => setMounted(false), SPLASH_FADE_MS);
    }, SPLASH_HOLD_MS);

    return () => {
      window.clearTimeout(holdId);
      window.clearTimeout(fadeId);
    };
  }, [runId]);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex flex-col bg-background pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]",
        "transition-opacity duration-[280ms] ease-out",
        "motion-reduce:transition-none",
        opaque ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!opaque}
    >
      <div className="flex min-h-0 flex-1 items-center justify-center px-8">
        <EventoriasLogo className="h-auto w-full max-w-[220px]" />
      </div>
    </div>
  );
}
