"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Sidebar } from "./sidebar";
import { Platform } from "@/types/recipe";

interface FilterContextType {
  selectedPlatform: Platform | "All";
  setSelectedPlatform: (platform: Platform | "All") => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within SidebarWrapper");
  }
  return context;
}

interface SidebarWrapperProps {
  children: ReactNode;
  availablePlatforms?: (Platform | "All")[];
}

export function SidebarWrapper({ children, availablePlatforms = ["All"] }: SidebarWrapperProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | "All">("All");

  return (
    <FilterContext.Provider value={{ 
      selectedPlatform, 
      setSelectedPlatform,
    }}>
      <div className="flex min-h-screen bg-background">
        <Sidebar
          selectedPlatform={selectedPlatform}
          onPlatformChange={setSelectedPlatform}
          availablePlatforms={availablePlatforms}
        />
        <div className="flex-1 md:ml-64">
          {children}
        </div>
      </div>
    </FilterContext.Provider>
  );
}
