import { SidebarWrapper } from "@/components/sidebar-wrapper";
import { getAllBlueprints } from "@/lib/blueprints";
import { SearchBar } from "@/components/search-bar";
import { RecipeGrid } from "@/components/recipe-grid";
import { ViewAllLink } from "@/components/view-all-link";
import type { Metadata } from "next";
import { RecipeMetadata } from "@/types/recipe";

export const metadata: Metadata = {
  title: "Blueprints | tag.directory",
  description: "Browse tracking blueprints for GTM, Adobe Launch, Tealium, and more",
  openGraph: {
    title: "Blueprints | tag.directory",
    description: "Browse tracking blueprints for GTM, Adobe Launch, Tealium, and more",
    type: "website",
  },
};

export default async function BlueprintsPage() {
  const blueprints = getAllBlueprints();

  // Convert blueprints to RecipeMetadata format for compatibility
  const recipeMetadata: RecipeMetadata[] = blueprints.map((b) => ({
    id: b.id,
    name: b.title,
    platform: b.platform as RecipeMetadata["platform"],
    difficulty: b.difficulty || "Beginner",
    author: b.author,
    description: b.description,
    tags: b.tags,
    vendor: b.vendor,
    vendorIcon: b.vendorIcon,
  }));

  return (
    <SidebarWrapper>
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-semibold">Blueprints</h1>
            <p className="text-muted-foreground">
              Browse blueprints or submit a blueprint to reach digital engineers worldwide.
            </p>
          </div>

          <div className="mb-6">
            <SearchBar recipes={recipeMetadata} />
          </div>

          <RecipeGrid initialRecipes={recipeMetadata} />
        </div>
      </main>
    </SidebarWrapper>
  );
}
