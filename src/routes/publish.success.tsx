import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PublishSuccessScreen } from "@/features/eventorias/screens/SuccessScreens";
import { useEventorias } from "@/features/eventorias/store";

const title = "Event published — Eventorias";
const description = "Your Paris event is now visible to travellers.";

export const Route = createFileRoute("/publish/success")({
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
  component: PublishSuccessRoute,
});

function PublishSuccessRoute() {
  const navigate = useNavigate();
  const store = useEventorias();
  const toMyEvents = () => void navigate({ to: "/my-events" });

  return (
    <PublishSuccessScreen
      event={store.lastPublish?.event ?? null}
      isEdit={store.lastPublish?.isEdit ?? false}
      onViewMyEvents={toMyEvents}
    />
  );
}
