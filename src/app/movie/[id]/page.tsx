"use client";
import Text from "@/components/text";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const MovieDetails = ({ params }: Props) => {
  const { id } = use(params);
  const router = useRouter();

  return (
    <main>
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
    </main>
  );
};

export default MovieDetails;
