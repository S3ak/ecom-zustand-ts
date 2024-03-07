import { useQuery } from "@tanstack/react-query";

// FIXME: This is a placeholder for the actual type of the response data
const useUrl = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/TanStack/query").then((res) =>
        res.json()
      ),
  });

  return { data, isPending, error };
};

export default useUrl;
