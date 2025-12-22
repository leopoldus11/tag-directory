import { SidebarWrapper } from "@/components/sidebar-wrapper";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getAllJobs } from "@/lib/jobs";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs | tracking.directory",
  description: "Find digital analytics and tracking engineering jobs",
};

export default async function JobsPage() {
  const jobs = getAllJobs();

  return (
    <SidebarWrapper>
      <main className="ml-64 flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-semibold tracking-tight">Jobs</h1>
              <p className="text-muted-foreground">
                Find digital analytics and tracking engineering opportunities
              </p>
            </div>
            <Button className="gap-2 rounded-full" asChild>
              <Link href="/jobs/new">
                <Plus className="h-4 w-4" />
                Post a Job
              </Link>
            </Button>
          </div>

          {jobs.length === 0 ? (
            <div className="rounded-lg border border-border/50 bg-card/50 p-12 text-center">
              <p className="mb-4 text-lg font-medium">No jobs posted yet</p>
              <p className="mb-6 text-sm text-muted-foreground">
                Be the first to post a job opportunity for the tracking community
              </p>
              <Button className="rounded-full" asChild>
                <Link href="/jobs/new">Post a Job</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-border/50 bg-card/50 p-6 transition-all hover:border-border/80 hover:bg-card hover:shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        {job.featured && (
                          <Badge variant="default" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="mb-3 text-sm font-medium text-muted-foreground">
                        {job.company} • {job.location} • {job.workplaceType} • {job.experience} years
                      </p>
                      <p className="line-clamp-2 text-sm text-muted-foreground">{job.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </SidebarWrapper>
  );
}

