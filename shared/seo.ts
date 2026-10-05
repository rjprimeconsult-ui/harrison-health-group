import { getPage, site, type PageMeta } from "./site";

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
const json = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

export function renderMeta(path: string): string {
  const page = getPage(path);
  const meta: PageMeta = page ?? {
    path,
    title: "Page Not Found | Harrison Health Group",
    description: "The requested page was not found. Return to the Harrison Health Group homepage.",
    kind: "legal",
    indexable: false,
  };
  const url = site.origin + (page ? page.path : path);
  const organization = {
    "@type": "Organization",
    "@id": `${site.origin}/#organization`,
    name: site.name,
    url: site.origin,
    email: site.email,
    telephone: "+1-954-600-0342",
    logo: `${site.origin}/favicon-192x192.png`,
  };
  const webpage = {
    "@type": meta.kind === "article" ? "Article" : "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    isPartOf: { "@id": `${site.origin}/#website` },
    publisher: { "@id": `${site.origin}/#organization` },
  };
  const graph = page ? [organization, { "@type": "WebSite", "@id": `${site.origin}/#website`, name: site.name, url: site.origin }, webpage] : [];
  return [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" content="${meta.indexable ? "index,follow,max-image-preview:large" : "noindex,nofollow"}" />`,
    page ? `<link rel="canonical" href="${escapeHtml(url)}" />` : "",
    `<meta property="og:type" content="${meta.kind === "article" ? "article" : "website"}" />`,
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:image" content="${site.origin}/favicon-192x192.png" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    graph.length ? `<script type="application/ld+json">${json({ "@context": "https://schema.org", "@graph": graph })}</script>` : "",
  ].filter(Boolean).join("\n    ");
}

export function injectMeta(html: string, path: string) {
  const marker = /<!-- SITE_META_START -->[\s\S]*?<!-- SITE_META_END -->/;
  if (!marker.test(html)) throw new Error("Missing SITE_META markers");
  return html.replace(marker, `<!-- SITE_META_START -->\n    ${renderMeta(path)}\n    <!-- SITE_META_END -->`);
}
