import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import styles from '../../table.module.scss'
import { useReactiveVar } from '@apollo/client'
import { userVar } from 'shared/store/user'

interface Props {
  text: string | number
  isCentered?: boolean
  className?: string
  userId?: string
}

export const TableItemAnyText: React.FC<Props> = ({
  text,
  isCentered = true,
  className = '',
  userId = ''
}) => {
  const user = useReactiveVar(userVar)

  const isCurrentUser = user?.id === userId

  return (
    <Flex
      height={'100%'}
      align={isCentered ? 'center' : 'start'}
      className={cn(styles.tableItemAnyText, className, {
        'color-yellow': isCurrentUser
      })}
    >
      <Text size={{ initial: '1', sm: '3' }}>{text}</Text>
    </Flex>
  )
}
