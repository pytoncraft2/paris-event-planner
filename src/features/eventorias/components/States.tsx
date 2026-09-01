import { CalendarX, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({
  title = "No events match your filters",
  description = "Try widening your dates, budget or categories.",
  actionLabel,
  onAction,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-card px-6 py-10 text-center shadow-card">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-accent">
        <CalendarX className="size-6 text-accent-foreground" aria-hidden />
      </div>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <p className="mt-1.5 max-w-[26ch] text-sm text-muted-foreground">{description}</p>
      {actionLabel && onAction ? (
        <Button variant="outline" className="mt-5 h-11 rounded-xl" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

export function ErrorState({
  title = "Connection lost",
  description = "We couldn't load events. Check your connection and try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-card px-6 py-10 text-center shadow-card">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-accent">
        <WifiOff className="size-6 text-accent-foreground" aria-hidden />
      </div>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <p className="mt-1.5 max-w-[28ch] text-sm text-muted-foreground">{description}</p>
      {onRetry ? (
        <Button className="mt-5 h-11 rounded-xl" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}

export function LoadingList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading events</span>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="aspect-[16/9] w-full animate-pulse bg-muted" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
