import { FC } from 'react'
import { Button, Flex, Heading } from '@radix-ui/themes'
import styles from '../table.module.scss'

interface Props {
  headingText: string
  children?: React.ReactNode
}
export const XyroTableHeader: FC<Props> = ({ headingText, children }) => {
  return (
    <Flex
      align={'center'}
      gap={'5'}
      justify={'between'}
    >
      <Heading
        weight={'medium'}
        as='h3'
        size={{ initial: '5', sm: '7' }}
        className={styles.tableTitle}
      >
        {headingText}
      </Heading>

      <Flex
        align={'center'}
        gap={'5'}
      >
        {children}
      </Flex>
    </Flex>
  )
}
