import { Product } from "products";
import { ActionFunctionArgs, ParamParseKey, Params } from "react-router-dom";

const pathNames = {
  productDetail: "/products/:productId",
} as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof pathNames.productDetail>>;
}

export async function loader({ params }: Args): Promise<{ product: Product }> {
  const product = await fetch(
    `https://dummyjson.com/products/${params.productId}`
  )
    .then((res) => res.json())
    .then((data) => data);

  return { product };
}
