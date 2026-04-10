import { MoviesResponse } from "@/models/movies";
import { useQuery } from "@tanstack/react-query";

export function useMovies(page: number) {
  return useQuery<MoviesResponse>({
    queryKey: ["movies", "popular", page],
    queryFn: async () => {
      const response = await fetch(`/api/movies?page=${page}`);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      return response.json();
    },
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
}
