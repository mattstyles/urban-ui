import {useMemo} from 'react'
import {LoremIpsum} from 'lorem-ipsum'

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
