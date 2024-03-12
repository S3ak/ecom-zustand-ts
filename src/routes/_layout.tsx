import Cart from "@/components/cart";
import Nav from "@/components/nav";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
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
    </>
  );
}
