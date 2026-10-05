import { spawn } from "node:child_process";
import { publicPages } from "../shared/site";

const port = 4127;
const base = `http://127.0.0.1:${port}`;
const child = spawn(process.execPath, ["dist/index.js"], { cwd: process.cwd(), env: { ...process.env, PORT: String(port), NODE_ENV: "production" }, stdio: "pipe" });
const failures: string[] = [];
const check = (condition: boolean, message: string) => { if (!condition) failures.push(message); };
try {
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    try { const response = await fetch(base + "/"); if (response.ok) { ready = true; break; } } catch { /* server not ready */ }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  if (!ready) throw new Error("production server did not start");
  const googleMark = await fetch(base + "/google-maps-logo-white.svg");
  check(googleMark.status === 200 && (googleMark.headers.get("content-type") || "").includes("image/svg+xml"), `Google Maps attribution asset: ${googleMark.status} ${googleMark.headers.get("content-type")}`);
  for (const page of publicPages) {
    const response = await fetch(base + page.path);
    check(response.status === 200, `${page.path}: ${response.status}`);
    const html = await response.text();
    check(html.includes(page.title), `${page.path}: missing route-specific HTML`);
    check(page.indexable || response.headers.get("x-robots-tag") === "noindex, nofollow", `${page.path}: noindex header missing`);
  }
  for (const route of ["/admin/reviews", "/admin/reviews/index.html", "/unknown-ad-slug", "/resources/invalid-guide"]) {
    const response = await fetch(base + route);
    check(response.status === 404 && response.headers.get("x-robots-tag") === "noindex, nofollow", `${route}: expected true 404 and noindex`);
  }
  for (const route of ["/business/?gclid=abc&gbraid=xyz&wbraid=123&utm_source=google", "/business/index.html?gclid=abc", "/index.html?utm_medium=cpc"]) {
    const response = await fetch(base + route, { redirect: "manual" });
    check(response.status === 308, `${route}: expected 308`);
    check((response.headers.get("location") || "").includes(route.slice(route.indexOf("?"))), `${route}: query params not preserved`);
  }
  for (const userAgent of ["AdsBot-Google", "AdsBot-Google-Mobile", "Googlebot", "Mozilla/5.0 (Linux; Android 14; Pixel 7)"]) {
    const response = await fetch(base + "/business?gclid=abc&gbraid=xyz&wbraid=123&utm_source=google", { headers: { "User-Agent": userAgent } });
    check(response.status === 200, `${userAgent}: ${response.status}`);
  }
} finally {
  child.kill("SIGTERM");
}
if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log(`PASS production HTTP: ${publicPages.length} public 200 routes; admin/unknown true 404; permanent query-preserving redirects; AdsBot, Googlebot, Android user agents.`);
