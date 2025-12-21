import { notFound } from "next/navigation";
import { getRecipeById } from "@/lib/recipes";
import { Badge } from "@/components/ui/badge";
import { Copy, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CopyButton } from "@/components/copy-button";

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/recipes"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Recipes
        </Link>

        <article className="space-y-8">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Badge variant="outline" className="font-normal">{recipe.platform}</Badge>
              <Badge variant="outline" className="font-normal">{recipe.difficulty}</Badge>
            </div>
            <h1 className="mb-4 text-4xl font-semibold tracking-tight">{recipe.name}</h1>
            {recipe.description && (
              <p className="text-base text-muted-foreground leading-relaxed">{recipe.description}</p>
            )}
          </div>

          <div className="rounded-lg border border-border/50 bg-card/50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Code Snippet</h2>
              <CopyButton text={recipe.codeSnippet} />
            </div>
            <pre className="overflow-x-auto rounded-md bg-muted/50 p-4 text-sm font-mono">
              <code>{recipe.codeSnippet}</code>
            </pre>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {recipe.trigger && (
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trigger</h3>
                <p className="text-sm">{recipe.trigger}</p>
              </div>
            )}
            {recipe.condition && (
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Condition</h3>
                <p className="text-sm">{recipe.condition}</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
            <span>by {recipe.author}</span>
            {recipe.createdAt && (
              <>
                <span>•</span>
                <span>{new Date(recipe.createdAt).toLocaleDateString()}</span>
              </>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
