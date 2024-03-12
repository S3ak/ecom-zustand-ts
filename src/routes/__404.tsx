import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__404")({
  component: () => (
    <>
      <h1>404</h1>
      <p>Page not found</p>
    </>
  ),
});
