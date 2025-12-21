import { notFound } from "next/navigation";
import { getBlueprintBySlug } from "@/lib/blueprints";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
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

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/blueprints"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blueprints
        </Link>

        <article className="space-y-8">
          <div>
            <div className="mb-4 flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="font-normal">{blueprint.platform}</Badge>
              <Badge variant="outline" className="font-normal">{blueprint.type}</Badge>
              {blueprint.difficulty && (
                <Badge variant="outline" className="font-normal">{blueprint.difficulty}</Badge>
              )}
              {blueprint.community_verified && (
                <Badge variant="default" className="font-normal">✓ Verified</Badge>
              )}
            </div>
            <h1 className="mb-4 text-4xl font-semibold tracking-tight">{blueprint.title}</h1>
            {blueprint.description && (
              <p className="text-base text-muted-foreground leading-relaxed">{blueprint.description}</p>
            )}
          </div>

          <div className="rounded-lg border border-border/50 bg-card/50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Code</h2>
            </div>
            <CodeBlock code={blueprint.content} language="javascript" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {blueprint.trigger && (
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trigger</h3>
                <p className="text-sm">{blueprint.trigger}</p>
              </div>
            )}
            {blueprint.condition && (
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Condition</h3>
                <p className="text-sm">{blueprint.condition}</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
            <span>by <Link href={`/members/${blueprint.author}`} className="hover:text-foreground transition-colors">{blueprint.author}</Link></span>
            {blueprint.createdAt && (
              <>
                <span>•</span>
                <span>{new Date(blueprint.createdAt).toLocaleDateString()}</span>
              </>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

