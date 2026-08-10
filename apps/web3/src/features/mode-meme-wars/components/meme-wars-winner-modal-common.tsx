import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { TetherRoundedIcon } from 'shared/icons'
import { MemeWarsWinnerModalCommonType } from '../types'
import { MemeWarsWinnerModalModalGameDetails } from './meme-wars-winner-modal-game-details'

interface Props {
  result: MemeWarsWinnerModalCommonType
  totalPNL: number
}

export const MemeWarsWinnerModalCommon: React.FC<Props> = ({
  result,
  totalPNL
}) => {
  const isWin = result === MemeWarsWinnerModalCommonType.Win || false

  const resultTextColor = isWin ? 'color-green' : 'color-pink'
  const resultText = isWin ? 'YOU WON' : 'YOU LOSS'

  return (
    <Flex
      align={'center'}
      justify={'center'}
      direction={'column'}
      gap={'6'}
    >
      <Flex
        direction={'column'}
        align={'center'}
        gap={'4'}
      >
        <Text
          size={'7'}
          className={resultTextColor}
          weight={'bold'}
        >
          {resultText}
        </Text>

        {isWin && (
          <Flex
            align={'center'}
            gap={'1'}
          >
            <TetherRoundedIcon
              width={'3.5rem'}
              height={'3.5rem'}
              color='var(--yellow)'
            />
            <Text
              size={'6'}
              className='color-white'
              weight={'medium'}
            >
              {totalPNL}
            </Text>
          </Flex>
        )}
      </Flex>

      <MemeWarsWinnerModalModalGameDetails />
    </Flex>
  )
}
