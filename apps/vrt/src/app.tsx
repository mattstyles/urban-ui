import * as stylex from "@stylexjs/stylex";
import { useSyncExternalStore } from "react";
import { colors, radii, space } from "@urban-ui/theme/tokens.stylex";
import { findRenderable, type RenderableEntry, renderables } from "./registry.js";

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

// Hash routing by hand: Playwright needs one stable URL per renderable and a
// deep-linkable index for debugging — nothing that warrants a router.
function subscribeToHash(onChange: () => void): () => void {
  window.addEventListener("hashchange", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
  };
}

function currentRoute(): string {
  const hash = window.location.hash.replace(/^#/, "");
  return hash === "" ? "/" : hash;
}

function Index() {
  return (
    <main {...stylex.props(styles.page, styles.index)}>
      <h1>Urban UI VRT scenes</h1>
      <ul>
        {renderables.map((entry) => (
          <li key={entry.route}>
            <a href={`#${entry.route}`} {...stylex.props(styles.link)}>
              {entry.kind}: {entry.pkg}/{entry.component}/{entry.fileStem}/{entry.exportName}
            </a>
          </li>
        ))}
      </ul>
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

// No data-scene-ready here: a suite pointed at a missing route must time out
// loudly, not screenshot an error page.
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
  const route = useSyncExternalStore(subscribeToHash, currentRoute);
  if (route === "/") {
    return <Index />;
  }
  const entry = findRenderable(route);
  if (entry === undefined) {
    return <NotFound route={route} />;
  }
  return <RenderableView entry={entry} />;
}
