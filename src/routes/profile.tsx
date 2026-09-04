import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProfileScreen } from "@/features/eventorias/screens/ProfileScreen";
import { useEventorias } from "@/features/eventorias/store";

const title = "Your profile — Eventorias";
const description = "Manage your notifications and the Paris events you publish.";

export const Route = createFileRoute("/profile")({
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
  component: ProfileRoute,
});

function ProfileRoute() {
  const navigate = useNavigate();
  const store = useEventorias();

  return (
    <ProfileScreen
      notifications={store.notifications}
      onNotificationsChange={store.setNotifications}
      onOpenMyEvents={() => void navigate({ to: "/my-events" })}
      myEventsCount={store.myEvents.length}
    />
  );
}
