import { SidebarWrapper } from "@/components/sidebar-wrapper";
import { RecipeGrid } from "@/components/recipe-grid";
import { getAllRecipesMetadata } from "@/lib/recipes";
import { SearchBar } from "@/components/search-bar";

export default async function RecipesPage() {
  const recipes = getAllRecipesMetadata();

  return (
    <SidebarWrapper>
      <main className="ml-64 flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Recipes</h1>
            <p className="text-muted-foreground">
              Browse recipes or submit a recipe to reach digital engineers worldwide.
            </p>
          </div>

          <div className="mb-6">
            <SearchBar recipes={recipes} />
          </div>

          <RecipeGrid initialRecipes={recipes} />
        </div>
      </main>
    </SidebarWrapper>
  );
}

