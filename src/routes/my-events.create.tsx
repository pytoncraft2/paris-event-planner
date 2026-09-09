import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { EventFormScreen } from "@/features/eventorias/screens/EventFormScreen";
import { useEventorias } from "@/features/eventorias/store";

const title = "Create an event — Eventorias";
const description = "Publish a new English-friendly event for travellers in Paris.";

export const Route = createFileRoute("/my-events/create")({
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
  component: CreateEventRoute,
});

function CreateEventRoute() {
  const navigate = useNavigate();
  const store = useEventorias();

  return (
    <EventFormScreen
      editing={null}
      onBack={() => void navigate({ to: "/my-events" })}
      onSubmit={(event) => {
        store.upsertEvent(event);
        store.setLastPublish({ event, isEdit: false });
        void navigate({ to: "/publish/success" });
      }}
    />
  );
}
