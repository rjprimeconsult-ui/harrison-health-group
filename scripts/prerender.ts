import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../client/src/App";
import { publicPages, indexablePages, site } from "../shared/site";
import { injectMeta } from "../shared/seo";

const output = join(process.cwd(), "dist", "public");
const template = await readFile(join(output, "index.html"), "utf8");
const render = async (route: string, file: string) => {
  const content = renderToString(React.createElement(App, { ssrPath: route }));
  const html = injectMeta(template, route).replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  if (!html.includes('<div id="root"><')) throw new Error(`SSR returned no content for ${route}`);
  const destination = join(output, file);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html);
  console.log(`${route} → ${file} (${content.length} chars)`);
};
for (const page of publicPages) await render(page.path, page.path === "/" ? "index.html" : `${page.path.slice(1)}/index.html`);
await render("/404", "404.html");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexablePages.map((page) => `  <url><loc>${site.origin}${page.path}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile(join(output, "sitemap.xml"), sitemap);
await writeFile(join(output, "route-manifest.json"), JSON.stringify({ canonicalOrigin: site.origin, routes: publicPages.map(({ path, indexable, kind }) => ({ path, indexable, kind })) }, null, 2) + "\n");
console.log(`Generated ${publicPages.length} public routes, 404, sitemap and route manifest; admin route excluded from production.`);
