import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import stageBg from "@/assets/stage-bg.jpg";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RhythmCursor } from "@/components/RhythmCursor";
import { AIMentorWidget } from "@/components/AIMentorWidget";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="font-bebas text-[120px] leading-none text-gradient-aurora">404</div>
        <h2 className="mt-2 font-display text-xl">This track doesn't exist</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're searching for is off-key. Let's find your rhythm.</p>
        <Link to="/" className="mt-6 inline-flex items-center rounded-full bg-gradient-aurora px-5 py-2 text-sm font-semibold text-[oklch(0.13_0.04_270)]">
          Back to Stage
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-2xl">A note went out of tune</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-5 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-gradient-aurora px-5 py-2 text-sm font-semibold text-[oklch(0.13_0.04_270)]">Try again</button>
          <a href="/" className="rounded-full glass px-5 py-2 text-sm">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Famous Music School — Feel The Rhythm. Become The Music." },
      { name: "description", content: "A futuristic music academy in Chennai nurturing creativity, performance, and artistic excellence — instruments, vocals, production, and AI-guided learning." },
      { property: "og:title", content: "The Famous Music School" },
      { property: "og:description", content: "Feel The Rhythm. Become The Music. Chennai's immersive next-generation music academy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <RhythmCursor />
      <div className="relative min-h-screen grid-bg">
        <div
          className="pointer-events-none fixed inset-0 -z-20 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${stageBg})` }}
        />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-stage opacity-80" />
        <Nav />
        <Outlet />
        <Footer />
        <AIMentorWidget />
      </div>
    </QueryClientProvider>
  );
}
