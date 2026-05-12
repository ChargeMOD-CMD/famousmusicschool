// Client-only SPA entry used ONLY by the GitHub Pages build
// (vite.spa.config.ts). The Lovable editor / SSR build uses src/start.ts
// + src/server.ts via TanStack Start and never touches this file.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

import { routeTree } from "./routeTree.gen";
import "./styles.css";

const queryClient = new QueryClient();

// import.meta.env.BASE_URL is "/famousmusicschool/" in the SPA build.
// Strip the trailing slash for TanStack Router's basepath.
const basepath = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

const router = createRouter({
  routeTree,
  context: { queryClient },
  basepath,
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
