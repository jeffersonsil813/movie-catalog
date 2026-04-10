"use client";
import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import { useMovies } from "@/hooks/useMovies";
import { Movie } from "@/lib/tmdb";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMovies(page);

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;

  return (
    <main>
      <SearchBar />
      <div className="flex flex-wrap gap-5 py-5 justify-around">
        {isLoading
          ? Array.from({ length: 7 }).map((_, index) => (
              <MovieCard key={index} isLoading movie={{} as Movie} />
            ))
          : movies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} priority={index < 4} />
            ))}
      </div>
    </main>
  );
}
