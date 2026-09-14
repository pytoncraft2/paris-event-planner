import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScreenBody } from "../components/Shell";
import { formatDate, formatPrice, type EventItem } from "../types";

function SuccessMark() {
  return (
    <div className="flex size-14 items-center justify-center rounded-full bg-accent">
      <Check className="size-7 text-accent-foreground" aria-hidden />
    </div>
  );
}

export function CalendarSuccessScreen({
  event,
  onDone,
  onBackToEvents,
}: {
  event: EventItem | null;
  onDone: () => void;
  onBackToEvents: () => void;
}) {
  return (
    <>
      <ScreenBody className="flex flex-col items-center px-4 pt-16 pb-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/20">
          <Check className="size-7 text-primary" aria-hidden />
        </div>
        <h1 className="mt-5 text-xl font-semibold text-foreground">Added to your calendar</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You&apos;re all set. The event has been saved to your Eventorias calendar.
        </p>

        {event ? (
          <div className="mt-7 w-full rounded-xl border border-border bg-card p-4 text-left shadow-card">
            <p className="text-base font-semibold text-foreground">{event.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatDate(event.date)} · {event.time}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {event.venue}, {event.neighborhood}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {event.language} · {formatPrice(event.price)}
            </p>
          </div>
        ) : null}
      </ScreenBody>
      <div className="shrink-0 border-t border-border bg-card px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Button className="h-12 w-full rounded-xl text-base" onClick={onBackToEvents}>
          Back to events
        </Button>
      </div>
    </>
  );
}

export function PublishSuccessScreen({
  event,
  isEdit,
  onViewMyEvents,
}: {
  event: EventItem | null;
  isEdit: boolean;
  onViewMyEvents: () => void;
}) {
  return (
    <>
      <ScreenBody className="flex flex-col items-center px-4 pt-16 pb-6 text-center">
        <SuccessMark />
        <h1 className="mt-5 text-xl font-semibold text-foreground">
          {isEdit ? "Changes saved" : "Event published"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isEdit
            ? "Your event has been updated."
            : "Your event is now visible to travellers in Paris."}
        </p>

        {event ? (
          <div className="mt-7 w-full rounded-xl border border-border bg-card p-4 text-left shadow-card">
            <p className="text-base font-semibold text-foreground">{event.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatDate(event.date)}
              {event.time ? ` · ${event.time}` : ""}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{event.address}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {event.language} · {formatPrice(event.price)}
            </p>
          </div>
        ) : null}
      </ScreenBody>
      <div className="shrink-0 border-t border-border bg-card px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Button className="h-12 w-full rounded-xl text-base" onClick={onViewMyEvents}>
          View My Events
        </Button>
      </div>
    </>
  );
}
