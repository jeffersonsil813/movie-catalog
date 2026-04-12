"use client";
import Text from "@/components/text";
import { routes } from "@/lib/routes";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";
interface Props {
  params: Promise<{ id: string }>;
}

const MovieDetails = ({ params }: Props) => {
  const { id } = use(params);

  return (
    <main>
      <Link
        href={routes.home}
        className="flex flex-nowrap gap-1 items-center ml-3 group"
      >
        <ChevronLeft className="text-gray-100 group-hover:text-yellow-light transition group-hover:animate-bounce-x -mt-1" />
        <Text
          variant="body-md"
          className="transition border-b border-transparent group-hover:border-yellow group-hover:text-yellow-light"
        >
          Back to Home
        </Text>
      </Link>
    </main>
  );
};

export default MovieDetails;
