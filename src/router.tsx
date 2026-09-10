import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Disabled: this app's scroll lives in an internal container (ScreenBody),
    // and restoration made new screens open mid-scroll. ScreenBody remounts per
    // route (key=pathname), so every screen starts at the top.
    defaultPreloadStaleTime: 0,
  });

  return router;
};
