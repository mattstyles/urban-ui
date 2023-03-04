import {useMemo} from 'react'
import {LoremIpsum} from 'lorem-ipsum'
import Link from 'next/link'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

export function TextBlock({size = 5}: {size: number}) {
  const content = useMemo(() => {
    return Array.from({length: size}).map((_, idx) => {
      return <p key={idx}>{lorem.generateSentences(size)}</p>
    })
  }, [size])
  return <div>{content}</div>
}

export function NavBlock({size = 15}: {size: number}) {
  const content = useMemo(() => {
    return lorem
      .generateWords(size)
      .split(' ')
      .map((word, idx) => {
        return (
          <li key={idx}>
            <Link href='#'>{word}</Link>
          </li>
        )
      })
  }, [size])
  return (
    <nav>
      <ul style={{listStyleType: 'none'}}>{content}</ul>
    </nav>
  )
}
