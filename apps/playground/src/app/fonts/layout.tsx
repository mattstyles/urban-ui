/**
 * Stylesheet links are unsupported via metadata. (They suggest to load it in the body)[https://nextjs.org/docs/app/api-reference/functions/generate-metadata#unsupported-metadata].
 */
export default function FontsLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://use.typekit.net/euz1nns.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cloud.typography.com/6111354/643726/css/fonts.css"
      />

      {children}
    </>
  )
}
