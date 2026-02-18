import { JsonLd } from "./json-ld";
import { getSiteUrl } from "@/lib/metadata";

/**
 * JobPosting schema for job detail pages
 * Required for Google Jobs integration
 * @see https://schema.org/JobPosting
 * @see https://developers.google.com/search/docs/appearance/structured-data/job-posting
 */
interface JobPostingSchemaProps {
  title: string;
  description: string;
  slug: string;
  location: string;
  employmentType: string;
  datePosted?: string;
  salary?: string;
}

export function JobPostingSchema({
  title,
  description,
  slug,
  location,
  employmentType,
  datePosted,
  salary,
}: JobPostingSchemaProps) {
  const siteUrl = getSiteUrl();

  // Map employment type to schema.org format
  const employmentTypeMap: Record<string, string> = {
    "Full-time": "FULL_TIME",
    "Part-time": "PART_TIME",
    Contract: "CONTRACTOR",
    Internship: "INTERN",
    Freelance: "CONTRACTOR",
  };

  const postedDate = datePosted || new Date().toISOString().split("T")[0];
  // Valid for 90 days from posting
  const validThrough = new Date(
    new Date(postedDate).getTime() + 90 * 24 * 60 * 60 * 1000
  )
    .toISOString()
    .split("T")[0];

  const isRemote = location.toLowerCase().includes("remote");

  const jobPostingData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    url: `${siteUrl}/careers/${slug}`,
    datePosted: postedDate,
    validThrough,
    employmentType: employmentTypeMap[employmentType] || "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Invenex Solutions",
      sameAs: siteUrl,
      logo: `${siteUrl}/og-image.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: isRemote ? "Remote" : "Thrissur",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
    },
    applicantLocationRequirements: isRemote
      ? {
          "@type": "Country",
          name: "India",
        }
      : undefined,
    jobLocationType: isRemote ? "TELECOMMUTE" : undefined,
  };

  // Add salary if provided
  if (salary) {
    jobPostingData.baseSalary = {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: {
        "@type": "QuantitativeValue",
        value: salary,
        unitText: "YEAR",
      },
    };
  }

  // Remove undefined values for cleaner JSON
  const cleanedData = JSON.parse(JSON.stringify(jobPostingData));

  return <JsonLd data={cleanedData} />;
}
