import { SidebarWrapper } from "@/components/sidebar-wrapper";
import { RecipeGrid } from "@/components/recipe-grid";
import { getAllRecipesMetadata } from "@/lib/recipes";
import { SearchBar } from "@/components/search-bar";

export default async function ScriptsPage() {
  // For now, scripts are the same as recipes
  // In the future, we'll have a separate data structure
  const scripts = getAllRecipesMetadata();

  return (
    <SidebarWrapper>
      <main className="ml-64 flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Scripts</h1>
            <p className="text-muted-foreground">
              Browse custom code scripts used in recipes. Scripts are reusable code snippets 
              that can be implemented as Custom Code in Recipes.
            </p>
          </div>

          <div className="mb-6">
            <SearchBar recipes={scripts} />
          </div>

          <RecipeGrid initialRecipes={scripts} />
        </div>
      </main>
    </SidebarWrapper>
  );
}

