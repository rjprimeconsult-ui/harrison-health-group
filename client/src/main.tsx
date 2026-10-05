import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import { getAttribution } from "./lib/measurement";
import "./index.css";

getAttribution();
const root = document.getElementById("root")!;
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
