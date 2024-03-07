import { useCallback, useEffect, useState } from "react";

type Products = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

const useUrl = (url: string) => {
    const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
        fetch("https://api.github.com/repos/TanStack/query").then((res) =>
        res.json()
        ),
    });

  return { data, loading: isLoading, error };
};

export default useUrl;
