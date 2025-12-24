"use client";

import { Platform } from "@/types/recipe";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  selectedPlatform: Platform | "All";
  onPlatformChange: (platform: Platform | "All") => void;
  availablePlatforms: (Platform | "All")[];
}

export function Sidebar({ 
  selectedPlatform, 
  onPlatformChange,
  availablePlatforms,
}: SidebarProps) {
  return (
    <aside className="fixed left-0 top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-64 border-r border-border/40 bg-sidebar/30 backdrop-blur-sm md:block">
      <div className="h-full overflow-y-auto p-4 sm:p-6 scrollbar-hide">
        {/* Platform Filter - No accordion, just filters */}
        <div className="mb-6">
          <div className="space-y-1">
            {availablePlatforms.map((platform) => (
              <Button
                key={platform}
                variant={selectedPlatform === platform ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-sm font-normal h-9",
                  selectedPlatform === platform &&
                    "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                onClick={() => onPlatformChange(platform)}
              >
                {platform}
              </Button>
            ))}
          </div>
        </div>

      </div>
    </aside>
  );
}
