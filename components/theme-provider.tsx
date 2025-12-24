"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ThemeProviderInner({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const theme = searchParams.get("theme") || "light"; // Default to light
    const corners = searchParams.get("corners") || "rounded";
    
    const html = document.documentElement;
    
    // Apply theme
    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.add("light");
      html.classList.remove("dark");
    }
    
    // Apply corners
    if (corners === "sharp") {
      html.classList.add("sharp");
    } else {
      html.classList.remove("sharp");
    }
  }, [searchParams]);
  
  return <>{children}</>;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={children}>
      <ThemeProviderInner>{children}</ThemeProviderInner>
    </Suspense>
  );
}

