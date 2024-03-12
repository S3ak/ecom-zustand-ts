import { ResponseProductData } from "products";

import {
  ActionFunctionArgs,
  // ParamParseKey,
  // Params
} from "react-router-dom";

// const PathNames = {
//   products: "/products",
// } as const;

interface Args extends ActionFunctionArgs {
  request: Request;
  // params: Params<ParamParseKey<typeof PathNames.products>>;
}

export async function loader({ request }: Args) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const skip = url.searchParams.get("skip");
  let query = `https://dummyjson.com/products?skip=${skip || 0}`;

  if (q) query = `https://dummyjson.com/products/search?q=${q}`;

  const data: ResponseProductData = await fetch(query)
    .then((response) => response.json())
    .then((data) => data);

  if (!data) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return { data, q };
}
