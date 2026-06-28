export { generateMetadata } from "./metadata";
export type { SEOPageInput } from "./metadata";
export {
  makeOrganizationJSON, makeWebsiteJSON, makeFAQPageJSON,
  makeCourseJSON, makePersonJSON, makeBreadcrumbJSON,
} from "./jsonld";
export { makeGEODescription, makeGEOHeadings } from "./geo";
export type { GEOArticle, GEOSection } from "./geo";
