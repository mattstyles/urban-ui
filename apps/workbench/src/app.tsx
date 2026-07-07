import * as stylex from "@stylexjs/stylex";
import { colors, radii, space } from "@urban-ui/theme/tokens.stylex";
import { useEffect, useState } from "react";
import { findRenderable, type RenderableEntry, renderables } from "./registry.js";

// Hash-based routing keeps deep links working on static hosting (GitHub
// Pages) with no history fallback, and gives Playwright stable URLs.
const readRoute = () => window.location.hash.replace(/^#/, "") || "/";

function useHashRoute(): string {
  const [route, setRoute] = useState(readRoute);
  useEffect(() => {
    const onHashChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return route;
}

const styles = stylex.create({
  page: {
    backgroundColor: colors.surface,
    color: colors.text,
    minHeight: "100vh",
    padding: space.lg,
  },
  index: {
    display: "flex",
    flexDirection: "column",
    gap: space.md,
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: space.sm,
  },
  link: {
    color: colors.accent,
  },
  // The VRT capture box: a tight, padded frame around the renderable so
  // element screenshots carry consistent margins without viewport noise.
  sceneRoot: {
    backgroundColor: colors.surface,
    borderRadius: radii.control,
    display: "inline-block",
    padding: space.md,
  },
  // Scene pages must be valid pages in their own right (axe rides every
  // route): a visually-hidden h1 names the renderable without entering the
  // captured element.
  visuallyHidden: {
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  },
});

function Index() {
  const groups = new Map<string, RenderableEntry[]>();
  for (const entry of renderables) {
    const key = `${entry.pkg}/${entry.component}`;
    const group = groups.get(key) ?? [];
    group.push(entry);
    groups.set(key, group);
  }
  return (
    <main {...stylex.props(styles.page, styles.index)}>
      <h1>Urban UI workbench</h1>
      {[...groups.entries()].map(([key, entries]) => (
        <section key={key} {...stylex.props(styles.group)}>
          <h2>{key}</h2>
          <ul>
            {entries.map((entry) => (
              <li key={entry.route}>
                <a href={`#${entry.route}`} {...stylex.props(styles.link)}>
                  {entry.kind}: {entry.fileStem}/{entry.exportName}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

function RenderableView({ entry }: { entry: RenderableEntry }) {
  const Renderable = entry.Component;
  // data-scene-ready is the VRT navigation guard (right route, module
  // rendered); data-scene-root is the element the baseline captures.
  return (
    <main {...stylex.props(styles.page)} data-scene-ready>
      <h1 {...stylex.props(styles.visuallyHidden)}>
        {entry.kind}: {entry.pkg}/{entry.component}/{entry.fileStem}/{entry.exportName}
      </h1>
      <div data-scene-root {...stylex.props(styles.sceneRoot)}>
        <Renderable />
      </div>
    </main>
  );
}

function NotFound({ route }: { route: string }) {
  return (
    <main {...stylex.props(styles.page)}>
      <h1>No renderable at {route}</h1>
      <a href="#/" {...stylex.props(styles.link)}>
        Back to index
      </a>
    </main>
  );
}

export function App() {
  const route = useHashRoute();
  if (route === "/") {
    return <Index />;
  }
  const entry = findRenderable(route);
  return entry ? <RenderableView entry={entry} /> : <NotFound route={route} />;
}
