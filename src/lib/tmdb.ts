const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchPopularMovies(page = 1): Promise<MoviesResponse> {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error("Error searching for movies.");
  return res.json();
}
