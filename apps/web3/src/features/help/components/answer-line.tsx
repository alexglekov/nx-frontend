import { Text } from '@radix-ui/themes'
import styles from '../help.module.scss'

export const AnswerLines = ({ answer }: { answer: JSX.Element }) => {
  return (
    <Text
      my='2'
      className={styles.accordionContentText}
    >
      {answer}
    </Text>
  )
}
