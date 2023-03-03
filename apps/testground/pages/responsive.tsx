import {styled} from '@urban-ui/theme'
import {Spacer} from '@urban-ui/spacer'

const Block = styled('div', {
  size: 100,
  margin: 8,

  variants: {
    color: {
      red: {
        background: 'red',
      },
      blue: {
        background: 'blue',
      },
      orange: {
        background: 'orange',
      },
      purple: {
        background: 'purple',
      },
      hotpink: {
        background: 'hotpink',
      },
      aqua: {
        background: 'aqua',
      },
    },
  },
})

const Block2 = styled('div', {
  size: 100,
  borderRadius: '$round',
  margin: 8,

  background: 'blue',

  '@lg': {
    background: 'purple',
  },
})

export default function ResponsiveTest() {
  return (
    <div style={{padding: 8, maxWidth: 480}}>
      <style>{`
        dl {
          width: 200px;
        }
        dt, dd {
          float: left;
          width: 50%;
        }
        dt {
          font-weight: bold;
        }
      `}</style>
      <p>
        These block responds to changes in variant based on media variants
        defined at the callsite.
      </p>
      <dl>
        <dt>Initial</dt>
        <dd>Blue</dd>
        <dt>Small</dt>
        <dd>Red</dd>
        <dt>Medium</dt>
        <dd>Orange</dd>
        <dt>Large</dt>
        <dd>Purple</dd>
      </dl>
      <p style={{fontStyle: 'italic'}}>
        Note that sm, md, and large, cover all cases so initial will always be
        overwritten here (which is desired).
      </p>
      <Block
        color={{
          '@initial': 'blue',
          '@sm': 'red',
          '@md': 'orange',
          '@lg': 'purple',
        }}
      />
      <p>Small variant only.</p>
      <Block
        color={{
          '@initial': 'blue',
          '@sm': 'red',
        }}
      />
      <p>Large variant only.</p>
      <Block
        color={{
          '@initial': 'blue',
          '@lg': 'purple',
        }}
      />

      <Spacer size='lg' />
      <p>
        Media config also supports a few other queries, try setting dark or
        light mode for the next block.
      </p>
      <Block color={{'@initial': 'hotpink', '@dark': 'aqua'}} />

      <Spacer size='lg' />
      <p>
        This next block specifies its own response to changes in window size.
      </p>
      <Block2 />
    </div>
  )
}
