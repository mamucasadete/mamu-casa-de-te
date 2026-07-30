import { NextResponse } from "next/server";
import { getHours } from "@/sanity/queries";

export const revalidate = 60;

export async function GET() {
  try {
    const hours = await getHours();
    return NextResponse.json(hours, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error("Error fetching hours:", error);
    return NextResponse.json({ error: "Error al cargar horarios" }, { status: 500 });
  }
}
