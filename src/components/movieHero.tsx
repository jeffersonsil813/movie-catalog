import { POSTER_BASE_URL } from "@/lib/tmdb";
import { Movie } from "@/models/movies";
import { cva, cx } from "class-variance-authority";
import { Star } from "lucide-react";
import Image from "next/image";
import Skeleton from "./skeleton";
import Text from "./text";

interface MovieHeroProps {
  isLoading?: boolean;
  movie: Movie;
}

export const movieHeroVariants = cva(
  "flex flex-col md:flex-row max-w-7xl mx-auto rounded-xl bg-gray-800/50 backdrop-blur-sm",
);

export const movieContentVariants = cva("w-full space-y-3 p-8 mx-auto");

export const movieContentHeaderVariants = cva(
  "flex flex-nowrap items-center justify-between gap-2",
);

export const movieImageRadiusVariants = cva(
  "rounded-t-xl md:rounded-bl-xl md:rounded-tr-none",
);

const MovieHero = ({
  isLoading,
  movie: { title, poster_path, overview, release_date, vote_average, genres },
}: MovieHeroProps) => {
  if (isLoading) {
    return (
      <div className={movieHeroVariants()}>
        <Skeleton
          rounded="none"
          className={cx(movieImageRadiusVariants(), "w-full md:w-87.5 h-100")}
        />
        <div className={movieContentVariants()}>
          <div className={movieContentHeaderVariants()}>
            <Skeleton className="flex-1 max-w-100 h-5" />
            <Skeleton className="w-10 h-4" />
          </div>
          <Skeleton className="flex-1 max-w-80 h-4" />
          <Skeleton className="flex-1 max-w-90 h-4" />
          <div className="flex flex-col flex-1 h-full mt-6 gap-3">
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
            <Skeleton className="h-3" />
          </div>
        </div>
      </div>
    );
  }

  const imageSrc = poster_path
    ? `${POSTER_BASE_URL}${poster_path}`
    : "/placeholder.png";

  const date = new Date(release_date);
  const formattedReleaseDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fadeIn = (delay: number): React.CSSProperties => ({
    opacity: 0,
    animation: "fadeIn 0.4s ease-out forwards",
    animationDelay: `${delay}ms`,
  });

  return (
    <div className={movieHeroVariants()}>
      <Image
        alt={title}
        src={imageSrc}
        className={cx(
          movieImageRadiusVariants(),
          "w-full md:w-auto h-auto max-h-140 sm:max-h-75 md:max-h-none object-cover",
        )}
        width={350}
        height={350}
        style={fadeIn(0)}
      />

      <div className={movieContentVariants()} style={fadeIn(150)}>
        <div className={movieContentHeaderVariants()} style={fadeIn(250)}>
          <Text variant="body-lg-bold" as="h1" className="text-yellow-light">
            {title}
          </Text>
          <div className="py-1 px-2 bg-gray-900 rounded-lg flex items-center justify-center gap-1">
            <Star className="text-yellow-light -mt-0.5" width={15} />
            <Text as="h2" variant="body-sm-bold" className="text-yellow-light">
              {vote_average.toFixed(1)}
            </Text>
          </div>
        </div>
        <Text as="h2" variant="body-md-bold" style={fadeIn(350)}>
          Release date: <Text variant="body-md">{formattedReleaseDate}</Text>
        </Text>
        <Text
          as="h2"
          variant="body-md-bold"
          className="flex items-center flex-wrap gap-2"
          style={fadeIn(450)}
        >
          Genre:{" "}
          {genres.map(({ id, name }, index) => (
            <Text
              key={id}
              variant="body-sm-bold"
              className="py-1 px-2 bg-yellow-light rounded-lg text-gray-900"
            >
              {name}
            </Text>
          ))}
        </Text>
        <Text as="p" variant="body-md" className="mt-6 leading-loose" style={fadeIn(550)}>
          {overview}
        </Text>
      </div>
    </div>
  );
};

export default MovieHero;
