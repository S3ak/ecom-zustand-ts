declare module "products" {
  export type Product = {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
    quantity: number;
  };

  export type Products = {
    products: Product[];
  };

  export type ResponseProductData = {
    limit: number;
    products: Product[];
    skip: number;
    total: number;
  };
}
