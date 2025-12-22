import { getAllBlueprints } from "@/lib/blueprints";
import { SearchBar } from "@/components/search-bar";
import { ViewAllLink } from "@/components/view-all-link";
import { getAllAuthors } from "@/lib/authors";
import { MemberProfile } from "@/components/member-profile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { getFeaturedJobs } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "tracking.directory - Tracking Scripts & Recipes",
  description: "An open-source library for tracking scripts and recipes (GTM tags, Adobe Launch rules, etc.)",
  openGraph: {
    title: "tracking.directory - Tracking Scripts & Recipes",
    description: "An open-source library for tracking scripts and recipes",
    type: "website",
  },
};

// Get platform abbreviation (first 2 letters)
function getPlatformAbbr(platform: string): string {
  return platform
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Improved badge colors with better contrast
const platformColors: Record<string, string> = {
  GTM: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
  "Adobe Launch": "bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30",
  Tealium: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  GA4: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
  Meta: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
  Consent: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30",
  "Server-Side": "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
  Other: "bg-gray-500/15 text-gray-600 dark:text-gray-400 border-gray-500/30",
};

const difficultyColors: Record<string, string> = {
  Beginner: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  Intermediate: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  Advanced: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
};

export default async function Home() {
  const blueprints = getAllBlueprints();
  const authors = getAllAuthors();
  const featuredJobs = getFeaturedJobs();

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero Section - Centered */}
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center">
          {/* Space for SVG Logo */}
          <div className="mb-4 sm:mb-6 md:mb-8 h-12 sm:h-16 md:h-20 flex items-center justify-center">
            {/* SVG Logo will be inserted here */}
          </div>
          
          <h1 className="mb-4 text-[21px] sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            The open-source library for tracking code
          </h1>
          <p className="mb-6 sm:mb-8 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed px-4">
            Discover, share, and contribute production-ready tracking implementations. GTM tags, Adobe Launch rules, Tealium configs, and more.
          </p>
          
          {/* Search Box */}
          <div className="mb-6 sm:mb-8 w-full max-w-2xl px-4">
            <SearchBar recipes={blueprints.map(b => ({
              id: b.id,
              name: b.title,
              platform: b.platform,
              difficulty: b.difficulty || "Beginner",
              author: b.author,
              description: b.description,
            }))} />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <Button className="rounded-full" asChild>
              <Link href="/blueprints">Browse Blueprints</Link>
            </Button>
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/contribute">
                Contribute
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-8 sm:pb-12">
          {/* Featured Jobs - Show above Featured Blueprints if jobs exist */}
          {featuredJobs.length > 0 && (
            <div className="mb-16">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="mb-1 text-2xl font-semibold">Featured Jobs</h2>
                  <p className="text-sm text-muted-foreground">Find your next digital analytics engineering role</p>
                </div>
                <ViewAllLink href="/jobs" />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {featuredJobs.slice(0, 6).map((job) => (
                  <Link
                    key={job.id}
                    href={job.url || `/jobs/${job.id}`}
                    target={job.url ? "_blank" : undefined}
                    rel={job.url ? "noopener noreferrer" : undefined}
                    className="group relative rounded-lg border border-border/50 bg-card/50 p-4 transition-all hover:border-border/80 hover:bg-card hover:shadow-sm"
                  >
                    {/* Company & Location */}
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium">{job.company}</span>
                      <span>•</span>
                      <span>{job.workplaceType}</span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 text-base font-semibold leading-tight">{job.title}</h3>

                    {/* Description */}
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>

                    {/* Location & Experience */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{job.location}</span>
                        {job.experience && (
                          <>
                            <span>•</span>
                            <span>{job.experience}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Featured Blueprints */}
          <div className="mb-16">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="mb-1 text-2xl font-semibold">Featured Blueprints</h2>
                <p className="text-sm text-muted-foreground">Production-ready tracking implementations</p>
              </div>
              <ViewAllLink href="/blueprints" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {blueprints.slice(0, 6).map((blueprint) => (
                <Link
                  key={blueprint.id}
                  href={`/blueprints/${blueprint.slug}`}
                  className="group relative rounded-lg border border-border/50 bg-card/50 p-4 transition-all hover:border-border/80 hover:bg-card hover:shadow-sm"
                >
                  {/* Platform Abbreviation */}
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded bg-muted/30 text-xs font-medium text-muted-foreground">
                    {getPlatformAbbr(blueprint.platform)}
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-base font-semibold leading-tight">{blueprint.title}</h3>

                  {/* Description */}
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                    {blueprint.description || "No description available"}
                  </p>

                  {/* Tags */}
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs border font-normal",
                        platformColors[blueprint.platform] || platformColors.Other
                      )}
                    >
                      {blueprint.platform}
                    </Badge>
                    {blueprint.difficulty && (
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs border font-normal",
                          difficultyColors[blueprint.difficulty]
                        )}
                      >
                        {blueprint.difficulty}
                      </Badge>
                    )}
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground font-mono">
                      {blueprint.author}
                      {blueprint.community_verified && (
                        <Check className="ml-1 inline h-3 w-3 text-emerald-500" />
                      )}
                    </p>
                    <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Standards */}
          <div className="mb-16">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="mb-1 text-2xl font-semibold">Popular Standards</h2>
                <p className="text-sm text-muted-foreground">Community-driven best practices</p>
              </div>
              <ViewAllLink href="/standards" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Data Layer Naming Conventions",
                  description: "Standardized naming patterns for data layer variables across all platforms.",
                  tags: ["GTM", "Adobe", "Tealium"],
                },
                {
                  title: "Ecommerce Event Schema",
                  description: "Unified schema for ecommerce events compatible with GA4, Adobe, and Meta.",
                  tags: ["GA4", "Adobe", "Meta"],
                },
                {
                  title: "Consent Implementation Guide",
                  description: "Best practices for implementing consent management across tracking platforms.",
                  tags: ["GTM", "Adobe", "Tealium"],
                },
                {
                  title: "Server-Side Tagging Patterns",
                  description: "Common patterns and best practices for server-side tag implementations.",
                  tags: ["GTM", "Tealium"],
                },
              ].map((standard, idx) => (
                <Link
                  key={idx}
                  href="/standards"
                  className="group rounded-lg border border-border/50 bg-card/50 p-4 transition-all hover:border-border/80 hover:bg-card hover:shadow-sm"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded bg-muted/30">
                    <svg
                      className="h-4 w-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-base font-semibold leading-tight">{standard.title}</h3>
                  <p className="mb-3 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                    {standard.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {standard.tags.map((tag) => (
                      <span key={tag} className="text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Community Members */}
          <div className="mb-16">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="mb-1 text-2xl font-semibold">Community Members</h2>
                <p className="text-sm text-muted-foreground">The experts behind the blueprints</p>
              </div>
              <ViewAllLink href="/members" />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {authors.slice(0, 6).map((author) => (
                <MemberProfile key={author.username} author={author} compact />
              ))}
            </div>
          </div>

          {/* Ready to Contribute */}
          <div className="mb-12 rounded-lg border border-border/50 bg-card/50 p-12 text-center">
            <h2 className="mb-3 text-2xl font-semibold">Ready to contribute?</h2>
            <p className="mb-6 text-muted-foreground">
              Share your tracking expertise with the community. Submit your blueprints, scripts, and standards via GitHub.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button className="rounded-full" asChild>
                <Link href="/contribute">Start Contributing</Link>
              </Button>
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="https://github.com/leopoldus11/tracking-directory" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
