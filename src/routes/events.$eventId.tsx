import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { EventDetailsScreen } from "@/features/eventorias/screens/EventDetailsScreen";
import { EmptyState } from "@/features/eventorias/components/States";
import { ScreenBody, ScreenHeader } from "@/features/eventorias/components/Shell";
import { useEventorias } from "@/features/eventorias/store";

export const Route = createFileRoute("/events/$eventId")({
  head: () => ({
    meta: [
      { title: "Event details — Eventorias" },
      {
        name: "description",
        content: "Date, time, language, price, venue and description for this Paris event.",
      },
      { property: "og:title", content: "Event details — Eventorias" },
      {
        property: "og:description",
        content: "Date, time, language, price, venue and description for this Paris event.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventDetailsRoute,
});

function EventDetailsRoute() {
  const { eventId } = Route.useParams();
  const navigate = useNavigate();
  const store = useEventorias();
  const event = store.findEvent(eventId);

  if (!event) {
    return (
      <>
        <ScreenHeader title="Event" onBack={() => void navigate({ to: "/events" })} />
        <ScreenBody className="px-4 py-6">
          <EmptyState
            title="Event not available"
            description="This event is no longer listed."
            actionLabel="Back to Events"
            onAction={() => void navigate({ to: "/events" })}
          />
        </ScreenBody>
      </>
    );
  }

  return (
    <EventDetailsScreen
      event={event}
      onBack={() => void navigate({ to: "/events" })}
      onAddToCalendar={() => {
        if (store.signedIn) {
          void navigate({ to: "/calendar/success", search: { event: event.id } });
        } else {
          void navigate({
            to: "/signin",
            search: { returnTo: `/events/${event.id}`, event: event.id },
          });
        }
      }}
    />
  );
}
