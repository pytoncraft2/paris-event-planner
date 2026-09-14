import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import { EventCard } from "../components/EventCard";
import { Chip } from "../components/Chip";
import { EmptyState, ErrorState, LoadingList } from "../components/States";
import { ScreenBody } from "../components/Shell";
import { CATEGORIES, type Category, type EventItem } from "../types";

export type DemoMode = "normal" | "loading" | "empty" | "error";

type Props = {
  events: EventItem[];
  query: string;
  onQueryChange: (v: string) => void;
  activeCategory: Category | "All";
  onCategoryChange: (c: Category | "All") => void;
  filterCount: number;
  onOpenFilters: () => void;
  onSelectEvent: (e: EventItem) => void;
  demoMode: DemoMode;
  onRetry: () => void;
  onResetFilters: () => void;
};

export function EventsScreen({
  events,
  query,
  onQueryChange,
  activeCategory,
  onCategoryChange,
  filterCount,
  onOpenFilters,
  onSelectEvent,
  demoMode,
  onRetry,
  onResetFilters,
}: Props) {
  return (
    <ScreenBody>
      <div
        aria-hidden
        className="sticky top-0 z-20 h-[env(safe-area-inset-top,0px)] bg-card"
      />

      <div className="bg-card px-4 pt-[max(0px,calc(1rem-env(safe-area-inset-top,0px)))]">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight text-primary">Eventorias</span>
        </div>
        <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0" aria-hidden />
          Paris, France
        </p>
        <h1 className="mt-1 text-2xl leading-tight font-semibold tracking-tight text-foreground">
          What&apos;s happening in Paris?
        </h1>
      </div>

      <div className="sticky top-[env(safe-area-inset-top,0px)] z-10 border-b border-border bg-card px-4 py-2.5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
          <div className="relative min-w-0">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search events"
              aria-label="Search events"
              className="h-11 w-full rounded-xl border border-border bg-background pr-3 pl-9 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={onOpenFilters}
            className="relative inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border border-border bg-background px-3 text-sm font-medium text-foreground hover:bg-muted"
          >
            <SlidersHorizontal className="size-4" aria-hidden />
            Filters
            {filterCount > 0 ? (
              <span className="ml-0.5 inline-flex size-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {filterCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pt-3 pb-0.5">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <Chip
            key={c}
            label={c}
            selected={activeCategory === c}
            onClick={() => onCategoryChange(c)}
          />
        ))}
      </div>

      <div className="px-4 pt-4 pb-6">
        {demoMode === "loading" ? (
          <LoadingList />
        ) : demoMode === "error" ? (
          <ErrorState onRetry={onRetry} />
        ) : events.length === 0 || demoMode === "empty" ? (
          <EmptyState actionLabel="Reset filters" onAction={onResetFilters} />
        ) : (
          <>
            <p className="mb-3 text-sm text-muted-foreground">
              {events.length} {events.length === 1 ? "event" : "events"}
            </p>
            <ul className="space-y-4">
              {events.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} onClick={() => onSelectEvent(event)} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </ScreenBody>
  );
}
