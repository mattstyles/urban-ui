import { Container } from '@internal/container'

export default function InternalPage() {
  return (
    <div>
      <h1>Internal Packages Test</h1>
      <p>Testing StyleX compilation across package boundaries</p>

      <h2>Container with nested Item</h2>
      <Container>
        <p>This text is inside the Container</p>
      </Container>
    </div>
  )
}
