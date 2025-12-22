"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/blueprints", label: "Blueprints" },
  { href: "/scripts", label: "Scripts" },
  { href: "/standards", label: "Standards" },
  { href: "/jobs", label: "Jobs" },
  { href: "/members", label: "Members" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-[1920px] items-center justify-between px-4 sm:px-6">
        {/* Logo - centered on mobile, left-aligned on desktop */}
        <Link 
          href="/" 
          className="text-[14px] font-semibold tracking-tight font-mono flex-1 md:flex-none text-center md:text-left"
        >
          tracking.directory
        </Link>
        
        {/* Desktop Navigation - right side with nav items */}
        <div className="hidden md:flex items-center gap-5">
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
          <Button 
            variant="default" 
            size="sm" 
            className="h-8 px-4 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium"
            asChild
          >
            <Link href="/login">Sign In</Link>
          </Button>
        </div>

        {/* Mobile Sign In Button - right side */}
        <div className="flex md:hidden justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-3 rounded-full font-medium text-sm hover:bg-accent"
            asChild
          >
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
