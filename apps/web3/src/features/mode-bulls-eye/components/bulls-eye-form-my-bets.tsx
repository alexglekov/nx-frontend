import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { formatToUSD } from 'shared/utils/format-price'
import { v4 } from 'uuid'
import { useBullsEyeWinnerModal } from '../hooks/use-bulls-eye-winner-modal'
import { bullsEyeGameVar } from '../store/game.store'
import { BullsEyeFormMyBet } from './bulls-eye-form-my-bet'
import styles from '../mode-bulls-eye.module.scss'

export const BullsEyeFormMyBets: React.FC = () => {
  const { isWinnerModalOpen } = useBullsEyeWinnerModal()

  const bullsEyeGame = useReactiveVar(bullsEyeGameVar)

  const isMyBetExists = Boolean(bullsEyeGame?.myPredicts?.[0] || null)

  const myPredicts = bullsEyeGame?.myPredicts || []

  if (!isMyBetExists || isWinnerModalOpen) return null

  return (
    <Flex
      direction={'column'}
      width={'100%'}
      gap={{ initial: '1', sm: '3' }}
      justify={'center'}
      align={'center'}
    >
      <Text
        className='color-gray'
        size={'2'}
        weight={'medium'}
      >
        YOU SAY:
      </Text>

      <ScrollArea
        className={cn(styles.myBetsScrollArea, {
          [styles.myBetsScrollAreaActive]: myPredicts?.length > 2
        })}
      >
        <Flex
          direction={'column'}
          align={'center'}
          gap={'1'}
          width={'100%'}
          px={{ initial: '3', sm: '0' }}
        >
          {myPredicts.map(p => {
            const formmatedPredictedPrice = formatToUSD(p?.price, 2) || '0'

            const avatarUri = p?.owner?.avatarUris?.[0] || ''
            const avatarFallback = p?.owner?.name?.[0] || 'A'
            const name = p?.owner?.name || ''
            const userLevel = p?.owner?.level?.levelId || 0

            return (
              <BullsEyeFormMyBet
                key={v4()}
                avatarFallback={avatarFallback}
                avatarUri={avatarUri}
                name={name}
                formattedPredictedPrice={formmatedPredictedPrice}
                userLevel={userLevel}
              />
            )
          })}
        </Flex>
      </ScrollArea>
    </Flex>
  )
}
