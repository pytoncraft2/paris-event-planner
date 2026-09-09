import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CalendarSuccessScreen } from "@/features/eventorias/screens/SuccessScreens";
import { useEventorias } from "@/features/eventorias/store";

const title = "Added to your calendar — Eventorias";
const description = "This Paris event has been added to your Eventorias calendar.";

export const Route = createFileRoute("/calendar/success")({
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
  const navigate = useNavigate();
  const store = useEventorias();
  const toEvents = () => void navigate({ to: "/events" });

  return (
    <CalendarSuccessScreen
      event={store.lastCalendarEvent}
      onDone={toEvents}
      onBackToEvents={toEvents}
    />
  );
}
