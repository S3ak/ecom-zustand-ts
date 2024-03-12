import Cart from "@/components/cart";
import Nav from "@/components/nav";

import "../../App.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app">
      <header className="header">
        <Nav />
      </header>

      <section className="main">
        <main>{children}</main>
        <footer>copy write</footer>
      </section>
      <Cart />
    </div>
  );
}
