import { redirect } from "next/navigation";

// Redirect old /blueprints/[slug] route to /tags/[slug]
export default async function BlueprintPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/tags/${slug}`);
}
