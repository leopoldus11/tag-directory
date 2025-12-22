"use client";

import { TrackingBlueprint } from "@/lib/schemas/blueprint";
import { CodeBlock } from "./code-block";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, Copy, Check } from "lucide-react";
import { useState } from "react";
import { CopyButton } from "./copy-button";
import Link from "next/link";

interface BlueprintDisplayProps {
  blueprint: TrackingBlueprint;
  githubRepo?: string; // e.g., "leopoldus11/tag-directory"
}

export function BlueprintDisplay({ blueprint, githubRepo = "leopoldus11/tag-directory" }: BlueprintDisplayProps) {
  const [copied, setCopied] = useState(false);

  // Determine display order based on platform
  const isGTM = blueprint.platform === "GTM";
  const isAdobeLaunch = blueprint.platform === "Adobe Launch" || blueprint.platform === "Tealium";

  // Get GitHub file URL
  const getGitHubUrl = () => {
    if (blueprint.filePath) {
      return `https://github.com/${githubRepo}/blob/main/${blueprint.filePath}`;
    }
    // Fallback: construct from slug
    return `https://github.com/${githubRepo}/blob/main/src/content/blueprints/${blueprint.slug}.json`;
  };

  // Get triggers/events (support both new array format and legacy string format)
  // For GTM: use "triggers", for Adobe Launch: use "events"
  const triggers = blueprint.triggers || (blueprint.trigger ? [{ name: blueprint.trigger, type: "Trigger" }] : []);
  const events = (blueprint as any).events || []; // Adobe Launch uses "events"

  // Get conditions (support both new array format and legacy string format)
  const conditions = blueprint.conditions || (blueprint.condition ? [{ condition: blueprint.condition }] : []);

  // Get exceptions (GTM-specific)
  const exceptions = blueprint.exceptions || [];

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(blueprint.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <div className="mb-4 flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="font-normal">{blueprint.platform}</Badge>
          <Badge variant="outline" className="font-normal">{blueprint.type}</Badge>
          {blueprint.difficulty && (
            <Badge variant="outline" className="font-normal">{blueprint.difficulty}</Badge>
          )}
          {blueprint.community_verified && (
            <Badge variant="default" className="font-normal">✓ Verified</Badge>
          )}
          {blueprint.executionOrder && (
            <Badge variant="outline" className="font-normal">Order: {blueprint.executionOrder}</Badge>
          )}
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="mb-4 text-4xl font-semibold tracking-tight">{blueprint.title}</h1>
            {blueprint.description && (
              <p className="text-base text-muted-foreground leading-relaxed">{blueprint.description}</p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="rounded-full"
          >
            <a
              href={getGitHubUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              View Source
            </a>
          </Button>
        </div>
      </div>

      {/* Platform-Specific Configuration Display */}
      {isGTM ? (
        // GTM Display Order: Tag Type → Code → Triggers → Exceptions
        <>
          {/* Tag Type (GTM-specific) */}
          {blueprint.tagType && (
            <div className="rounded-lg border border-border/50 bg-card/50 p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tag Type</h3>
              <p className="text-sm font-medium">{blueprint.tagType}</p>
            </div>
          )}

          {/* Code Section */}
          <div className="rounded-lg border border-border/50 bg-card/50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Code</h2>
              <CopyButton text={blueprint.content} />
            </div>
            <CodeBlock code={blueprint.content} language="javascript" />
          </div>

          {/* Triggers Section */}
          {triggers.length > 0 && (
            <div className="rounded-lg border border-border/50 bg-card/50 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Firing Triggers</h3>
              <div className="space-y-3">
                {triggers.map((trigger: any, index: number) => (
                  <div key={index} className="rounded-md border border-border/30 bg-muted/30 p-3">
                    <div className="mb-1 flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium">{trigger.name}</span>
                      {trigger.type && (
                        <Badge variant="outline" className="text-xs">{trigger.type}</Badge>
                      )}
                      {trigger.eventName && (
                        <Badge variant="secondary" className="text-xs font-mono bg-primary/10 text-primary">
                          Event: {trigger.eventName}
                        </Badge>
                      )}
                    </div>
                    {trigger.description && (
                      <p className="text-xs text-muted-foreground">{trigger.description}</p>
                    )}
                    {/* Trigger Conditions (GTM-specific filters) */}
                    {trigger.conditions && trigger.conditions.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <p className="text-xs font-semibold text-muted-foreground">Trigger Conditions:</p>
                        {trigger.conditions.map((cond: any, condIndex: number) => (
                          <div key={condIndex} className="text-xs font-mono text-muted-foreground pl-2 border-l-2 border-border/30">
                            {cond.condition ? (
                              cond.condition
                            ) : (
                              `${cond.variable || 'Variable'} ${cond.operator || 'operator'} ${cond.value || 'value'}`
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exceptions Section (GTM-specific) */}
          {exceptions.length > 0 && (
            <div className="rounded-lg border border-border/50 bg-card/50 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Exceptions</h3>
              <p className="mb-3 text-xs text-muted-foreground">These conditions prevent the tag from firing:</p>
              <div className="space-y-3">
                {exceptions.map((exception, index) => (
                  <div key={index} className="rounded-md border border-amber-500/20 bg-amber-500/5 p-3">
                    {exception.name && (
                      <div className="mb-1 text-sm font-medium text-amber-400">{exception.name}</div>
                    )}
                    <p className="text-xs font-mono text-muted-foreground">{exception.condition}</p>
                    {exception.description && (
                      <p className="mt-1 text-xs text-muted-foreground">{exception.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : isAdobeLaunch ? (
        // Adobe Launch / Tealium Display Order: Events → Conditions → Code
        <>
          {/* Events Section (Adobe Launch uses "Events", not "Triggers") */}
          {(events.length > 0 || triggers.length > 0) && (
            <div className="rounded-lg border border-border/50 bg-card/50 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Events</h3>
              <p className="mb-3 text-xs text-muted-foreground">Rule fires when ANY of these events occur (OR logic):</p>
              <div className="space-y-3">
                {(events.length > 0 ? events : triggers).map((event: any, index: number) => (
                  <div key={index} className="rounded-md border border-border/30 bg-muted/30 p-3">
                    <div className="mb-1 flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium">{event.name}</span>
                      {event.type && (
                        <Badge variant="outline" className="text-xs">{event.type}</Badge>
                      )}
                      {event.eventName && (
                        <Badge variant="secondary" className="text-xs font-mono bg-primary/10 text-primary">
                          Event: {event.eventName}
                        </Badge>
                      )}
                    </div>
                    {event.description && (
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conditions Section */}
          {conditions.length > 0 && (
            <div className="rounded-lg border border-border/50 bg-card/50 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Conditions</h3>
              <p className="mb-3 text-xs text-muted-foreground">ALL conditions must return true for the rule to execute actions (AND logic):</p>
              <div className="space-y-3">
                {conditions.map((condition: any, index: number) => (
                  <div key={index} className="rounded-md border border-border/30 bg-muted/30 p-3">
                    <div className="mb-1 flex items-center gap-2 flex-wrap">
                      {condition.name && (
                        <span className="text-sm font-medium">{condition.name}</span>
                      )}
                      {condition.type && (
                        <Badge variant="outline" className="text-xs">{condition.type}</Badge>
                      )}
                    </div>
                    <p className="text-xs font-mono text-muted-foreground">{condition.condition}</p>
                    {condition.description && (
                      <p className="mt-1 text-xs text-muted-foreground">{condition.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Code Section */}
          <div className="rounded-lg border border-border/50 bg-card/50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Code</h2>
              <CopyButton text={blueprint.content} />
            </div>
            <CodeBlock code={blueprint.content} language="javascript" />
          </div>
        </>
      ) : (
        // Default Display: Code → Triggers → Conditions (for GA4, Meta, etc.)
        <>
          {/* Code Section */}
          <div className="rounded-lg border border-border/50 bg-card/50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Code</h2>
              <CopyButton text={blueprint.content} />
            </div>
            <CodeBlock code={blueprint.content} language="javascript" />
          </div>

          {/* Triggers Section */}
          {triggers.length > 0 && (
            <div className="rounded-lg border border-border/50 bg-card/50 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Triggers</h3>
              <div className="space-y-2">
                {triggers.map((trigger, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{trigger.name}</span>
                    {trigger.description && (
                      <span className="text-muted-foreground"> - {trigger.description}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conditions Section */}
          {conditions.length > 0 && (
            <div className="rounded-lg border border-border/50 bg-card/50 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Conditions</h3>
              <div className="space-y-2">
                {conditions.map((condition, index) => (
                  <div key={index} className="text-sm font-mono text-muted-foreground">
                    {condition.condition}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Metadata Section */}
      <div className="flex items-center gap-4 text-[12px] text-muted-foreground font-mono border-t border-border/50 pt-4">
        <span>
          {Array.isArray(blueprint.author) 
            ? blueprint.author.map((author, idx) => (
                <span key={idx}>
                  {idx > 0 && ', '}
                  <Link href={`/members/${author}`} className="hover:text-foreground transition-colors">{author}</Link>
                </span>
              ))
            : <Link href={`/members/${blueprint.author}`} className="hover:text-foreground transition-colors">{blueprint.author}</Link>
          }
        </span>
        {blueprint.createdAt && (
          <>
            <span>•</span>
            <span>{new Date(blueprint.createdAt).toLocaleDateString()}</span>
          </>
        )}
        {blueprint.tags && blueprint.tags.length > 0 && (
          <>
            <span>•</span>
            <div className="flex gap-1">
              {blueprint.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

