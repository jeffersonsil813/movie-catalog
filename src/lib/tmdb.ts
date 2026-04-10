import { MoviesResponse } from "@/models/movies";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export async function fetchPopularMovies(page = 1): Promise<MoviesResponse> {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error("Error searching for movies.");
  return res.json();
}
