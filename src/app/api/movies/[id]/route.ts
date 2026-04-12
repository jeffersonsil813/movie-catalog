import { fetchMovieById } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const data = await fetchMovieById(id);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching movie details." },
      { status: 500 },
    );
  }
}
