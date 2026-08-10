import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { GameStatus } from '__generated__/graphql'
import { useMemeWarsBet } from 'contracts/meme-wars'
import { notificationStateVar } from 'shared/store/notification'
import { XyroLoading } from 'shared/ui'
import { ButtonWithWalletConnection } from 'shared/ui/with-wallet/with-wallet-connection'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { useMemeWarsGameTimer } from '../hooks/use-meme-wars-game-timer'
import { memeWarsGameVar } from '../store/meme-wars-game.store'
import {
  memeWarsPredictAmountVar,
  memeWarsSelectedAssetVar
} from '../store/meme-wars-ui-values.store'
import styles from '../mode-meme-wars.module.scss'

// eslint-disable-next-line max-statements
export const MemeWarsFormSubmitButton: React.FC = () => {
  const memeWarsGame = useReactiveVar(memeWarsGameVar)
  const { formattedTimer, timeRemaining } = useMemeWarsGameTimer()

  const selectedPredictAmount = useReactiveVar(memeWarsPredictAmountVar)
  const selectedAssetFeedId = useReactiveVar(memeWarsSelectedAssetVar)

  const selectedAssetId =
    memeWarsGame?.feedsIds?.findIndex(a => a === selectedAssetFeedId) || 0

  const { addMemeWarsBet, isLoading } = useMemeWarsBet()

  const handleAddMemeWarsBet = async () => {
    if (!selectedAssetFeedId || !isNotNullOrUndef(selectedAssetId)) {
      notificationStateVar({
        isOpen: true,
        type: 'error',
        title: 'Asset not selected!',
        description: 'Please select asset from dropdown'
      })

      return
    }

    const isMyBetOnCurrentAssetExists = memeWarsGame?.myPredicts.find(
      p => p.feedId === selectedAssetFeedId
    )

    if (isMyBetOnCurrentAssetExists) {
      notificationStateVar({
        isOpen: true,
        type: 'error',
        title: 'Predict already exists',
        description: "You can't predict price of the same asset twice"
      })

      return
    }

    addMemeWarsBet(selectedPredictAmount, selectedAssetId).then(() =>
      memeWarsSelectedAssetVar(null)
    )
  }

  const buttonText =
    memeWarsGame?.status === GameStatus.Open && timeRemaining > 0 ?
      `PLAY ${formattedTimer}`
    : 'GAME WAS STARTED'
  const isButtonDisabled = isLoading || timeRemaining <= 0

  return (
    <Flex
      direction={'column'}
      align={'center'}
      gap={'2'}
      mt={'4'}
      width={'100%'}
    >
      <Flex
        align={'center'}
        justify={'center'}
        gap={'2'}
        width={'100%'}
      >
        {/* RECALCULATE PAYOUT */}
        {/* <Text
          className='color-gray-light'
          weight={'medium'}
          size={{ initial: '4', sm: '2' }}
        >
          Payout:
        </Text>

        <Flex
          align={'center'}
          gap={'2'}
        >
          <TetherRoundedIcon color='var(--lime)' />

          <Text
            className='color-white'
            weight={'medium'}
            size={'5'}
          >
            1
          </Text>
        </Flex> */}

        {/* TODO: Add percentage when API will be ready */}
        {/* <Flex
          className={styles.payoutContainer}
          align={'center'}
          justify={'center'}
        >
          <Text
            weight={'medium'}
            className={styles.payoutContainerText}
          >
            240%
          </Text>
        </Flex> */}
      </Flex>

      <ButtonWithWalletConnection
        className={styles.predictSubmitButton}
        onClick={handleAddMemeWarsBet}
        disabled={isButtonDisabled}
      >
        <XyroLoading
          variant='dark'
          loading={isLoading}
        >
          <Text
            className='color-black'
            weight={'bold'}
            size={{ initial: '4', sm: '2' }}
          >
            {buttonText}
          </Text>
        </XyroLoading>
      </ButtonWithWalletConnection>
    </Flex>
  )
}
