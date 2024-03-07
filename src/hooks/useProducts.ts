import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ResponseProductData } from "products";

const useProducts = () => {
  const [page, setPage] = useState(0);

  const fetchProducts = (page = 0) =>
    fetch(`https://dummyjson.com/products?skip=${page}`).then((res) =>
      res.json()
    );

  const { isPending, error, data, isPlaceholderData } =
    useQuery<ResponseProductData>({
      queryKey: ["products", page],
      queryFn: () => fetchProducts(page),
      placeholderData: keepPreviousData,
    });

  return {
    isPending,
    error,
    data,
    isPlaceholderData,
    page,
    setPage,
  };
};

export default useProducts;
