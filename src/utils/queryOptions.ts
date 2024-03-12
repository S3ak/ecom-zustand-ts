import { queryOptions, keepPreviousData } from "@tanstack/react-query";
import { fetchProducts } from "./products";

export const productsQueryOptions = (page: string) =>
  queryOptions({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(),
    placeholderData: keepPreviousData,
  });
