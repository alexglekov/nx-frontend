import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { EthAssetIcon } from 'shared/icons'
import { XyroToken } from 'shared/ui'
import { DailyRewardState } from '../types'
import styles from '../rewards.module.scss'

interface Props {
  type: DailyRewardState
  amount: number
  handleCollect: () => void
  loading: boolean
  variant?: 'facet' | 'simple'
}
export const RewardsDailyChallengeItemButton: React.FC<Props> = ({
  type,
  amount,
  handleCollect,
  loading,
  variant = 'simple'
}) => {
  const formattedAmount = variant === 'facet' ? 0.00001 : amount

  if (type === 'closed') {
    return (
      <Flex
        className={cn(styles.closedButtonContainer, {
          [styles.actionButtonWrapper]: variant !== 'facet'
        })}
        width={'100%'}
        align={'center'}
        justify={'center'}
        gap={'3'}
        data-testid={DataTestIDs.buttonRewardsClaimReward}
      >
        <Text
          size={'3'}
          weight={'bold'}
          className={styles.dailyRewardDescription}
        >
          Reward:
        </Text>

        <XyroRewardAmount
          rewardAmount={formattedAmount}
          withTokenWrapper
          variant={variant}
        />
      </Flex>
    )
  }

  if (type === 'claim') {
    return (
      <Button
        color='green'
        variant='outline'
        className={styles.dailyRewardClaimButton}
        onClick={handleCollect}
        disabled={loading}
        data-testid={DataTestIDs.buttonRewardsClaimReward}
      >
        <Text
          className='color-black'
          size={'3'}
          weight={'bold'}
        >
          CLAIM
        </Text>

        <XyroRewardAmount
          rewardAmount={formattedAmount}
          textClass='color-black'
          variant={variant}
        />
      </Button>
    )
  }

  if (type === 'claimed') {
    return (
      <Flex
        className={styles.claimedButtonContainer}
        align={'center'}
        justify={'center'}
        gap={'3'}
        data-testid={DataTestIDs.buttonRewardsClaimReward}
      >
        <Text
          size={'3'}
          weight={'bold'}
        >
          CLAIMED
        </Text>

        <XyroRewardAmount
          rewardAmount={formattedAmount}
          tokenColor='white'
          variant={variant}
        />
      </Flex>
    )
  }

  return null
}

interface RewardAmountProps {
  rewardAmount: number
  textClass?: 'color-white' | 'color-yellow' | 'color-black'
  withTokenWrapper?: boolean
  tokenColor?: 'black' | 'white'
  variant?: 'facet' | 'simple'
}
const XyroRewardAmount: React.FC<RewardAmountProps> = ({
  rewardAmount,
  textClass = 'color-white',
  withTokenWrapper = false,
  tokenColor = 'black',
  variant = 'simple'
}) => {
  return (
    <Flex
      align={'center'}
      justify={'center'}
      gap={'1'}
    >
      <Text
        size={'3'}
        weight={'bold'}
        className={textClass}
      >
        {rewardAmount}
      </Text>

      <Flex
        className={cn({
          [styles.xyroTokenBadge]: variant !== 'facet'
        })}
      >
        {variant === 'simple' ?
          <XyroToken
            size={'2.5rem'}
            color={tokenColor}
          />
        : <EthAssetIcon
            width={'2.5rem'}
            height={'2.5rem'}
          />
        }
      </Flex>
    </Flex>
  )
}
