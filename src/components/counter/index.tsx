import { useState } from "react";

import useAPI from "@/hooks/useAPI";

function useCounter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(() => count + 1);
  }

  function decrement() {
    setCount((prevCount) => Math.max(prevCount - 1, 0));
  }

  return { count, increment, decrement };
}

export default function Counter() {
  const { decrement, count, increment } = useCounter();

  const { data, isLoading } = useAPI(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  const { data: productsData, isLoading: productsIsLoading } = useAPI(
    "https://dummyjson.com/products"
  );

  console.log("data >>>", data);
  console.log("isLoading >>>", isLoading);

  console.log("DUMMY data >>>", productsData);
  console.log("DUMMY  isLoading >>>", productsIsLoading);

  return (
    <section>
      Count: {count}
      <br />
      <button
        onClick={increment}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
      >
        Increment
      </button>
      <br />
      <button
        onClick={() => decrement()}
        className="px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700"
      >
        Decrement
      </button>
    </section>
  );
}
