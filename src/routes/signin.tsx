import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SignInGateScreen } from "@/features/eventorias/screens/SignInGateScreen";
import { useEventorias } from "@/features/eventorias/store";

const title = "Sign in — Eventorias";
const description = "Sign in to save Paris events to your Eventorias calendar.";

type SignInSearch = { returnTo?: string; event?: string };

export const Route = createFileRoute("/signin")({
  validateSearch: (search: Record<string, unknown>): SignInSearch => {
    const out: SignInSearch = {};
    if (typeof search["returnTo"] === "string") out.returnTo = search["returnTo"];
    if (typeof search["event"] === "string") out.event = search["event"];
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
  component: SignInRoute,
});

function SignInRoute() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const store = useEventorias();

  const eventId = search.event ?? search.returnTo?.split("/").pop();

  const back = () => {
    if (eventId) void navigate({ to: "/events/$eventId", params: { eventId } });
    else void navigate({ to: "/events" });
  };

  return (
    <SignInGateScreen
      onBack={back}
      onSignIn={() => {
        store.setSignedIn(true);
        const event = eventId ? store.findEvent(eventId) : undefined;
        if (event) {
          store.addToCalendar(event);
          void navigate({ to: "/calendar/success" });
        } else {
          void navigate({ to: "/events" });
        }
      }}
      onNotNow={back}
    />
  );
}
