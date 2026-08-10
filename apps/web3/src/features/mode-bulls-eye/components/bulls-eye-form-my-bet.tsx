import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { XyroAvatar } from 'shared/components'
import { DataTestIDs } from 'shared/constants'
import styles from '../mode-bulls-eye.module.scss'

interface Props {
  avatarUri: string
  avatarFallback: string
  name: string
  formattedPredictedPrice: string
  userLevel?: number | null
}
export const BullsEyeFormMyBet: React.FC<Props> = ({
  avatarUri,
  avatarFallback,
  formattedPredictedPrice,
  name,
  userLevel
}) => {
  return (
    <Flex
      width={'100%'}
      className={styles.myBetWrapper}
      align={'center'}
      justify={'between'}
      data-testid={DataTestIDs.bullsEyeYouSayValue}
    >
      <Flex
        align={'center'}
        gap={'2'}
      >
        <XyroAvatar
          src={avatarUri}
          fallback={avatarFallback}
          size={'2'}
          userLevel={userLevel}
          displayLevel={false}
        />

        <Text
          className='color-white'
          size={'2'}
          weight={'medium'}
        >
          {name}
        </Text>
      </Flex>

      <Text
        className='color-white'
        weight={'light'}
        size={'5'}
      >
        {formattedPredictedPrice}
      </Text>
    </Flex>
  )
}
