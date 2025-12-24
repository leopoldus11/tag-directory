"use client";

import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name?: string | null;
  avatar?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
  showStatusDot?: boolean;
  statusColorClassName?: string; // e.g. "bg-green-500"
}

// Helper to compute initials from a full name
export function getInitials(name?: string | null): string {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "U";

  const first = parts[0][0] || "";
  const last = parts[parts.length - 1][0] || "";
  const initials = `${first}${last}`.toUpperCase();
  return initials || "U";
}

export function UserAvatar({
  name,
  avatar,
  size = "sm",
  className,
  showStatusDot = false,
  statusColorClassName = "bg-green-500",
}: UserAvatarProps) {
  const isUrl = avatar && avatar.startsWith("http");
  const initials = getInitials(name);
  const fallbackText = !isUrl && avatar ? avatar : initials;

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-24 w-24 text-2xl",
  } as const;

  const resolvedSize = sizeClasses[size] || sizeClasses.sm;

  return (
    <div className={cn("relative inline-flex", className)}>
      {isUrl ? (
        <img
          src={avatar || ""}
          alt={name || fallbackText || "User"}
          className={cn("rounded-full object-cover", resolvedSize)}
        />
      ) : (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-muted/50 text-foreground font-medium",
            resolvedSize
          )}
        >
          {fallbackText}
        </div>
      )}
      {showStatusDot && (
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background",
            statusColorClassName
          )}
        />
      )}
    </div>
  );
}
