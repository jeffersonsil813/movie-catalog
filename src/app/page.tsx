"use client";
import AppPagination from "@/components/appPagination";
import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import Text from "@/components/text";
import { useMovies } from "@/hooks/useMovies";
import { Movie } from "@/models/movies";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const currentSearch = searchParams.get("search") ?? "";
  const [search, setSearch] = useState(currentSearch);

  const { data, isLoading } = useMovies(page);

  const movies = data?.results ?? [];
  const totalPages = Math.min(data?.total_pages ?? 1, 500);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      router.push(`/?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, router]);

  const filteredMovies = useMemo(() => {
    if (!currentSearch.trim()) return movies;
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(currentSearch.toLowerCase()),
    );
  }, [movies, currentSearch]);

  useEffect(() => {
    if (!searchParams.get("page")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      router.replace(`/?${params.toString()}`);
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/?${params.toString()}`);
  };

  const handleSearchChange = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const newSearch = e.target.value;
    setSearch(newSearch.trim());
  };

  return (
    <main>
      <SearchBar defaultValue={search} onChange={handleSearchChange} />
      {filteredMovies.length === 0 && !isLoading && (
        <Text
          variant="body-md"
          as="h3"
          className="text-gray-300 text-center mt-10"
        >
          No results found.
        </Text>
      )}

      <div className="flex flex-wrap gap-5 pt-5 pb-15 justify-around">
        {isLoading
          ? Array.from({ length: 7 }).map((_, index) => (
              <MovieCard key={index} isLoading movie={{} as Movie} />
            ))
          : filteredMovies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} priority={index < 4} />
            ))}
      </div>

      <AppPagination
        currentPage={page}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </main>
  );
}
