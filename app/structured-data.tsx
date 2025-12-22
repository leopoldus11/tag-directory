import { getAllBlueprints } from "@/lib/blueprints";

export function StructuredData() {
  const blueprints = getAllBlueprints();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tracking.directory";

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
      "https://github.com/leopoldus11/tracking-directory",
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

