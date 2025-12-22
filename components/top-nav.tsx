"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserMenu } from "./user-menu";

const navItems = [
  { href: "/tags", label: "Tags" },
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
        {/* Logo - left-aligned on both mobile and desktop */}
        <Link 
          href="/" 
          className="logo-link text-[14px] font-semibold tracking-tight font-mono"
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
          <UserMenu />
        </div>

        {/* Mobile User Menu - right side */}
        <div className="md:hidden">
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
