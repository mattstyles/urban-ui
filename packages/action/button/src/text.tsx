import { Text, type TextProps } from '@urban-ui/text'

export function ButtonText({ children }: Pick<TextProps, 'children'>) {
  return (
    <Text weight="semibold" textBox="none">
      {children}
    </Text>
  )
}
ButtonText.displayName = '@urban-ui/button.text'
