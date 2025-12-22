import { getAllBlueprints } from "@/lib/blueprints";

export function StructuredData() {
  const blueprints = getAllBlueprints();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tag.directory";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "tag.directory",
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
    name: "tag.directory",
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

