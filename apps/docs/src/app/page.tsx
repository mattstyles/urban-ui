import {Content} from './content.tsx'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Content />
    </main>
  )
}
