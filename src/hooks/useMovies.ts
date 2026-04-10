import { fetchPopularMovies } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";

export function useMovies(page: number) {
  return useQuery({
    queryKey: ["movies", "popular", page],
    queryFn: () => fetchPopularMovies(page),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
}
