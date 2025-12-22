import fs from "fs";
import path from "path";

const JOBS_FILE = path.join(process.cwd(), "data", "jobs", "jobs.json");

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  workplaceType: "On site" | "Remote" | "Hybrid";
  experience: string;
  description: string;
  url: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  status?: "active" | "closed" | "pending";
}

export function getAllJobs(): Job[] {
  if (!fs.existsSync(JOBS_FILE)) {
    return [];
  }

  try {
    const content = fs.readFileSync(JOBS_FILE, "utf-8");
    const jobs = JSON.parse(content) as Job[];
    // Filter to only active jobs
    return jobs.filter((job) => !job.status || job.status === "active");
  } catch (error) {
    console.error("Error loading jobs:", error);
    return [];
  }
}

export function getJobById(id: string): Job | null {
  const jobs = getAllJobs();
  return jobs.find((job) => job.id === id) || null;
}

export function getFeaturedJobs(): Job[] {
  const jobs = getAllJobs();
  return jobs.filter((job) => job.featured === true);
}

