export function Foo({children}: React.PropsWithChildren) {
  return (
    <div>
      <h2>{children}</h2>
    </div>
  )
}
