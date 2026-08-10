import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { MemeWarsWinnerModalModalGameDetails } from './meme-wars-winner-modal-game-details'

export const MemeWarsGraphWinnerModalUnparticipated: React.FC = () => {
  return (
    <Flex
      align={'center'}
      justify={'center'}
      direction={'column'}
      gap={'6'}
    >
      <Text
        size={'7'}
        className={'color-white'}
        weight={'bold'}
      >
        THE GAME IS OVER
      </Text>

      <MemeWarsWinnerModalModalGameDetails />
    </Flex>
  )
}
