"use client";

import { useEffect, useState } from "react";
import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  const [highlighted, setHighlighted] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamic import for shiki to avoid SSR issues
    import("shiki").then((shiki) => {
      shiki
        .codeToHtml(code, {
          lang: language,
          theme: "github-dark",
        })
        .then((html) => {
          setHighlighted(html);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error highlighting code:", error);
          // Fallback to plain code with basic formatting
          const escaped = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
          setHighlighted(`<pre class="shiki"><code class="language-${language}">${escaped}</code></pre>`);
          setLoading(false);
        });
    });
  }, [code, language]);

  if (loading) {
    return (
      <div className="rounded-lg border border-border/50 bg-muted/50 p-4">
        <div className="animate-pulse text-sm text-muted-foreground font-mono">Loading code...</div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100 z-10">
        <CopyButton text={code} />
      </div>
      <div
        className="rounded-lg border border-border/50 bg-[#0d1117] p-4 overflow-x-auto [&_pre]:m-0 [&_pre]:p-0 [&_pre]:bg-transparent [&_pre]:text-sm"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  );
}
