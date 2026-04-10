import { routes } from "@/lib/routes";
import { Movie, POSTER_BASE_URL } from "@/lib/tmdb";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "./skeleton";
import Text from "./text";

export const movieCardVariants = cva(
  "flex flex-col w-full rounded-xl bg-gray-800/50 backdrop-blur-sm relative overflow-hidden transition-all z-10",
  {
    variants: {
      interactive: {
        true: "hover:scale-[1.06] group",
        false: "",
      },
    },
    defaultVariants: {
      interactive: true,
    },
  },
);

export const movieCardSizeVariants = cva("", {
  variants: {
    size: {
      default: "max-w-85 sm:max-w-60",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface MovieCardProps {
  movie: Omit<Movie, "overview"> & VariantProps<typeof movieCardSizeVariants>;
  isLoading?: boolean;
  priority?: boolean | undefined;
}

const MovieCard = ({
  isLoading,
  movie: { id, title, poster_path, release_date, vote_average, size },
  priority,
}: MovieCardProps) => {
  if (isLoading) {
    return (
      <div
        className={cx(
          movieCardVariants({ interactive: false }),
          movieCardSizeVariants({ size }),
        )}
      >
        <Skeleton rounded="none" className="aspect-2/3 w-full" />
        <div className="flex flex-col gap-2 p-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
    );
  }

  const releaseYear = release_date ? new Date(release_date).getFullYear() : "";
  const imageSrc = poster_path
    ? `${POSTER_BASE_URL}${poster_path}`
    : "/placeholder.png";

  return (
    <Link
      href={routes.movie(id)}
      className={cx(
        movieCardVariants({ interactive: true }),
        movieCardSizeVariants({ size }),
      )}
    >
      <div className="relative aspect-2/3">
        <Image
          alt={title}
          src={imageSrc}
          fill
          className="object-cover rounded-t-xl transition-all duration-300 group-hover:brightness-110 group-hover:contrast-110"
          sizes="(max-width: 768px) 100vw, 240px"
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
        />
      </div>
      <div className="flex flex-col gap-1 p-3">
        <div className="py-1 px-2 bg-gray-900 w-fit rounded-lg absolute top-2 right-2 flex items-center justify-center gap-1">
          <Star className="text-yellow-light -mt-0.5" width={15} />
          <Text as="h2" variant="body-sm-bold" className="text-yellow-light">
            {vote_average.toFixed(1)}
          </Text>
        </div>
        <Text
          as="h2"
          variant="body-md-bold"
          className="transition-all group-hover:text-yellow-light"
        >
          {title}
        </Text>
        <Text as="h3" className="text-gray-300">
          {releaseYear}
        </Text>
      </div>
    </Link>
  );
};

export default MovieCard;
