import { useNavigate } from "@tanstack/react-router";
import { EventsScreen, type DemoMode } from "./screens/EventsScreen";
import { useEventorias } from "./store";

export const DEMO_MODES: DemoMode[] = ["normal", "loading", "empty", "error"];

export type DemoSearch = { demo?: DemoMode };

export function validateDemoSearch(search: Record<string, unknown>): DemoSearch {
  const raw = typeof search["demo"] === "string" ? search["demo"] : "normal";
  return (DEMO_MODES as string[]).includes(raw) && raw !== "normal"
    ? { demo: raw as DemoMode }
    : {};
}

/**
 * Shared Events list screen. Rendered by both /events and /events/results so
 * Maze can distinguish an unfiltered browse from a filtered result set.
 */
export function EventsRouteScreen({
  demo = "normal",
  to,
}: {
  demo?: DemoMode;
  to: "/events" | "/events/results";
}) {
  const navigate = useNavigate();
  const store = useEventorias();

  return (
    <EventsScreen
      events={store.visibleEvents}
      query={store.query}
      onQueryChange={store.setQuery}
      activeCategory={store.chip}
      onCategoryChange={store.setChip}
      filterCount={
        (store.filters.date !== "any" ? 1 : 0) +
        store.filters.categories.length +
        (store.filters.language !== "any" ? 1 : 0) +
        (store.filters.budget !== "any" ? 1 : 0)
      }
      onOpenFilters={() => void navigate({ to: "/filters" })}
      onSelectEvent={(event) =>
        void navigate({ to: "/events/$eventId", params: { eventId: event.id } })
      }
      demoMode={demo}
      onRetry={() => void navigate({ to, search: {}, replace: true })}
      onResetFilters={() => {
        store.resetSearch();
        void navigate({ to: "/events", search: {}, replace: true });
      }}
    />
  );
}
