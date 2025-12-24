import { SidebarWrapper } from "@/components/sidebar-wrapper";
import { getAllTags } from "@/lib/tags";
import { SearchBar } from "@/components/search-bar";
import { RecipeGrid } from "@/components/recipe-grid";
import type { Metadata } from "next";
import { RecipeMetadata, Platform } from "@/types/recipe";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Tags | tracking.directory",
  description: "Browse tracking tags for GTM, Adobe Launch, Tealium, and more",
  openGraph: {
    title: "Tags | tracking.directory",
    description: "Browse tracking tags for GTM, Adobe Launch, Tealium, and more",
    type: "website",
  },
};

export default async function TagsPage() {
  const tags = await getAllTags();

  // Convert tags to RecipeMetadata format for compatibility
  // Use slug for URLs (more readable than UUID)
  const recipeMetadata: RecipeMetadata[] = tags.map((b) => ({
    id: b.slug, // Use slug as ID for URLs
    name: b.title,
    platform: b.platform as RecipeMetadata["platform"],
    difficulty: b.difficulty || "Beginner",
    author: b.author,
    description: b.description,
    tags: b.tags,
    vendor: b.vendor,
    vendorIcon: b.vendorIcon,
    codeSnippet: b.content,
  }));

  // Extract unique platforms from actual tag data (dynamic filtering)
  const uniquePlatforms = Array.from(new Set(tags.map(b => b.platform))) as Platform[];
  const availablePlatforms: (Platform | "All")[] = ["All", ...uniquePlatforms.sort()];

  return (
    <SidebarWrapper availablePlatforms={availablePlatforms}>
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-semibold">Tags</h1>
            <p className="text-muted-foreground">
              Browse tags or submit a tag to reach digital engineers worldwide.
            </p>
          </div>

          <div className="mb-6">
            <SearchBar recipes={recipeMetadata} />
          </div>

          <RecipeGrid
            initialRecipes={recipeMetadata}
            adSlot={
              <Card className="flex flex-col border-border/50 bg-card/60 h-[550px]">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Ad Image - Takes up most of the space, same height as regular card (500px) */}
                  <div className="flex-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center p-4 sm:p-5 h-[500px]">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎯</div>
                      <p className="text-xs text-muted-foreground">Ad Image</p>
                      <p className="text-xs text-muted-foreground mt-2">Your advertisement content here</p>
                    </div>
                  </div>
                  {/* Advertiser Info - Exactly 50px height */}
                  <div className="h-[50px] p-3 border-t border-border/40 flex flex-col justify-center flex-shrink-0">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-0.5">
                      Sponsor
                    </p>
                    <h3 className="text-sm font-semibold line-clamp-1">
                      Your tool here
                    </h3>
                  </div>
                </CardContent>
              </Card>
            }
          />
        </div>
      </main>
    </SidebarWrapper>
  );
}

