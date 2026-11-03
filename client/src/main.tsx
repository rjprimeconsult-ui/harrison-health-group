import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import { getAttribution } from "./lib/measurement";
import { startSiteAnalytics } from "./lib/site-analytics";
import "./index.css";

getAttribution();
startSiteAnalytics();
const root = document.getElementById("root")!;
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
