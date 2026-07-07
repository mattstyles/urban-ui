/**
 * The react-aria axe exception list (ADR-0006).
 *
 * axe-core reports documented false positives against some react-aria
 * patterns; exceptions are scoped per component and per rule — never global —
 * so a new component starts with the full rule set. Known cases to reach for
 * when a component legitimately trips axe:
 *
 * - "aria-required-children": react-aria virtualized collections render
 *   scroll spacers inside listbox/grid roles.
 * - "aria-hidden-focus": visually-hidden-but-focusable inputs used by some
 *   RAC form components.
 *
 * Every entry must carry a comment linking the upstream issue or docs — an
 * exception without provenance is a suppressed bug.
 */

const componentExceptions: Record<string, readonly string[]> = {
  // "react/<component>": ["rule-id"],
};

export function disabledAxeRules(entry: { pkg: string; component: string }): string[] {
  return [...(componentExceptions[`${entry.pkg}/${entry.component}`] ?? [])];
}
