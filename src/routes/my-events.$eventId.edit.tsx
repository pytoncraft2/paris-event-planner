import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { EventFormScreen } from "@/features/eventorias/screens/EventFormScreen";
import { useEventorias } from "@/features/eventorias/store";

const title = "Edit event — Eventorias";
const description = "Update the details of an event you published in Paris.";

export const Route = createFileRoute("/my-events/$eventId/edit")({
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
  component: EditEventRoute,
});

function EditEventRoute() {
  const { eventId } = Route.useParams();
  const navigate = useNavigate();
  const store = useEventorias();
  const editing = store.findEvent(eventId) ?? null;

  return (
    <EventFormScreen
      editing={editing}
      onBack={() => void navigate({ to: "/my-events" })}
      onSubmit={(event) => {
        store.upsertEvent(event);
        store.setLastPublish({ event, isEdit: true });
        void navigate({ to: "/publish/success" });
      }}
    />
  );
}
