import { createFileRoute } from "@tanstack/react-router";
import {
  EventsRouteScreen,
  validateDemoSearch,
  type DemoSearch,
} from "@/features/eventorias/EventsRouteScreen";

const title = "Filtered events in Paris — Eventorias";
const description =
  "Your filtered selection of English-friendly events happening in Paris right now.";

export const Route = createFileRoute("/events/results")({
  validateSearch: (search: Record<string, unknown>): DemoSearch =>
    validateDemoSearch(search),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResultsRoute,
});

function ResultsRoute() {
  const search = Route.useSearch();
  return (
    <EventsRouteScreen to="/events/results" {...(search.demo ? { demo: search.demo } : {})} />
  );
}
