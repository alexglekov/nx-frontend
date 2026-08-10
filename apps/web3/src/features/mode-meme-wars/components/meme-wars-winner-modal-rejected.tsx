import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { TetherRoundedIcon } from 'shared/icons'
import { memeWarsGameVar } from '../store/meme-wars-game.store'

export const MemeWarsGraphWinnerModalRejected: React.FC = () => {
  const memeWarsGame = useReactiveVar(memeWarsGameVar)

  const isMyPredictExists = (memeWarsGame?.myPredicts.length || 0) > 0

  const totalAmount = memeWarsGame?.myPredicts?.reduce(
    (sum, p) => (sum = sum + p?.amount),
    0
  )

  return (
    <Flex
      align={'center'}
      justify={'center'}
      direction={'column'}
      gap={'2.5rem'}
    >
      <Flex
        align={'center'}
        justify={'center'}
        direction={'column'}
        gap={'1.75rem'}
        maxWidth={'27.5rem'}
      >
        <Flex
          align={'center'}
          justify={'center'}
          direction={'column'}
        >
          <Text
            align={'center'}
            weight={'bold'}
            size={'7'}
            className='color-white'
          >
            Game
          </Text>

          <Text
            align={'center'}
            weight={'bold'}
            size={'7'}
            className='color-white'
          >
            hasn&apos;t started
          </Text>
        </Flex>

        <Text
          size={'2'}
          weight={'medium'}
          className='color-gray-light'
          align={'center'}
        >
          We need at list 2 players in different pools to get started
        </Text>
      </Flex>

      {isMyPredictExists && (
        <Flex
          align={'center'}
          justify={'center'}
          direction={'column'}
          gap={'1'}
        >
          <Flex
            align={'center'}
            gap={'2'}
          >
            <TetherRoundedIcon color='var(--yellow)' />

            <Text
              weight={'medium'}
              size={'7'}
            >
              {totalAmount}
            </Text>
          </Flex>

          <Text
            size={'2'}
            weight={'bold'}
            className='color-gray-light'
            align={'center'}
          >
            returned to your balance
          </Text>
        </Flex>
      )}
    </Flex>
  )
}
