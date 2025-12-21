import { SidebarWrapper } from "@/components/sidebar-wrapper";
import { getAllBlueprints } from "@/lib/blueprints";
import { SearchBar } from "@/components/search-bar";
import { ViewAllLink } from "@/components/view-all-link";
import { RecipeCard } from "@/components/recipe-card";
import { getAllAuthors } from "@/lib/authors";
import { MemberProfile } from "@/components/member-profile";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "tag.directory - Tracking Scripts & Recipes",
  description: "An open-source library for tracking scripts and recipes (GTM tags, Adobe Launch rules, etc.)",
  openGraph: {
    title: "tag.directory - Tracking Scripts & Recipes",
    description: "An open-source library for tracking scripts and recipes",
    type: "website",
  },
};

export default async function Home() {
  const blueprints = getAllBlueprints();
  const authors = getAllAuthors();

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero Section - Centered */}
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <h1 className="mb-4 text-5xl font-semibold tracking-tight">
            Join the tracking community
          </h1>
          <p className="mb-8 max-w-2xl text-base text-muted-foreground leading-relaxed">
            The home for digital engineers where you can explore recipes, browse scripts, 
            discover best practices, and connect with the tracking community.
          </p>
          
          {/* Search Box */}
          <div className="mb-16 w-full max-w-2xl">
            <SearchBar recipes={blueprints.map(b => ({
              id: b.id,
              name: b.title,
              platform: b.platform,
              difficulty: b.difficulty || "Beginner",
              author: b.author,
              description: b.description,
            }))} />
          </div>
        </div>

        {/* Content Sections */}
        <div className="mx-auto max-w-7xl px-6 pb-12">
          {/* Featured Blueprints */}
          <div className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Featured Blueprints</h2>
              <ViewAllLink href="/blueprints" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {blueprints.slice(0, 6).map((blueprint) => (
                <Link key={blueprint.id} href={`/blueprints/${blueprint.slug}`}>
                  <div className="rounded-lg border border-border/50 bg-card/50 p-4 hover:border-border/80 hover:bg-card transition-all">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-medium text-sm leading-tight">{blueprint.title}</h3>
                      {blueprint.vendorIcon && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-muted/30 text-sm">
                          {blueprint.vendorIcon}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3 font-mono">
                      {blueprint.description || "No description available"}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded border border-border/50 bg-muted/30">
                        {blueprint.platform}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded border border-border/50 bg-muted/30">
                        {blueprint.type}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Members Preview */}
          <div className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Members</h2>
              <ViewAllLink href="/members" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {authors.map((author) => (
                <MemberProfile key={author.username} author={author} compact />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
