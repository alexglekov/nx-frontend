import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { memeWarsGameVar } from '../store/meme-wars-game.store'
import { MemeWarsWinnerListGameDetailAsset } from '../types'
import { MemeWarsWinnerModalModalGameDetailsItem } from './meme-wars-winner-modal-game-details-item'

export const MemeWarsWinnerModalModalGameDetails: React.FC = () => {
  const memeWarsGame = useReactiveVar(memeWarsGameVar)

  const memeWarsAssetsWinnerList =
    memeWarsGame?.feedsIds.map((f, index) => {
      return {
        name: f,
        startPrice: memeWarsGame.startPrices?.[index] || 0,
        endPrice: memeWarsGame.endPrices?.[index] || 0,
        priceDiff: memeWarsGame.priceDiffs?.[index] || 0
      }
    }) || []

  const memeWarsAssetsForamttedWinnerList = memeWarsAssetsWinnerList?.sort(
    (a, b) => b.priceDiff - a.priceDiff
  )

  return (
    <Flex
      direction={'column'}
      align={'center'}
      justify={'center'}
      gap={'4'}
      width={'100%'}
      maxWidth={'52.25rem'}
    >
      <Text
        weight={'medium'}
        size={'2'}
        className='color-white'
      >
        Game details:
      </Text>

      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
        width={'100%'}
        gap={'1'}
      >
        {memeWarsAssetsForamttedWinnerList.map((a, index) => {
          return (
            <MemeWarsWinnerModalModalGameDetailsItem
              key={a.name}
              index={index + 1}
              asset={a as MemeWarsWinnerListGameDetailAsset}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}
