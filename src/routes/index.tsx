import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { EventoriasApp } from "@/features/eventorias/App";
import type { DemoMode } from "@/features/eventorias/screens/EventsScreen";

const title = "Eventorias — English-friendly events in Paris";
const description =
  "Discover concerts, museum nights, tours and food experiences in Paris in English, and publish your own events as a local organizer.";

const DEMO_MODES: DemoMode[] = ["normal", "loading", "empty", "error"];

type IndexSearch = { demo?: DemoMode; reset?: undefined };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): IndexSearch => {
    const raw = typeof search["demo"] === "string" ? (search["demo"] as string) : "normal";
    const demo = (DEMO_MODES as string[]).includes(raw) ? (raw as DemoMode) : "normal";
    const reset =
      search["reset"] === "1" || search["reset"] === 1 || search["reset"] === true;
    return reset ? { demo: "normal" } : demo === "normal" ? {} : { demo };
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
  component: Index,
});

function Index() {
  const search = Route.useSearch();
  const demo: DemoMode = search.demo ?? "normal";
  const reset =
    typeof window !== "undefined" && new URLSearchParams(window.location.search).has("reset");
  const navigate = useNavigate();

  // A usability-test reset starts from a clean slate, then the flag is dropped
  // from the URL so a refresh behaves predictably.
  useEffect(() => {
    if (!reset) return;
    void navigate({ to: "/", search: {}, replace: true });
  }, [reset, navigate]);

  return <EventoriasApp key={reset ? "reset" : "default"} initialDemoMode={reset ? "normal" : demo} />;
}
