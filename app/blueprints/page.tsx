import { redirect } from "next/navigation";

// Redirect old /blueprints route to /tags
export default function BlueprintsPage() {
  redirect("/tags");
}
