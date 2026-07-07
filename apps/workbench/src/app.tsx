import * as stylex from "@stylexjs/stylex";
import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  RouterProvider,
  useLocation,
} from "@tanstack/react-router";
import { colors, radii, space } from "@urban-ui/theme/tokens.stylex";
import { type RenderableEntry, renderables } from "./registry.js";

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
  // A tight, padded frame around the renderable so it presents with
  // consistent margins against the page background.
  sceneRoot: {
    backgroundColor: colors.surface,
    borderRadius: radii.control,
    display: "inline-block",
    padding: space.md,
  },
  // Scene pages must be valid pages in their own right: a visually-hidden h1
  // names the renderable without entering the framed element.
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
                <Link to={entry.route} {...stylex.props(styles.link)}>
                  {entry.kind}: {entry.fileStem}/{entry.exportName}
                </Link>
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
  return (
    <main {...stylex.props(styles.page)}>
      <h1 {...stylex.props(styles.visuallyHidden)}>
        {entry.kind}: {entry.pkg}/{entry.component}/{entry.fileStem}/{entry.exportName}
      </h1>
      <div {...stylex.props(styles.sceneRoot)}>
        <Renderable />
      </div>
    </main>
  );
}

function NotFound() {
  const { pathname } = useLocation();
  return (
    <main {...stylex.props(styles.page)}>
      <h1>No renderable at {pathname}</h1>
      <Link to="/" {...stylex.props(styles.link)}>
        Back to index
      </Link>
    </main>
  );
}

// The registry maps onto real route definitions — one route per renderable
// export — derived from tooling/paths.ts routeFor().
const rootRoute = createRootRoute({
  notFoundComponent: NotFound,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
});

const renderableRoutes = renderables.map((entry) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: entry.route,
    component: () => <RenderableView entry={entry} />,
  }),
);

// Hash history keeps deep links working on static hosting (GitHub Pages)
// with no history fallback.
const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute, ...renderableRoutes]),
  history: createHashHistory(),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return <RouterProvider router={router} />;
}
