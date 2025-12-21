"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Platform } from "@/types/recipe";

interface FilterContextType {
  selectedPlatform: Platform | "All";
  setSelectedPlatform: (platform: Platform | "All") => void;
  selectedUseCase: string | "All";
  setSelectedUseCase: (useCase: string | "All") => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within SidebarWrapper");
  }
  return context;
}

export function SidebarWrapper({ children }: { children: ReactNode }) {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | "All">("All");
  const [selectedUseCase, setSelectedUseCase] = useState<string | "All">("All");

  return (
    <FilterContext.Provider value={{ 
      selectedPlatform, 
      setSelectedPlatform,
      selectedUseCase,
      setSelectedUseCase,
    }}>
      <div className="flex min-h-screen bg-background">
        <Sidebar
          selectedPlatform={selectedPlatform}
          onPlatformChange={setSelectedPlatform}
          selectedUseCase={selectedUseCase}
          onUseCaseChange={setSelectedUseCase}
        />
        {children}
      </div>
    </FilterContext.Provider>
  );
}
