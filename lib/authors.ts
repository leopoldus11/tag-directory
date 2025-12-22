import fs from "fs";
import path from "path";

const AUTHORS_FILE = path.join(process.cwd(), "data", "authors", "authors.json");

export interface Author {
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  contributions: number;
  github?: string;
  credits?: number;
  followers?: number;
  following?: number;
  isOpenForWork?: boolean;
  availabilityType?: "freelance" | "full-time" | "part-time" | "not-available";
  skills?: string[];
}

export function getAuthorRank(author: Author) {
  const credits = author.credits || 0;
  // Import dynamically to avoid client-side issues
  const { getRankFromCredits } = require("@/components/credit-badge");
  return getRankFromCredits(credits);
}

export function getAllAuthors(): Author[] {
  if (!fs.existsSync(AUTHORS_FILE)) {
    return [];
  }
  
  try {
    const content = fs.readFileSync(AUTHORS_FILE, "utf-8");
    return JSON.parse(content) as Author[];
  } catch (error) {
    console.error("Error loading authors:", error);
    return [];
  }
}

export function getAuthorByUsername(username: string): Author | null {
  const authors = getAllAuthors();
  return authors.find((a) => a.username === username) || null;
}

