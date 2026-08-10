import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { JoystickIcon, TetherRoundedIcon, UserIcon } from 'shared/icons'
import { memeWarsGameVar } from '../store/meme-wars-game.store'
import styles from '../mode-meme-wars.module.scss'

export const MemeWarsTotalPool: React.FC = () => {
  const memeWarsGame = useReactiveVar(memeWarsGameVar)

  const poolPredictsAmount = memeWarsGame?.pool?.predictsCount || 0
  const poolSize = memeWarsGame?.pool?.poolAmount || 0
  const poolPlayersAmount =
    memeWarsGame?.predicts?.filter(
      (p, index, self) => index === self.findIndex(i => i.ownerId === p.ownerId)
    )?.length || 0

  return (
    <Flex
      className={styles.totalGamePoolContainer}
      direction={'column'}
      gap={'3'}
    >
      <Text
        className='color-white'
        size={'2'}
        weight={'bold'}
      >
        TOTAL GAME POOL
      </Text>

      <Flex
        align={'center'}
        justify={'between'}
      >
        <Flex
          direction={'column'}
          gap={'1'}
        >
          <Text
            className='color-gray'
            size={'1'}
          >
            Pool size:
          </Text>

          <Flex
            align={'center'}
            gap={'2'}
          >
            <TetherRoundedIcon color='var(--yellow)' />

            <Text
              className='color-white'
              weight={'light'}
              size={'6'}
            >
              {poolSize}
            </Text>
          </Flex>
        </Flex>

        <Flex
          direction={'column'}
          gap={'1'}
        >
          <Text
            className='color-gray'
            size={'1'}
          >
            Total predicts:
          </Text>

          <Flex
            align={'center'}
            gap={'2'}
          >
            <JoystickIcon />

            <Text
              className='color-white'
              weight={'light'}
              size={'6'}
            >
              {poolPredictsAmount}
            </Text>
          </Flex>
        </Flex>

        <Flex
          direction={'column'}
          gap={'1'}
        >
          <Text
            className='color-gray'
            size={'1'}
          >
            Total users:
          </Text>

          <Flex
            align={'center'}
            gap={'2'}
          >
            <UserIcon
              color='var(--white)'
              width={'3rem'}
              height={'3rem'}
            />

            <Text
              className='color-white'
              weight={'light'}
              size={'6'}
            >
              {poolPlayersAmount}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
