import "../../App.css";

import Cart from "@components/cart";
import Nav from "@components/nav";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="app">
      <header className="header">
        <Nav />
      </header>

      <section className="main">
        <main>{children}</main>

        <footer>©2023 Monde Sineke</footer>
      </section>
      <Cart />
    </div>
  );
}
