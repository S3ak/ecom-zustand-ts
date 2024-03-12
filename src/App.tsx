import Products from "@components/products";
import Cart from "@components/cart";
import Nav from "@components/nav";
import Hero from "@components/hero";
import Promo from "@components/promo";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <Nav />
      </header>

      <section className="main">
        <main>
          <Hero />
          <Products />
          <Promo />
        </main>

        <footer>copy write</footer>
      </section>
      <Cart />
    </div>
  );
}
