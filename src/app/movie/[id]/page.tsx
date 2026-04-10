"use client";
import { useRouter } from "next/navigation";

const MovieDetails = () => {
  const router = useRouter();
  return <button onClick={() => router.back()} className="text-gray-100">click me</button>;
};

export default MovieDetails;
