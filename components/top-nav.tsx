"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserMenu } from "./user-menu";

const navItems = [
  { href: "/tags", label: "Tags" },
  { href: "/scripts", label: "Scripts" },
  { href: "/standards", label: "Standards" },
  { href: "/tools", label: "Tools" },
  { href: "/jobs", label: "Jobs" },
  { href: "/members", label: "Members" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background relative">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        {/* Logo - left-aligned on both mobile and desktop */}
        <Link 
          href="/" 
          className="logo-link text-base font-medium tracking-tight font-mono text-foreground"
        >
          tracking.directory
        </Link>
        
        {/* Desktop Navigation - right side with nav items */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-foreground-muted hover:text-foreground"
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
