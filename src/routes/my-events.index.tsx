import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MyEventsScreen } from "@/features/eventorias/screens/MyEventsScreen";
import { useEventorias } from "@/features/eventorias/store";

const title = "My Events — Eventorias";
const description = "The Paris events you have published as a local organizer.";

export const Route = createFileRoute("/my-events/")({
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
  component: MyEventsRoute,
});

function MyEventsRoute() {
  const navigate = useNavigate();
  const store = useEventorias();

  return (
    <MyEventsScreen
      events={store.myEvents}
      onBack={() => void navigate({ to: "/profile" })}
      onCreate={() => void navigate({ to: "/my-events/create" })}
      onEdit={(event) =>
        void navigate({ to: "/my-events/$eventId/edit", params: { eventId: event.id } })
      }
      onCancelEvent={store.cancelEvent}
    />
  );
}
