import { useState } from "react";

function useCounter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(() => count + 1);
  }

  function decrement() {
    setCount((prevCount) => prevCount - 1);
  }

  return { count, increment, decrement };
}

export default function Counter() {
  const { decrement, count, increment } = useCounter();

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
