"use client";

import { Platform } from "@/types/recipe";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  selectedPlatform: Platform | "All";
  onPlatformChange: (platform: Platform | "All") => void;
  selectedUseCase?: string | "All";
  onUseCaseChange?: (useCase: string | "All") => void;
}

const platforms: (Platform | "All")[] = [
  "All",
  "GTM",
  "Adobe Launch",
  "Tealium",
  "GA4",
  "Meta",
  "Consent",
  "Server-Side",
  "Other",
];

const useCases = [
  "All",
  "Ecommerce",
  "Consent",
  "UX",
  "Analytics",
  "Other",
];

export function Sidebar({ 
  selectedPlatform, 
  onPlatformChange,
  selectedUseCase = "All",
  onUseCaseChange,
}: SidebarProps) {
  const [platformsOpen, setPlatformsOpen] = useState(true);
  const [useCasesOpen, setUseCasesOpen] = useState(true);

  return (
    <aside className="fixed left-0 top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-64 border-r border-border/40 bg-sidebar/30 backdrop-blur-sm md:block">
      <div className="h-full overflow-y-auto p-4 sm:p-6">
        {/* Platform Filter */}
        <div className="mb-6">
          <button
            onClick={() => setPlatformsOpen(!platformsOpen)}
            className="mb-3 flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Platform</span>
            {platformsOpen ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </button>
          {platformsOpen && (
            <div className="space-y-1">
              {platforms.map((platform) => (
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
          )}
        </div>

        {/* Use Case Filter */}
        {onUseCaseChange && (
          <div className="mb-6">
            <button
              onClick={() => setUseCasesOpen(!useCasesOpen)}
              className="mb-3 flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Use Case</span>
              {useCasesOpen ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
            {useCasesOpen && (
              <div className="space-y-1">
                {useCases.map((useCase) => (
                  <Button
                    key={useCase}
                    variant={selectedUseCase === useCase ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start text-sm font-normal h-9",
                      selectedUseCase === useCase &&
                        "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                    onClick={() => onUseCaseChange(useCase)}
                  >
                    {useCase}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
