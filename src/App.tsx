import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Products from "@components/products";
import Cart from "@components/cart";
import Nav from "@components/nav";
import Hero from "@components/hero";
import Promo from "@components/promo";
import ContactForm from "./components/contact-form";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="header">
          <Nav />
        </header>

        <section className="main">
          <main>
            <ContactForm />
          </main>

          <footer>copy write</footer>
        </section>
      </div>
      <Cart />
    </QueryClientProvider>
  );
}
