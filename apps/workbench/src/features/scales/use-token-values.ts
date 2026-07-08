import { useLayoutEffect, useRef, useState } from "react";

/**
 * Resolve StyleX token references (`var(--hash)` strings) to their authored
 * values by reading custom properties off a live element. Reading the DOM —
 * rather than importing a parallel value table — means the inventory reports
 * whatever actually applies at that point in the tree, including scoped
 * theme overrides on an ancestor.
 */

const VAR_PATTERN = /^var\((--[^),\s]+)/;

/**
 * A token group's member entries, with StyleX's internal dunder keys
 * (__varGroupHash__) stripped. The one place that knows about the internal
 * key convention.
 */
export function tokenEntries(tokens: Record<string, string>): [string, string][] {
  return Object.entries(tokens).filter(([name]) => !name.startsWith("__"));
}

function resolveToken(style: CSSStyleDeclaration, token: string): string {
  const name = VAR_PATTERN.exec(token)?.[1];
  if (name === undefined) {
    // A literal value (defineConsts inlines), not a var reference.
    return token;
  }
  return style.getPropertyValue(name).trim();
}

export function useTokenValues(tokens: Record<string, string>): {
  ref: (element: HTMLElement | null) => void;
  values: Record<string, string> | undefined;
} {
  const elementRef = useRef<HTMLElement | null>(null);
  const [values, setValues] = useState<Record<string, string>>();
  // Callers build the token record inline per render, so key the effect on
  // the var references themselves — stable for a given group — rather than
  // on object identity.
  const tokensRef = useRef(tokens);
  tokensRef.current = tokens;
  const key = tokenEntries(tokens)
    .map(([name, token]) => `${name}:${token}`)
    .join("|");
  useLayoutEffect(() => {
    const element = elementRef.current;
    if (element === null) {
      return;
    }
    // Live declaration: one style flush per group, and later reads reflect
    // styles injected after mount.
    const style = getComputedStyle(element);
    const read = () => {
      const resolved: Record<string, string> = {};
      for (const [name, token] of tokenEntries(tokensRef.current)) {
        resolved[name] = resolveToken(style, token);
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
  }, [key]);
  return {
    ref: (element) => {
      elementRef.current = element;
    },
    values,
  };
}
