"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * View Transition wrapper for smooth page transitions
 * This enables CSS view transitions for a mobile app-like experience
 */
export function ViewTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Check if view transitions are supported
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      // Enable view transitions on route change
      const handleRouteChange = () => {
        if ((document as any).startViewTransition) {
          (document as any).startViewTransition(() => {
            // Transition is handled by Next.js navigation
          });
        }
      };

      // Listen for route changes
      handleRouteChange();
    }
  }, [pathname]);

  return <>{children}</>;
}

