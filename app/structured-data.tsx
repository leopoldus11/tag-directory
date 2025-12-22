import { getAllBlueprints } from "@/lib/blueprints";
import { getBaseUrl } from "@/lib/env";

export function StructuredData() {
  const blueprints = getAllBlueprints();
  const baseUrl = getBaseUrl();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "tracking.directory",
    description: "Open-source library for tracking scripts and recipes",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/blueprints?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "tracking.directory",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      "https://github.com/leopoldus11/tag-directory",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}

