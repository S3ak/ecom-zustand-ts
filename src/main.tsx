import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "@/routes/root.tsx";
import ErrorPage from "@/routes/404/index.tsx";
import HomePage from "@/routes/home";
import "./index.css";
import ProductDetails from "./routes/products-details";
import { loader as productLoader } from "./routes/products-details/actions";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        // This is the default route which will be rendered when the URL is `/`
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <div>About Page</div>,
      },
      {
        path: "contact",
        element: <div>Contact Page</div>,
      },
      {
        path: "products/:productId",
        loader: productLoader,
        element: <ProductDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
