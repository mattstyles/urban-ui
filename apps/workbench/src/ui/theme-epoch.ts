import { createContext } from "react";

/**
 * Bumped by the app-shell theme switcher whenever a root-level theme bundle
 * changes. DOM-reading consumers (the scales inventory) key their reads on
 * it — CSS re-values instantly via custom properties, but a JS
 * getComputedStyle snapshot needs telling.
 */
export const ThemeEpochContext = createContext(0);
