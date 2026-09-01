import { CalendarDays, Clock, MapPin } from "lucide-react";
import { formatDate, formatPrice, type EventItem } from "../types";

type EventCardProps = {
  event: EventItem;
  onClick?: () => void;
};

export function EventCard({ event, onClick }: EventCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full overflow-hidden rounded-xl border border-border bg-card text-left shadow-card transition-colors hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
    >
      <div className="aspect-[16/9] w-full bg-muted">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            width={800}
            height={450}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-base leading-snug font-semibold text-foreground">
            {event.title}
          </h3>
          <span className="shrink-0 rounded-md bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
            {formatPrice(event.price)}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4 shrink-0" aria-hidden />
            {formatDate(event.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4 shrink-0" aria-hidden />
            {event.time}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <MapPin className="size-4 shrink-0" aria-hidden />
            <span className="truncate">{event.neighborhood}</span>
          </span>
          <span>·</span>
          <span>{event.language}</span>
        </div>
      </div>
    </button>
  );
}
