// Per-route document metadata.
//
// React 19 hoists <title>, <meta>, <link rel="canonical">, and certain other
// head tags from anywhere in the tree directly into <head>. So we just render
// them inside a component and they end up where browsers + crawlers expect.
//
// Pattern: render <SEO ... /> exactly once per page (LandingPage, ContactPage).
// Never use it twice in the same render — duplicate tags will appear.
const SITE = "https://geargrid.live";

export default function SEO({
  title,
  description,
  path = "/",
  // Override only if a route has a specific social-share image.
  // Prefer PNG — some crawlers (notably Facebook + some link-preview services)
  // don't render SVG OG images reliably. The PNG is build-time generated from
  // the SVG via `sips` (see README / build script).
  image = "/og-image.png",
  type = "website",
  // Pass a JSON-serialisable object to inject a JSON-LD script for this page.
  // It will be hoisted by React 19 like other head tags.
  jsonLd,
  noIndex = false,
}) {
  const url = `${SITE}${path.startsWith("/") ? path : `/${path}`}`;
  const fullTitle = title
    ? `${title} — GearGrid`
    : "GearGrid — The OS for equipment rental businesses";
  const desc =
    description ||
    "GearGrid is a multi-tenant rental platform that unifies inventory, contracts, maintenance, and accounting. Built for modern equipment rental businesses.";
  const imageUrl = image.startsWith("http") ? image : `${SITE}${image}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="GearGrid" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Page-scoped JSON-LD (Organization / etc. lives in index.html so
          non-JS crawlers always see it; page-specific schemas come from here.) */}
      {jsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}
