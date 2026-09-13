import { useState } from "react";
import { CalendarDays, Clock, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScreenBody, ScreenHeader } from "../components/Shell";
import { EmptyState } from "../components/States";
import { formatDate, formatPrice, type EventItem } from "../types";

export function MyEventsScreen({
  events,
  onBack,
  onCreate,
  onEdit,
  onCancelEvent,
}: {
  events: EventItem[];
  onBack: () => void;
  onCreate: () => void;
  onEdit: (e: EventItem) => void;
  onCancelEvent: (id: string) => void;
}) {
  const [pending, setPending] = useState<EventItem | null>(null);

  return (
    <>
      <ScreenHeader
        title="My Events"
        subtitle="Published by you"
        onBack={onBack}
        action={
          <button
            type="button"
            onClick={onCreate}
            aria-label="Create event"
            className="flex size-10 items-center justify-center rounded-xl text-primary hover:bg-primary-soft"
          >
            <Plus className="size-5" aria-hidden />
          </button>
        }
      />
      <ScreenBody className="px-4 py-5 pb-6">
        {events.length === 0 ? (
          <EmptyState
            title="No published events yet"
            description="Create your first event and it will appear here."
            actionLabel="Create event"
            onAction={onCreate}
          />
        ) : (
          <ul className="space-y-4">
            {events.map((event) => (
              <li
                key={event.id}
                className="rounded-xl border border-border bg-card p-4 shadow-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="min-w-0 text-base leading-snug font-semibold text-foreground">
                    {event.title}
                  </h3>
                  <span className="shrink-0 rounded-md bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
                    {formatPrice(event.price)}
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-1.5">
                    <CalendarDays className="size-4 shrink-0" aria-hidden />
                    {formatDate(event.date)}
                    {event.time ? (
                      <>
                        <Clock className="ml-2 size-4 shrink-0" aria-hidden />
                        {event.time}
                      </>
                    ) : null}
                  </p>
                  <p className="flex min-w-0 items-center gap-1.5">
                    <MapPin className="size-4 shrink-0" aria-hidden />
                    <span className="truncate">{event.address}</span>
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="h-11 rounded-xl border-border bg-card"
                    onClick={() => onEdit(event)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-11 rounded-xl text-destructive hover:text-destructive"
                    onClick={() => setPending(event)}
                  >
                    Cancel
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </ScreenBody>
      <div className="shrink-0 border-t border-border bg-card px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Button className="h-12 w-full gap-2 rounded-xl text-base" onClick={onCreate}>
          <Plus className="size-4" aria-hidden />
          Create event
        </Button>
      </div>

      <AlertDialog open={pending !== null} onOpenChange={(o) => !o && setPending(null)}>
        <AlertDialogContent className="max-w-[calc(100vw-2rem)] rounded-xl sm:max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this event?</AlertDialogTitle>
            <AlertDialogDescription>
              {pending?.title} will be removed from your published events. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 rounded-xl">Keep event</AlertDialogCancel>
            <AlertDialogAction
              className="h-11 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (pending) onCancelEvent(pending.id);
                setPending(null);
              }}
            >
              Cancel event
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
