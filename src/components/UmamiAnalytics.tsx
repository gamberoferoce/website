import Script from "next/script";

const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const scriptBaseUrl = process.env.NEXT_PUBLIC_UMAMI_URL ?? "https://cloud.umami.is";

export function UmamiAnalytics() {
  if (!websiteId) {
    return null;
  }

  return (
    <Script
      defer
      data-website-id={websiteId}
      src={`${scriptBaseUrl}/script.js`}
      strategy="afterInteractive"
    />
  );
}
