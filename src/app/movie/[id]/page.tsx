"use client";
import MovieHero from "@/components/movieHero";
import Text from "@/components/text";
import { useMovie } from "@/hooks/useMovie";
import { Movie } from "@/models/movies";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const MovieDetails = ({ params }: Props) => {
  const { id } = use(params);
  const router = useRouter();
  const { data: movie, isLoading } = useMovie(id);

  return (
    <main className="space-y-10">
      <button
        onClick={() => router.back()}
        className="flex flex-nowrap gap-1 items-center ml-3 group cursor-pointer"
      >
        <ChevronLeft className="text-gray-100 group-hover:text-yellow-light transition group-hover:animate-bounce-x -mt-1" />
        <Text
          variant="body-md"
          className="transition border-b border-transparent group-hover:border-yellow group-hover:text-yellow-light"
        >
          Back
        </Text>
      </button>

      {!movie && !isLoading ? (
        <Text
          variant="body-md"
          as="h3"
          className="text-gray-300 text-center"
        >
          No results found.
        </Text>
      ) : (
        <MovieHero isLoading={isLoading} movie={movie ?? ({} as Movie)} />
      )}
    </main>
  );
};

export default MovieDetails;
