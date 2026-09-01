import { createFileRoute } from "@tanstack/react-router";
import { EventoriasApp } from "@/features/eventorias/App";

const title = "Eventorias — English-friendly events in Paris";
const description =
  "Discover concerts, museum nights, tours and food experiences in Paris in English, and publish your own events as a local organizer.";

export const Route = createFileRoute("/")({
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
  return <EventoriasApp />;
}
