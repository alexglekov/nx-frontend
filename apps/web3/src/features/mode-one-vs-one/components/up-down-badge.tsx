import { FC, useMemo } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'

import { DownIcon, UpIcon } from 'shared/icons'

import styles from '../mode-one-vs-one.module.scss'

interface Props {
  isLong: boolean
}

export const UpDownBadge: FC<Props> = ({ isLong }) => {
  const title = useMemo(() => (isLong ? 'UP' : 'DOWN'), [isLong])

  return (
    <Flex
      align={'center'}
      justify={'center'}
      className={cn(styles.upDownBadge, {
        [styles.upDownBadgeGreen]: isLong
      })}
    >
      {isLong ?
        <UpIcon />
      : <DownIcon />}

      <Text
        className={styles.upDownBadgeTitle}
        size={'3'}
      >
        {title}
      </Text>
    </Flex>
  )
}
