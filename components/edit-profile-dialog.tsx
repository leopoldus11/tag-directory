"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditProfileDialogProps {
  initialName: string;
  initialUsername: string;
  initialBio?: string;
  initialWebsite?: string;
  initialXProfile?: string;
  initialOpenForWork?: boolean;
}

export function EditProfileDialog({
  initialName,
  initialUsername,
  initialBio,
  initialWebsite,
  initialXProfile,
  initialOpenForWork = false,
}: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);

  // Local form state (no persistence yet – Phase 2 will connect this to a database)
  const [name, setName] = useState(initialName);
  const [username, setUsername] = useState(initialUsername);
  const [bio, setBio] = useState(initialBio || "");
  const [website, setWebsite] = useState(initialWebsite || "");
  const [xProfile, setXProfile] = useState(initialXProfile || "");
  const [openForWork, setOpenForWork] = useState(initialOpenForWork);

  const handleSave = () => {
    // TODO: Connect to API & database in Phase 2
    console.log("Profile update (not yet persisted):", {
      name,
      username,
      bio,
      website,
      xProfile,
      openForWork,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button className="rounded-full" size="sm" variant="outline">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update how your profile appears on tracking.directory. Changes are not yet saved
            permanently – profile persistence will be added in the next phase.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="name">
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="username">
              Username
            </label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Used in your profile URL. Letters, numbers, and hyphens are recommended.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="bio">
              Bio
            </label>
            <Textarea
              id="bio"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about your experience with tracking, analytics, and digital engineering."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="website">
              Website
            </label>
            <Input
              id="website"
              type="url"
              placeholder="https://your-website.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="xProfile">
              X Profile
            </label>
            <Input
              id="xProfile"
              type="url"
              placeholder="https://x.com/your-profile"
              value={xProfile}
              onChange={(e) => setXProfile(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between rounded-md border border-border/50 bg-card/40 px-3 py-2">
            <div>
              <p className="text-sm font-medium">Open for work</p>
              <p className="text-xs text-muted-foreground">
                Show a badge on your profile to signal that you are available for new projects.
              </p>
            </div>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border border-border bg-background"
                checked={openForWork}
                onChange={(e) => setOpenForWork(e.target.checked)}
              />
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled>
            Save Profile (coming soon)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


