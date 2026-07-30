import { NextResponse } from "next/server";
import { getSiteTexts } from "@/sanity/queries";

export const revalidate = 60;

export async function GET() {
  try {
    const texts = await getSiteTexts();
    return NextResponse.json(texts, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error("Error fetching site texts:", error);
    return NextResponse.json({ error: "Error al cargar textos" }, { status: 500 });
  }
}
