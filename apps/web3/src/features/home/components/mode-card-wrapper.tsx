import { FC } from 'react'
import { Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { HomeCardType } from '../constants'
import styles from '../home.module.scss'

interface CardWrapperProps {
  path?: string
  children: React.ReactNode
  modeKey: HomeCardType['key']
}
export const ModeCardWrapper: FC<CardWrapperProps> = ({
  children,
  path,
  modeKey
}) => {
  return isNotNullOrUndef(path) ?
      <Link
        to={path}
        className={styles.cardWrapper}
      >
        <Flex
          position={'relative'}
          width={'100%'}
          className={cn(styles.modeCard, styles[modeKey])}
        >
          {children}
        </Flex>
      </Link>
    : <Flex
        position={'relative'}
        width={'100%'}
        className={cn(styles.modeCard, styles[modeKey])}
      >
        {children}
      </Flex>
}
