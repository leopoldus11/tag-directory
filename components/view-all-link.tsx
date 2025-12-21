import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewAllLinkProps {
  href: string;
  className?: string;
}

export function ViewAllLink({ href, className }: ViewAllLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1",
        className
      )}
    >
      View all
      <ArrowUpRight className="h-3.5 w-3.5" />
    </Link>
  );
}

