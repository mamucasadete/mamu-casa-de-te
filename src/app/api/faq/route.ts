import { NextResponse } from "next/server";
import { getFAQs } from "@/sanity/queries";

export const revalidate = 60;

export async function GET() {
  try {
    const faqs = await getFAQs();
    return NextResponse.json(faqs, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json({ error: "Error al cargar FAQ" }, { status: 500 });
  }
}
