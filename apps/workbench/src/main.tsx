import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app.js";
import "./index.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Workbench root element missing");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
