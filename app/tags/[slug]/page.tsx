import { notFound } from "next/navigation";
import { getTagBySlug, incrementTagViews } from "@/lib/tags";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BlueprintDisplay } from "@/components/blueprint-display";
import { CodeBlock } from "@/components/code-block";
import { CopyButton } from "@/components/copy-button";
import type { Metadata } from "next";

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  if (!tag) {
    return {
      title: "Tag Not Found",
    };
  }

  return {
    title: `${tag.title} | tracking.directory`,
    description: tag.description || `Tracking tag for ${tag.platform}`,
    openGraph: {
      title: tag.title,
      description: tag.description || `Tracking tag for ${tag.platform}`,
      type: "article",
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  if (!tag) {
    notFound();
  }

  // Increment view count (fire and forget)
  incrementTagViews(slug).catch(console.error);

  // Get GitHub repo from environment or use default
  const githubRepo = process.env.NEXT_PUBLIC_GITHUB_REPO || "leopoldus11/tag-directory";
  const rawJson = JSON.stringify(tag, null, 2);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        <Link
          href="/tags"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tags
        </Link>

        <article className="space-y-8">
          <BlueprintDisplay blueprint={tag} githubRepo={githubRepo} />

          {/* Raw JSON view for power users */}
          <section className="rounded-lg border border-border/50 bg-card/40 p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider">
                  Tag JSON (Source of truth)
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  This is the exact JSON stored in the database
                  {tag.filePath && (
                    <>
                      {" "}at{" "}
                      <code className="font-mono bg-muted/60 px-1.5 py-0.5 rounded">
                        {tag.filePath}
                      </code>
                    </>
                  )}
                </p>
              </div>
              <CopyButton text={rawJson} />
            </div>
            <CodeBlock code={rawJson} language="json" />
          </section>
        </article>
      </div>
    </div>
  );
}

