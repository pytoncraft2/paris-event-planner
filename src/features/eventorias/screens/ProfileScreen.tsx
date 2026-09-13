import { ChevronRight, Plus, UserRound } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { ScreenBody, ScreenHeader } from "../components/Shell";
import { PROFILE } from "../data";

export function ProfileScreen({
  notifications,
  onNotificationsChange,
  onOpenMyEvents,
  onCreate,
  myEventsCount,
}: {
  notifications: boolean;
  onNotificationsChange: (v: boolean) => void;
  onOpenMyEvents: () => void;
  onCreate: () => void;
  myEventsCount: number;
}) {
  return (
    <>
      <ScreenHeader
        title="Profile"
        action={
          <span className="text-sm font-semibold tracking-tight text-primary">Eventorias</span>
        }
      />
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
          <button
            type="button"
            onClick={onCreate}
            className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-muted"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">Create event</p>
              <p className="text-xs text-muted-foreground">Publish a new event for travellers</p>
            </div>
            <Plus className="size-5 shrink-0 text-muted-foreground" aria-hidden />
          </button>
        </div>

      </ScreenBody>
    </>
  );
}
