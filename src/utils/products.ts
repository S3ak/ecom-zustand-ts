import { ResponseProductData } from "products";

export const fetchProducts = (page = 0): Promise<ResponseProductData> =>
  fetch(`https://dummyjson.com/products?skip=${page}`).then((res) =>
    res.json()
  );
