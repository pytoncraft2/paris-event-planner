import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PublishSuccessScreen } from "@/features/eventorias/screens/SuccessScreens";
import { EmptyState } from "@/features/eventorias/components/States";
import { ScreenBody } from "@/features/eventorias/components/Shell";
import { useEventorias } from "@/features/eventorias/store";

const title = "Event published — Eventorias";
const description = "Your Paris event is now visible to travellers.";

type PublishSearch = { event?: string; mode?: "create" | "edit" };

export const Route = createFileRoute("/publish/success")({
  validateSearch: (search: Record<string, unknown>): PublishSearch => {
    const out: PublishSearch = {};
    if (typeof search["event"] === "string") out.event = search["event"];
    if (search["mode"] === "edit" || search["mode"] === "create")
      out.mode = search["mode"];
    return out;
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
  component: PublishSuccessRoute,
});

function PublishSuccessRoute() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const store = useEventorias();
  const event = search.event ? store.findEvent(search.event) : undefined;
  const toMyEvents = () => void navigate({ to: "/my-events" });

  if (!event) {
    return (
      <ScreenBody className="px-4 py-6">
        <EmptyState
          title="Nothing to show"
          description="This event is no longer available."
          actionLabel="View My Events"
          onAction={toMyEvents}
        />
      </ScreenBody>
    );
  }

  return (
    <PublishSuccessScreen
      event={event}
      isEdit={search.mode === "edit"}
      onViewMyEvents={toMyEvents}
    />
  );
}
