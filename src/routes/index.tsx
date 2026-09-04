import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ search }) => {
    throw redirect({ to: "/events", search: search as Record<string, unknown> });
  },
  validateSearch: (search: Record<string, unknown>) => search,
});
