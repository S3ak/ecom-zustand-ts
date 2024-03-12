import { createFileRoute } from "@tanstack/react-router";
import { Product } from "products";

import ProductDetails from "@/components/product";

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetailsPage,
  loader: async ({ params: { productId } }) => {
    return fetchProduct(productId);
  },
});

function ProductDetailsPage() {
  const product = Route.useLoaderData();
  return <ProductDetails dataProduct={product} />;
}

function fetchProduct(productId: string) {
  return fetch(`https://dummyjson.com/products/${productId}`)
    .then((res) => res.json())
    .then((data) => data as Product);
}
