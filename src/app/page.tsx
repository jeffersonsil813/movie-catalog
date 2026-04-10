"use client";
import AppPagination from "@/components/appPagination";
import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import Text from "@/components/text";
import { useMovies } from "@/hooks/useMovies";
import { Movie } from "@/lib/tmdb";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, isLoading } = useMovies(page);

  const movies = data?.results ?? [];
  const totalPages = Math.min(data?.total_pages ?? 1, 500);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredMovies = useMemo(() => {
    if (!debouncedSearch.trim()) return movies;
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [movies, debouncedSearch]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSearchChange = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const newSearch = e.target.value;
    setSearch(newSearch.trim());
  };

  return (
    <main>
      <SearchBar onChange={handleSearchChange} />
      {filteredMovies.length === 0 ? (
        <Text variant="body-md" as="h3" className="text-gray-300 text-center mt-10">
          No results found.
        </Text>
      ) : (
        <>
          <div className="flex flex-wrap gap-5 pt-5 pb-15 justify-around">
            {isLoading
              ? Array.from({ length: 7 }).map((_, index) => (
                  <MovieCard key={index} isLoading movie={{} as Movie} />
                ))
              : filteredMovies.map((movie, index) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    priority={index < 4}
                  />
                ))}
          </div>

          <AppPagination
            currentPage={page}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </>
      )}
    </main>
  );
}
