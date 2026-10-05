import { access, readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { indexablePages, publicPages, site } from "../shared/site";

const root = join(process.cwd(), "dist", "public");
const fail: string[] = [];
const managedAssets = new Set<string>();
const known = new Set([...publicPages.map((page) => page.path), "/admin/reviews", "/404", "/sitemap.xml", "/robots.txt", "/llms.txt", "/favicon.ico"]);
const titleSet = new Set<string>();
for (const page of publicPages) {
  const path = join(root, page.path === "/" ? "index.html" : `${page.path.slice(1)}/index.html`);
  const html = await readFile(path, "utf8");
  const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
  if (!title || titleSet.has(title)) fail.push(`${page.path}: absent or duplicated title`);
  titleSet.add(title);
  if (!html.match(/<div id="root"><[a-z]/)) fail.push(`${page.path}: no prerendered body`);
  if ((html.match(/<h1\b/g) || []).length !== 1) fail.push(`${page.path}: expected one H1`);
  if ((html.match(/rel="canonical"/g) || []).length !== 1) fail.push(`${page.path}: expected one canonical`);
  if (!html.includes(`href="${site.origin}${page.path}"`)) fail.push(`${page.path}: wrong canonical`);
  if (!html.includes(`content="${page.indexable ? "index,follow" : "noindex,nofollow"}`)) fail.push(`${page.path}: wrong indexing`);
  for (const match of html.matchAll(/href="(\/[a-zA-Z0-9\-_/]+)"/g)) {
    const target = match[1].replace(/\/$/, "") || "/";
    if (!known.has(target) && !target.startsWith("/favicon-") && !target.startsWith("/assets/")) fail.push(`${page.path}: broken link ${target}`);
  }
  for (const match of html.matchAll(/(?:src|href)="(\/[a-zA-Z0-9._\-/]+)"/g)) {
    const asset = match[1];
    if (asset.startsWith("/manus-storage/")) { managedAssets.add(asset); continue; }
    if (!/\.(?:png|jpg|jpeg|webp|svg|ico|js|css)$/.test(asset)) continue;
    try { await access(join(root, asset.slice(1))); } catch { fail.push(`${page.path}: missing local asset ${asset}`); }
  }
}
const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
if (JSON.stringify(urls) !== JSON.stringify(indexablePages.map((page) => site.origin + page.path))) fail.push("sitemap has unexpected or missing URLs");
const robots = await readFile(join(root, "robots.txt"), "utf8");
if (!robots.includes("AdsBot-Google") || !robots.includes("Disallow: /admin/")) fail.push("robots missing AdsBot/admin rules");
const notFound = await readFile(join(root, "404.html"), "utf8");
if (!notFound.includes("404 / Not found") || !notFound.includes('content="noindex,nofollow"')) fail.push("404 missing content or noindex");
try { await access(join(root, "admin", "reviews", "index.html")); fail.push("unauthenticated admin HTML was emitted"); } catch { /* expected: no production admin page */ }
for (const asset of await readdir(join(root, "assets"))) {
  if (!asset.endsWith(".js")) continue;
  const js = await readFile(join(root, "assets", asset), "utf8");
  if (js.includes("Rafael helped me find a plan") || js.includes("saved my family $400/month")) fail.push(`legacy review seed leaked into ${asset}`);
}
if (process.env.QA_ASSET_BASE) {
  for (const asset of managedAssets) {
    const response = await fetch(process.env.QA_ASSET_BASE + asset, { method: "HEAD" });
    if (!response.ok) fail.push(`managed asset unavailable at ${process.env.QA_ASSET_BASE}: ${asset} (${response.status})`);
  }
}
if (fail.length) { console.error(fail.join("\n")); process.exit(1); }
console.log(`PASS: ${publicPages.length} prerendered routes, single H1/title/canonical, indexing, internal links, ${managedAssets.size} managed asset references, sitemap, robots, and 404.`);
