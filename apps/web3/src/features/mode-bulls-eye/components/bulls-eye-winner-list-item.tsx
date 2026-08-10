/* eslint-disable max-lines */
import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Separator, Text } from '@radix-ui/themes'
import { BullseyePredict } from '__generated__/graphql'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { HotIcon, SwapXyroToken } from 'shared/icons'
import { userVar } from 'shared/store/user'
import { TetherToken } from 'shared/ui'
import { XyroAvatar } from 'shared/ui/xyro-avatar/xyro-avatar'
import { formatToTether, formatToUSD } from 'shared/utils/format-price'
import { bullsEyeCurrentContractAddressVar } from '../store/bulls-eye-contract-addresses.store'
import styles from '../mode-bulls-eye.module.scss'

interface Props {
  winnerBet: BullseyePredict | null
  iconPath: string | null
}
export const BullsEyeWinnerListItem: React.FC<Props> = ({
  winnerBet,
  iconPath
}) => {
  const currentBullsEyeSmartContract = useReactiveVar(
    bullsEyeCurrentContractAddressVar
  )
  const user = useReactiveVar(userVar)

  if (!winnerBet) return

  const formatterWinnerPrediction = formatToUSD(winnerBet.price, 2)
  const formatterWinnerPnl = formatToTether(winnerBet.pnl, 2)

  const winnerName = winnerBet.owner?.name || ''

  const isOwnBet = user?.id === winnerBet.owner?.id

  const userLevel = winnerBet.owner?.level?.levelId || 0

  return (
    <Flex
      className={cn(styles.winnerListItemWrapper, {
        [styles.winnerListItemBorder]: isOwnBet
      })}
      gap={'2'}
      width={'100%'}
      direction={'column'}
      data-testid={DataTestIDs.bullsEyeWinnerItem}
    >
      <Flex
        width={'100%'}
        className={styles.myWinnerBetWrapper}
        align={'center'}
        justify={'between'}
      >
        <Flex
          align={'center'}
          gap={'2'}
        >
          {iconPath && (
            <Flex
              className={styles.winnerListTopIcon}
              align={'center'}
              justify={'center'}
              mr={'2'}
            >
              <img
                src={iconPath}
                alt={`Winner place icon`}
              />
            </Flex>
          )}

          <XyroAvatar
            src={winnerBet.owner?.avatarUris[0]}
            fallback={'A'}
            size={'2'}
            userLevel={userLevel}
            displayLevel={false}
          />

          <Text
            className='color-white'
            size={'2'}
            weight={'medium'}
          >
            {winnerName}
          </Text>
        </Flex>
      </Flex>

      <Separator size={'4'} />

      <Flex
        width={'100%'}
        align={'center'}
      >
        <Flex
          width={'100%'}
          direction={'column'}
          align={'start'}
          gap={'1'}
        >
          <Text
            size={'1'}
            weight={'medium'}
            className={styles.winnerListItemAmountText}
          >
            PREDICTION:
          </Text>

          <Flex
            align={'center'}
            gap={'2'}
          >
            <Text
              size={'3'}
              weight={'light'}
              className='color-white'
            >
              {formatterWinnerPrediction}
            </Text>
          </Flex>

          {winnerBet?.isExact ?
            <Flex
              className={styles.exactBadgeWrapper}
              align={'center'}
              gap={'1'}
            >
              <HotIcon
                color='var(--c-a-orange)'
                width={'2rem'}
                height={'2rem'}
              />

              <Text
                color='orange'
                size={'1'}
                weight={'medium'}
              >
                EXACT
              </Text>
            </Flex>
          : null}
        </Flex>

        <Flex
          width={'100%'}
          direction={'column'}
          align={'end'}
          gap={'1'}
        >
          <Text
            size={'1'}
            weight={'medium'}
            className={styles.winnerListItemAmountText}
          >
            PNL:
          </Text>

          <Flex
            align={'center'}
            gap={'1'}
          >
            {currentBullsEyeSmartContract?.smartContractForXyroToken ?
              <SwapXyroToken
                width={'3rem'}
                height={'3rem'}
              />
            : <TetherToken
                size='3rem'
                className='color-yellow'
              />
            }

            <Text
              className='color-white'
              weight={'light'}
              size={'5'}
            >
              {formatterWinnerPnl}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
