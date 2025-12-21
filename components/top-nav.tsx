"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const navItems = [
  { href: "/blueprints", label: "Blueprints" },
  { href: "/scripts", label: "Scripts" },
  { href: "/standards", label: "Standards" },
  { href: "/members", label: "Members" },
  { href: "/contribute", label: "Contribute" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-[1920px] items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight font-mono">
          tag.directory
        </Link>
        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[hsl(210_40%_98%)]",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="relative group">
              <Link
                href="#"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-[hsl(210_40%_98%)] flex items-center gap-1"
              >
                More
                <ChevronDown className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <Button 
            variant="default" 
            size="sm" 
            className="h-8 px-4 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium"
            asChild
          >
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
