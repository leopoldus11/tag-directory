import { SidebarWrapper } from "@/components/sidebar-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function StandardsPage() {
  // This will be populated from data/standards in the future
  const standards = [
    {
      id: "basic-tracking",
      title: "Basic Pageview Tracking",
      description: "Standard implementation for basic pageview tracking across all platforms",
      level: "Beginner",
      platforms: ["GA4", "GTM", "Adobe Launch"],
    },
    {
      id: "ecommerce-tracking",
      title: "Ecommerce Tracking",
      description: "Comprehensive ecommerce tracking implementation with transaction and item data",
      level: "Advanced",
      platforms: ["GA4", "GTM"],
    },
    {
      id: "consent-management",
      title: "Consent Management",
      description: "Best practices for implementing consent management across tracking platforms",
      level: "Intermediate",
      platforms: ["Consent", "GA4", "Meta"],
    },
  ];

  return (
    <SidebarWrapper>
      <main className="ml-64 flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Tracking Standards</h1>
            <p className="text-muted-foreground">
              Community-driven best practices for tracking implementations. Help establish 
              industry standards by contributing your expertise.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {standards.map((standard) => (
              <Link key={standard.id} href={`/standards/${standard.id}`}>
                <Card className="h-full transition-all hover:border-border hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="mb-2">{standard.title}</CardTitle>
                    <CardDescription>{standard.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{standard.level}</Badge>
                      {standard.platforms.map((platform) => (
                        <Badge key={platform} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-border bg-card p-8 text-center">
            <h2 className="mb-2 text-xl font-semibold">Contribute to Standards</h2>
            <p className="mb-4 text-muted-foreground">
              Help the community establish best practices by submitting your tracking standards.
            </p>
            <Link
              href="/standards/new"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Submit Standard
            </Link>
          </div>
        </div>
      </main>
    </SidebarWrapper>
  );
}

