import { FC } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { OneVsOneExactPricePredict } from '__generated__/graphql'
import cn from 'classnames'
import { userVar } from 'shared/store/user'
import styles from '../mode-one-vs-one.module.scss'

interface Props {
  predict: OneVsOneExactPricePredict
}

export const ExactBadge: FC<Props> = ({ predict }) => {
  const user = useReactiveVar(userVar)
  return (
    <Flex
      className={cn(styles.exactBadge, {
        [styles.exactBadgeOwnPredict]: user?.id === predict.ownerId
      })}
    >
      {`$${predict.price}`}
    </Flex>
  )
}
