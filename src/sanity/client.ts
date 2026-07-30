/**
 * Sanity client for fetching data from Next.js.
 *
 * Reads from environment variables — never hardcode credentials here.
 * These are exposed to the browser (read-only).
 */
import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ne69571t",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true, // CDN for fast reads (cached for ~1 minute)
  // Token only needed for server-side writes — not for reads
  token: process.env.SANITY_API_TOKEN,
});

// Helper for building image URLs from Sanity image references
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: any) {
  return builder.image(source);
}
