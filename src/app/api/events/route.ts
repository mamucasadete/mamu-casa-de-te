import { NextResponse } from "next/server";
import { getEvents } from "@/sanity/queries";

export const revalidate = 60;

export async function GET() {
  try {
    const events = await getEvents();
    return NextResponse.json(events, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Error al cargar eventos" }, { status: 500 });
  }
}
