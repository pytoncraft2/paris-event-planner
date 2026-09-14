import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  EventFormScreen,
  formStepFromSearch,
  formStepSearch,
} from "@/features/eventorias/screens/EventFormScreen";
import { useEventorias } from "@/features/eventorias/store";

const title = "Create an event — Eventorias";
const description = "Publish a new English-friendly event for travellers in Paris.";

export const Route = createFileRoute("/my-events/create")({
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
  component: CreateEventRoute,
});

function CreateEventRoute() {
  const navigate = useNavigate();
  const store = useEventorias();
  const step = formStepFromSearch(Route.useSearch());

  return (
    <EventFormScreen
      editing={null}
      step={step}
      onBack={() => void navigate({ to: "/my-events" })}
      onContinue={() =>
        void navigate({
          to: "/my-events/create",
          search: formStepSearch(step === 1 ? 2 : 3),
        })
      }
      onSubmit={(event) => {
        store.upsertEvent(event);
        store.setLastPublish({ event, isEdit: false });
        void navigate({ to: "/publish/success" });
      }}
    />
  );
}
