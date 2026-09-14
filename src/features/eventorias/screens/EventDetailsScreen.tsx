import { CalendarDays, Check, Clock, Globe, MapPin, Tag, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScreenBody, ScreenHeader } from "../components/Shell";
import { formatDate, formatPrice, type EventItem } from "../types";

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium break-words text-foreground">{value}</p>
      </div>
    </div>
  );
}

export function EventDetailsScreen({
  event,
  onBack,
  onAddToCalendar,
  inCalendar = false,
}: {
  event: EventItem;
  onBack: () => void;
  onAddToCalendar: () => void;
  inCalendar?: boolean;
}) {
  return (
    <>
      <ScreenHeader title={event.title} onBack={onBack} />
      <ScreenBody className="pb-6">
        <div className="aspect-[16/9] w-full bg-muted">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              width={800}
              height={450}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
              No image
            </div>
          )}
        </div>

        <div className="px-4 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
              {event.category}
            </span>
            {inCalendar ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-primary-soft px-2 py-1 text-xs font-medium text-primary">
                <Check className="size-3 shrink-0" aria-hidden />
                In your calendar
              </span>
            ) : null}
          </div>
          <h2 className="mt-3 text-xl leading-snug font-semibold text-foreground">
            {event.title}
          </h2>

          <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-card px-4 shadow-card">
            <Row icon={CalendarDays} label="Date" value={formatDate(event.date)} />
            <Row icon={Clock} label="Time" value={event.time} />
            <Row icon={Globe} label="Language" value={event.language} />
            <Row icon={Tag} label="Price" value={formatPrice(event.price)} />
            <Row
              icon={MapPin}
              label="Venue"
              value={`${event.venue} — ${event.address}`}
            />
          </div>

          <h3 className="mt-6 text-sm font-semibold text-foreground">About this event</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {event.description}
          </p>

          <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent">
              <UserRound className="size-5 text-accent-foreground" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {event.organizer}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {event.organizerRole}
              </p>
            </div>
          </div>
        </div>
      </ScreenBody>
      <div className="shrink-0 border-t border-border bg-card px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {inCalendar ? (
          <p
            role="status"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-soft text-base font-medium text-primary"
          >
            <Check className="size-5 shrink-0" aria-hidden />
            Added to calendar
          </p>
        ) : (
          <Button className="h-12 w-full rounded-xl text-base" onClick={onAddToCalendar}>
            Add to calendar
          </Button>
        )}
      </div>
    </>
  );
}
