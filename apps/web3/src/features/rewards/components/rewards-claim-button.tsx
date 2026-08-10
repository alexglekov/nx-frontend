import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { TaskLockIcon, TickBoldIcon } from 'shared/icons'
import { XyroToken } from 'shared/ui'
import styles from '../rewards.module.scss'

interface Props {
  type: 'claimed' | 'claim' | 'locked' | null
  handleClick?: () => void
  claimReward: number | null
  disabled?: boolean
}

export const RewardsClaimButton: React.FC<Props> = ({
  type,
  handleClick,
  claimReward,
  disabled = false
}) => {
  const isClaimed = type === 'claimed'
  const isLocked = type === 'locked'

  if (isClaimed || isLocked) {
    return (
      <Flex
        className={styles.rewardsClaimBtnInfoContainer}
        align={'center'}
        justify={'center'}
        gap={'2'}
        mt={'3'}
      >
        {isClaimed ? (
          <TickBoldIcon color='var(--cyan)' />
        ) : (
          <TaskLockIcon
            color='var(--black)'
            width={'2rem'}
            height={'2rem'}
          />
        )}

        <Text
          size={'2'}
          weight={'bold'}
          className={
            isLocked ? styles.claimedBtnTextBlack : styles.claimedBtnTextBlue
          }
        >
          {isClaimed ? 'CLAIMED' : 'CLOSED'}
        </Text>
      </Flex>
    )
  }

  if (type === 'claim') {
    return (
      <Button
        variant='classic'
        color='green'
        onClick={handleClick}
        disabled={disabled}
        mt={'3'}
      >
        <Flex
          align={'center'}
          gap={'2'}
        >
          <Text
            size={'2'}
            weight={'bold'}
            className='color-black'
          >
            CLAIM
          </Text>

          <Flex
            align={'center'}
            gap={'1'}
          >
            <XyroToken
              color='black'
              size='2rem'
            />

            <Text
              size={'2'}
              weight={'bold'}
              className='color-black'
            >
              {claimReward || 0}
            </Text>
          </Flex>
        </Flex>
      </Button>
    )
  }

  return null
}
