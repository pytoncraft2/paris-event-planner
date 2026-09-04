import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  EventsRouteScreen,
  validateDemoSearch,
  type DemoSearch,
} from "@/features/eventorias/EventsRouteScreen";
import { useEventorias } from "@/features/eventorias/store";

const title = "Eventorias — English-friendly events in Paris";
const description =
  "Discover concerts, museum nights, tours and food experiences in Paris in English, and publish your own events as a local organizer.";

type EventsSearch = DemoSearch & { reset?: true };

export const Route = createFileRoute("/events/")({
  validateSearch: (search: Record<string, unknown>): EventsSearch => {
    const reset =
      search["reset"] === "1" || search["reset"] === 1 || search["reset"] === true;
    return reset ? { reset: true } : validateDemoSearch(search);
  },
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
  component: EventsRoute,
});

function EventsRoute() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const store = useEventorias();
  const reset = search.reset === true;

  // Usability-test reset: clean slate, then drop the flag from the URL.
  useEffect(() => {
    if (!reset) return;
    store.resetAll();
    void navigate({ to: "/events", search: {}, replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  return <EventsRouteScreen to="/events" {...(search.demo ? { demo: search.demo } : {})} />;
}
