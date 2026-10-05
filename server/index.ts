import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { getPage } from "../shared/site";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticPath = process.env.NODE_ENV === "production" ? path.resolve(__dirname, "public") : path.resolve(__dirname, "..", "dist", "public");
const app = express();
app.disable("x-powered-by");
app.use("/admin", (_req, res) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  return res.status(404).sendFile(path.join(staticPath, "404.html"));
});
app.get(/\/index\.html$/, (req, res) => {
  const target = req.path.replace(/\/index\.html$/, "") || "/";
  return res.redirect(308, target + (req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : ""));
});
app.use(express.static(staticPath, { index: false, redirect: false }));
app.get("*", (req, res) => {
  const pathname = req.path;
  if (pathname.length > 1 && pathname.endsWith("/")) return res.redirect(308, pathname.slice(0, -1) + (req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : ""));
  const page = getPage(pathname);
  if (page) {
    if (!page.indexable) res.setHeader("X-Robots-Tag", "noindex, nofollow");
    const file = pathname === "/" ? "index.html" : path.join(pathname.slice(1), "index.html");
    return res.sendFile(path.join(staticPath, file));
  }
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  return res.status(404).sendFile(path.join(staticPath, "404.html"));
});
const port = Number(process.env.PORT || 3000);
createServer(app).listen(port, "0.0.0.0", () => console.log(`Harrison site ready at http://0.0.0.0:${port}`));
