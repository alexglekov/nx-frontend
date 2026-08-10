import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { useResponsive } from 'shared/hooks/use-responsive'
import { userVar } from 'shared/store/user'
import { memeWarsGameVar } from '../store/meme-wars-game.store'
import { MemeWarsFormAmountSelect } from './meme-wars-form-amount-select'
import { MemeWarsFormAssetSelect } from './meme-wars-form-asset-select'
import { MemeWarsFormHeader } from './meme-wars-form-header'
import { MemeWarsFormPlayerList } from './meme-wars-form-player-list'
import { MemeWarsFormSubmitButton } from './meme-wars-form-submit-button'
import { MemeWarsTotalPool } from './meme-wars-form-total-pool'
import styles from '../mode-meme-wars.module.scss'

export const MemeWarsForm: React.FC = () => {
  const [isMobile] = useResponsive('xs')

  const user = useReactiveVar(userVar)
  const memeWarsGame = useReactiveVar(memeWarsGameVar)

  const myPredicts = memeWarsGame?.myPredicts || []
  const formattedUserPredicts =
    memeWarsGame?.predicts.filter(p => p.owner?.id !== user?.id) || []

  const isMobileBool = Boolean(isMobile)

  return (
    <Flex
      className={styles.memeWarsFormWrapper}
      width={'100%'}
      direction={'column'}
      align={'center'}
      justify={'between'}
      gap={'5'}
    >
      <Flex
        direction={'column'}
        align={'center'}
        width={'100%'}
      >
        {!isMobileBool && <MemeWarsFormHeader />}

        <Flex
          direction={'column'}
          align={'center'}
          gap={'3'}
          width={'100%'}
          mt={'3'}
        >
          <MemeWarsFormAssetSelect />

          <MemeWarsFormAmountSelect />

          <MemeWarsFormSubmitButton />
        </Flex>
      </Flex>

      <MemeWarsTotalPool />

      <Flex
        width={'100%'}
        direction={'column'}
        gap={'5'}
        mt={'4'}
      >
        <MemeWarsFormPlayerList
          title='YOU SAY:'
          isMyBets
          items={myPredicts}
        />

        <MemeWarsFormPlayerList
          title='PLAYERS SAY:'
          items={formattedUserPredicts}
        />
      </Flex>
    </Flex>
  )
}
