import { Flex } from '@radix-ui/themes'
import { DotTitle, RadixText } from 'shared/ui'
import styles from '../../mode-setups.module.scss'

export const SetupsGameResultStat = ({
  title,
  statText
}: {
  title: string
  statText: string
}) => {
  return (
    <Flex
      align={'center'}
      justify={'between'}
    >
      <DotTitle>{title}</DotTitle>
      <RadixText
        size={'2'}
        weight={'bold'}
        className={styles.gameResultStatText}
      >
        {statText}
      </RadixText>
    </Flex>
  )
}
