/**
 * API route: GET /api/menu
 * Returns the menu grouped by category, reading from Sanity CMS.
 */
import { NextResponse } from "next/server";
import { getMenu } from "@/sanity/queries";

export const revalidate = 60;

export async function GET() {
  try {
    const menu = await getMenu();
    return NextResponse.json(menu, {
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Error fetching menu:", error);
    return NextResponse.json({ error: "Error al cargar el menú" }, { status: 500 });
  }
}
