import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  EventFormScreen,
  formStepFromSearch,
  formStepSearch,
} from "@/features/eventorias/screens/EventFormScreen";
import { useEventorias } from "@/features/eventorias/store";

const title = "Edit event — Eventorias";
const description = "Update the details of an event you published in Paris.";

export const Route = createFileRoute("/my-events/$eventId/edit")({
  validateSearch: (search: Record<string, unknown>) => formStepSearch(formStepFromSearch(search)),
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
  const step = formStepFromSearch(Route.useSearch());

  return (
    <EventFormScreen
      editing={editing}
      step={step}
      onBack={() => void navigate({ to: "/my-events" })}
      onContinue={() =>
        void navigate({
          to: "/my-events/$eventId/edit",
          params: { eventId },
          search: formStepSearch(step === 1 ? 2 : 3),
        })
      }
      onSubmit={(event) => {
        store.upsertEvent(event);
        store.setLastPublish({ event, isEdit: true });
        void navigate({ to: "/publish/success" });
      }}
    />
  );
}
