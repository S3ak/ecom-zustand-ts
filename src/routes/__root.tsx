import Cart from "@/components/cart";
import Nav from "@/components/nav";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="header">
        <Nav />
      </header>

      <section className="main">
        <main className="main_main">
          <Outlet />
        </main>

        <footer className="main_footer">copy write</footer>
      </section>
      <Cart />

      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});
