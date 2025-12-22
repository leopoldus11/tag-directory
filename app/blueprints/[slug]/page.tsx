import { notFound } from "next/navigation";
import { getBlueprintBySlug } from "@/lib/blueprints";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BlueprintDisplay } from "@/components/blueprint-display";
import type { Metadata } from "next";

interface BlueprintPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlueprintPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blueprint = getBlueprintBySlug(slug);

  if (!blueprint) {
    return {
      title: "Blueprint Not Found",
    };
  }

  return {
    title: `${blueprint.title} | tag.directory`,
    description: blueprint.description || `Tracking blueprint for ${blueprint.platform}`,
    openGraph: {
      title: blueprint.title,
      description: blueprint.description || `Tracking blueprint for ${blueprint.platform}`,
      type: "article",
    },
  };
}

export default async function BlueprintPage({ params }: BlueprintPageProps) {
  const { slug } = await params;
  const blueprint = getBlueprintBySlug(slug);

  if (!blueprint) {
    notFound();
  }

  // Get GitHub repo from environment or use default
  const githubRepo = process.env.NEXT_PUBLIC_GITHUB_REPO || "leopoldus11/tag-directory";

      return (
        <div className="min-h-screen bg-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        <Link
          href="/blueprints"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blueprints
        </Link>

        <article>
          <BlueprintDisplay blueprint={blueprint} githubRepo={githubRepo} />
        </article>
      </div>
    </div>
  );
}

