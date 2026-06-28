/**
 * @qixu/seo — JSON-LD Structured Data generators.
 *
 * Supports: EducationalOrganization, WebSite, FAQPage, Course, Person.
 * All outputs are valid schema.org JSON-LD objects.
 */

export function makeOrganizationJSON(brand: {
  name: string; nameEn: string; url: string; slogan: string; description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: brand.name,
    alternateName: brand.nameEn,
    url: brand.url,
    slogan: brand.slogan,
    description: brand.description,
    sameAs: [] as string[],
  };
}

export function makeWebsiteJSON(brand: { name: string; url: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: brand.url,
    description: brand.description,
    potentialAction: {
      "@type": "SearchAction",
      "target": { "@type": "EntryPoint", urlTemplate: `${brand.url}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function makeFAQPageJSON(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function makeCourseJSON(course: {
  name: string; description: string; provider: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: { "@type": "EducationalOrganization", name: course.provider },
  };
}

export function makePersonJSON(person: {
  name: string; jobTitle: string; school: string; bio: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    affiliation: { "@type": "EducationalOrganization", name: person.school },
    description: person.bio,
  };
}

export function makeBreadcrumbJSON(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
