import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { ResponseProductData } from "products";
import Hero from "@/components/hero";
import Products from "@/components/products";
import Promo from "@/components/promo";

const productsSearchSchema = z.object({
  skip: z.number().catch(0),
});

// type ProductsSearch = z.infer<typeof productsSearchSchema>;

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: productsSearchSchema,
  loaderDeps: ({ search: { skip } }) => ({ skip }),
  loader: async ({ deps: { skip } }) => fetchProducts(skip),
});

function Index() {
  const { products, total, skip, limit } = Route.useLoaderData();

  return (
    <>
      <Hero />
      <Products products={products} total={total} skip={skip} limit={limit} />
      <Promo />
    </>
  );
}

function fetchProducts(skip: number = 0) {
  return fetch(`https://dummyjson.com/products?skip=${skip}`)
    .then((res) => res.json())
    .then((data) => data as ResponseProductData);
}
