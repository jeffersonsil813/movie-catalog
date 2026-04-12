import { Movie } from "@/models/movies";
import { useQuery } from "@tanstack/react-query";

export function useMovie(id: string) {
  return useQuery<Movie>({
    queryKey: ["movie", id],
    queryFn: async () => {
      const response = await fetch(`/api/movies/${id}`);
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json();
    },
  });
}
