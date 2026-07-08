import { useLayoutEffect, useRef, useState } from "react";

/**
 * Resolve StyleX token references (`var(--hash)` strings) to their authored
 * values by reading custom properties off a live element. Reading the DOM —
 * rather than importing a parallel value table — means the inventory reports
 * whatever actually applies at that point in the tree, including scoped
 * theme overrides on an ancestor.
 */

const VAR_PATTERN = /^var\((--[^),\s]+)/;

function resolveToken(element: Element, token: string): string {
  const name = VAR_PATTERN.exec(token)?.[1];
  if (name === undefined) {
    // A literal value (defineConsts inlines), not a var reference.
    return token;
  }
  return getComputedStyle(element).getPropertyValue(name).trim();
}

export function useTokenValues(tokens: Record<string, string>): {
  ref: (element: HTMLElement | null) => void;
  values: Record<string, string> | undefined;
} {
  const elementRef = useRef<HTMLElement | null>(null);
  const [values, setValues] = useState<Record<string, string>>();
  // Token groups are module-level defineVars objects, so identity is stable
  // and the effect runs once per mounted group.
  useLayoutEffect(() => {
    const element = elementRef.current;
    if (element === null) {
      return;
    }
    const read = () => {
      const resolved: Record<string, string> = {};
      for (const [name, token] of Object.entries(tokens)) {
        // VarGroups carry internal dunder keys (__varGroupHash__) — skip.
        if (name.startsWith("__")) {
          continue;
        }
        resolved[name] = resolveToken(element, token);
      }
      setValues((previous) => {
        if (
          previous !== undefined &&
          Object.entries(resolved).every(([name, value]) => previous[name] === value)
        ) {
          return previous;
        }
        return resolved;
      });
    };
    read();
    // Dev injects module styles asynchronously (createTheme classes can land
    // after mount), so settle with a post-paint re-read.
    const frame = requestAnimationFrame(read);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [tokens]);
  return {
    ref: (element) => {
      elementRef.current = element;
    },
    values,
  };
}
