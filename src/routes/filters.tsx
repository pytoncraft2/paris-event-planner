import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FiltersScreen } from "@/features/eventorias/screens/FiltersScreen";
import { matches, useEventorias } from "@/features/eventorias/store";

const title = "Filter Paris events — Eventorias";
const description = "Filter events by date, category, language and budget.";

export const Route = createFileRoute("/filters")({
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
  component: FiltersRoute,
});

function FiltersRoute() {
  const navigate = useNavigate();
  const store = useEventorias();

  return (
    <FiltersScreen
      initial={store.filters}
      resultCount={(f) =>
        store.allEvents.filter((e) => matches(e, f, store.query, store.chip)).length
      }
      onClose={() => void navigate({ to: "/events" })}
      onApply={(f) => {
        store.setFilters(f);
        void navigate({ to: "/events/results" });
      }}
    />
  );
}
