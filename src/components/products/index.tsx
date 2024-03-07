import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { ResponseProductData } from "products";
import { useCartStore } from "@/store/useCartStore";
import Pagination from "@components/pagination";

export default function Products() {
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

  const additemToCart = useCartStore((state) => state.addItem);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { products, limit, skip, total } = data;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          -10% extra on everything at the end of the season
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div
                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
                onClick={() => additemToCart(product)}
              >
                <img
                  src={product.images[0]}
                  alt={product.description}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    {/* FIXME: reduce size of span */}
                    {/* <a href={`/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </a> */}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>

                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <section>
          <Pagination
            onPrevious={() =>
              setPage((prevPage) => Math.max(prevPage - limit, 0))
            }
            onNext={() => {
              if (!isPlaceholderData) {
                setPage((prevPage) => prevPage + limit);
              }
            }}
            currentPage={skip + 1}
            count={limit + skip}
            totalResults={total}
          />
        </section>
      </div>
    </div>
  );
}
