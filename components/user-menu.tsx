"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Plus } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { UserAvatar } from "@/components/user-avatar";

export function UserMenu() {
  const { data: session, status } = useSession();

  // Show loading state
  if (status === "loading") {
    return (
      <Button
        variant="default"
        size="sm"
        className="h-8 px-4 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium"
        disabled
      >
        Loading...
      </Button>
    );
  }

  // Show sign in button if not authenticated
  if (!session?.user) {
    return (
      <Button
        variant="default"
        size="sm"
        className="h-8 px-4 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium"
        asChild
      >
        <Link href="/login">Sign In</Link>
      </Button>
    );
  }

  const user = session.user;
  const userId = (user as any).id || user.name || user.email || "user";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 rounded-full p-0 hover:bg-muted"
        >
          <UserAvatar
            name={user.name || user.email || ""}
            avatar={user.image}
            size="sm"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href={`/members/${userId}`} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/jobs/new" className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Post a job
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="cursor-pointer text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
