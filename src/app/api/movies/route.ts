import { fetchPopularMovies } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);

  try {
    const data = await fetchPopularMovies(page);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error searching for movies." },
      { status: 500 },
    );
  }
}
