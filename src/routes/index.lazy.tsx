import { createLazyFileRoute } from "@tanstack/react-router";

import Hero from "@/components/hero";
import Products from "@/components/products";
import Promo from "@/components/promo";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Products />
      <Promo />
    </>
  );
}
