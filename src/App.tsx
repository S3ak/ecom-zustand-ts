import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Products from "./components/products";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <header>
          <title>Ecomm Example</title>
        </header>
        <main>
          <h1>Home Page</h1>
          <article>
            <p>This website showcases how to use zustand with typescript</p>
          </article>

          <Products />
        </main>
        <footer>copy write</footer>
      </div>
    </QueryClientProvider>
  );
}
