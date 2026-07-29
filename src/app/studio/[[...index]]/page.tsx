/**
 * Sanity Studio route — /studio
 *
 * This is the admin panel where the owner edits:
 * - Menu (prices, descriptions)
 * - Events
 * - FAQ
 * - Hours
 * - Photos (uploaded by admin)
 *
 * Access: https://mamu-casa-de-te.vercel.app/studio
 * Authentication: Sanity handles it (owner logs in with mamucasadete@gmail.com)
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
