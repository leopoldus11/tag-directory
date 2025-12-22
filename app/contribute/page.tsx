"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check, ExternalLink, Github } from "lucide-react";

export default function ContributePage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    platform: "",
    type: "",
    content: "",
    description: "",
    difficulty: "",
    trigger: "",
    condition: "",
  });
  const [generatedJson, setGeneratedJson] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate slug from title
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    const id = slug;

    const blueprint = {
      id,
      slug,
      title: formData.title,
      author: formData.author,
      platform: formData.platform,
      type: formData.type,
      content: formData.content,
      community_verified: false,
      description: formData.description || undefined,
      difficulty: formData.difficulty || undefined,
      trigger: formData.trigger || undefined,
      condition: formData.condition || undefined,
    };

    // Basic validation
    if (!formData.title || !formData.author || !formData.platform || !formData.type || !formData.content) {
      alert("Please fill in all required fields.");
      return;
    }

    const json = JSON.stringify(blueprint, null, 2);
    setGeneratedJson(json);
  };

  const handleCopy = async () => {
    if (generatedJson) {
      await navigator.clipboard.writeText(generatedJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const platforms = ["GTM", "Adobe Launch", "Tealium", "GA4", "Meta", "Consent", "Server-Side", "Other"];
  const types = ["Tag", "Rule", "Snippet"];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight">Contribute to tracking.directory</h1>
          <p className="text-muted-foreground">
            Share your tracking blueprints with the community
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Path A: The Pro */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Github className="h-5 w-5" />
                <CardTitle>Path A: Fork & PR</CardTitle>
              </div>
              <CardDescription>
                For experienced contributors who prefer the GitHub workflow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Fork the repository on GitHub</li>
                <li>Create a new file in <code className="bg-muted px-1 rounded font-mono text-xs">src/content/blueprints/</code></li>
                <li>Follow the schema in <code className="bg-muted px-1 rounded font-mono text-xs">lib/schemas/blueprint.ts</code></li>
                <li>Submit a Pull Request</li>
                <li>Community reviews and merges</li>
              </ol>
              <Button asChild className="w-full rounded-full">
                <a
                  href="https://github.com/leopoldus11/tracking-directory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  Open GitHub Repository
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> Replace <code className="bg-muted px-1 rounded">leopoldus11</code> with your actual GitHub username in the code before deploying.
              </p>
            </CardContent>
          </Card>

          {/* Path B: The Form */}
          <Card>
            <CardHeader>
              <CardTitle>Path B: Generate JSON</CardTitle>
              <CardDescription>
                Fill out the form to generate a JSON for a GitHub issue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="GA4 Enhanced Ecommerce Tracking"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="author">GitHub Username *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="your-username"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="platform">Platform *</Label>
                    <Select
                      value={formData.platform}
                      onValueChange={(value) => setFormData({ ...formData, platform: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((platform) => (
                          <SelectItem key={platform} value={platform}>
                            {platform}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="type">Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {types.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="content">Code Snippet *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="gtag('event', 'purchase', {...});"
                    className="font-mono text-sm"
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of what this blueprint does"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="trigger">Trigger</Label>
                  <Input
                    id="trigger"
                    value={formData.trigger}
                    onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
                    placeholder="Page Load, Click, etc."
                  />
                </div>

                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Input
                    id="condition"
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    placeholder="All pages, Specific URL, etc."
                  />
                </div>

                <Button type="submit" className="w-full rounded-full">
                  Generate JSON
                </Button>
              </form>

              {generatedJson && (
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Generated JSON (copy and paste into GitHub issue)</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="gap-2 rounded-full"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="rounded-lg border border-border/50 bg-muted/50 p-4 text-xs font-mono overflow-x-auto">
                    <code>{generatedJson}</code>
                  </pre>
                  <p className="text-xs text-muted-foreground">
                    Copy this JSON and create a new{" "}
                    <a
                          href="https://github.com/leopoldus11/tracking-directory/issues/new?template=blueprint-proposal.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:underline"
                    >
                      GitHub Issue
                    </a>{" "}
                    using the "Blueprint Proposal" template.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>Note:</strong> Replace <code className="bg-muted px-1 rounded">leopoldus11</code> with your actual GitHub username before deploying.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
