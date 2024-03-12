import { useCartStore } from "@/store/useCartStore";
import Pagination from "@components/pagination";
import { Link } from "@tanstack/react-router";
import { Product } from "products";
import Select from "../inputGroup/select";
import Input from "../inputGroup/input";

type TProps = {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
};

export default function Products({ products, limit, skip, total }: TProps) {
  const additemToCart = useCartStore((state) => state.addItem);

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          -10% extra on everything at the end of the season
        </h2>

        <Input label="search" id="q" onChange={} />
        <Select label="catergory" id="catergory" options={["1", "2", "3"]} />

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
                    <Link
                      to={`/products/$productId`}
                      params={{
                        productId: product.id.toString(),
                      }}
                    >
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
            currentPage={skip + 1}
            count={limit + skip}
            totalResults={total}
            limit={limit}
            skip={skip}
          />
        </section>
      </div>
    </div>
  );
}
