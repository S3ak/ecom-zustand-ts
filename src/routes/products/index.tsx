import { useState } from "react";
import { ResponseProductData } from "products";
import Pagination from "@components/pagination";
import { Link, useLoaderData, useNavigation, Form } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";

export default function Products() {
  const [page, setPage] = useState(0);
  const { data, q } = useLoaderData() as {
    data: ResponseProductData;
    q: string;
  };
  const { state } = useNavigation();

  const additemToCart = useCartStore((state) => state.addItem);

  const { products, limit, skip, total } = data;

  const isPending = state === "loading" || state === "submitting";

  const clearSearch = () => {
    document.getElementById("q")?.setAttribute("value", "");
    const searchForm = document.getElementById(
      "search-form"
    ) as HTMLFormElement;
    searchForm.reset();
    searchForm.submit();
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-8 mx-auto sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
        <section className="flex w-full py-2">
          <Form
            className="w-full p-0 m-0"
            role="search"
            id="search-form"
            name="search-form"
          >
            <div className="space-y-12">
              <div className="pb-12 border-b border-gray-900/10">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="search"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Search
                    </label>

                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="search"
                          name="q"
                          id="q"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Search"
                          aria-label="Search"
                          defaultValue={q}
                        />
                        <input
                          type="text"
                          name="skip"
                          id="skip"
                          defaultValue={skip}
                          hidden
                        />
                        <div id="search-spinner" aria-hidden hidden={true} />{" "}
                        <div className="sr-only" aria-live="polite"></div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <button
                          type="reset"
                          onClick={clearSearch}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          aria-label="Reset"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </section>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          -10% extra on everything at the end of the season
        </h2>

        <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="relative group">
              <div
                className="w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80"
                onClick={() => additemToCart(product)}
              >
                <img
                  src={product.images[0]}
                  alt={product.description}
                  className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                />
              </div>
              <div className="flex justify-between mt-4">
                <div>
                  <h3 className="text-sm text-gray-700">
                    {/* FIXME: reduce size of span */}
                    <Link to={`/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
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
              if (!isPending) {
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
