/**
 * Required metadata for the Sanity Studio route.
 * Next.js 16 requires layout.tsx for nested routes.
 */
export const metadata = {
  title: "MAMU Casa de Té · Admin",
  description: "Panel de administración — MAMU Casa de Té",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
