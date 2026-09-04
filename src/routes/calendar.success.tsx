import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CalendarSuccessScreen } from "@/features/eventorias/screens/SuccessScreens";
import { EmptyState } from "@/features/eventorias/components/States";
import { ScreenBody } from "@/features/eventorias/components/Shell";
import { useEventorias } from "@/features/eventorias/store";

const title = "Added to your calendar — Eventorias";
const description = "This Paris event has been added to your Eventorias calendar.";

export const Route = createFileRoute("/calendar/success")({
  validateSearch: (search: Record<string, unknown>): { event?: string } =>
    typeof search["event"] === "string" ? { event: search["event"] } : {},
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
  component: CalendarSuccessRoute,
});

function CalendarSuccessRoute() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const store = useEventorias();
  const event = search.event ? store.findEvent(search.event) : undefined;
  const toEvents = () => void navigate({ to: "/events" });

  if (!event) {
    return (
      <ScreenBody className="px-4 py-6">
        <EmptyState
          title="Nothing to show"
          description="This calendar entry is no longer available."
          actionLabel="Back to Events"
          onAction={toEvents}
        />
      </ScreenBody>
    );
  }

  return (
    <CalendarSuccessScreen event={event} onDone={toEvents} onBackToEvents={toEvents} />
  );
}
