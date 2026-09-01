import { ChevronRight, UserRound } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { ScreenBody, ScreenHeader } from "../components/Shell";
import { PROFILE } from "../data";
import type { DemoMode } from "./EventsScreen";

const DEMO_MODES: { id: DemoMode; label: string }[] = [
  { id: "normal", label: "Normal" },
  { id: "loading", label: "Loading" },
  { id: "empty", label: "Empty" },
  { id: "error", label: "Error" },
];

export function ProfileScreen({
  notifications,
  onNotificationsChange,
  onOpenMyEvents,
  myEventsCount,
  demoMode,
  onDemoModeChange,
}: {
  notifications: boolean;
  onNotificationsChange: (v: boolean) => void;
  onOpenMyEvents: () => void;
  myEventsCount: number;
  demoMode: DemoMode;
  onDemoModeChange: (m: DemoMode) => void;
}) {
  return (
    <>
      <ScreenHeader title="Profile" />
      <ScreenBody className="px-4 py-5 pb-8">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent">
            <UserRound className="size-6 text-accent-foreground" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-foreground">
              {PROFILE.name}
            </p>
            <p className="truncate text-sm text-muted-foreground">{PROFILE.email}</p>
            <span className="mt-1.5 inline-flex rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
              {PROFILE.role}
            </span>
          </div>
        </div>

        <div className="mt-5 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card shadow-card">
          <div className="flex min-h-14 items-center justify-between gap-4 px-4 py-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">Notifications</p>
              <p className="text-xs text-muted-foreground">Updates about your events</p>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={onNotificationsChange}
              aria-label="Notifications"
            />
          </div>
          <button
            type="button"
            onClick={onOpenMyEvents}
            className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-muted"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">My Events</p>
              <p className="text-xs text-muted-foreground">
                {myEventsCount} published {myEventsCount === 1 ? "event" : "events"}
              </p>
            </div>
            <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden />
          </button>
        </div>

        <section className="mt-7">
          <h2 className="text-sm font-semibold text-foreground">Demo states</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Preview how the Events screen behaves in each state.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {DEMO_MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => onDemoModeChange(m.id)}
                aria-pressed={demoMode === m.id}
                className={
                  "h-11 rounded-xl border text-sm font-medium transition-colors " +
                  (demoMode === m.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground")
                }
              >
                {m.label}
              </button>
            ))}
          </div>
        </section>
      </ScreenBody>
    </>
  );
}
