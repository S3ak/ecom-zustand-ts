import { Product } from "products";
import { ActionFunctionArgs, ParamParseKey, Params } from "react-router-dom";

const PathNames = {
  productDetail: "/products/:productId",
} as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof PathNames.productDetail>>;
}

export async function loader({ params }: Args): Promise<{ product: Product }> {
  const product = await fetch(
    `https://dummyjson.com/products/${params.productId}`
  )
    .then((response) => response.json())
    .then((data) => data);

  return { product };
}
