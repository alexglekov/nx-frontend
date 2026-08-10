import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import ProgressBar from '@ramonak/react-progress-bar'
import cn from 'classnames'
import { useTimer } from 'shared/hooks/use-timer'
// TODO: Split styles file per feature
import { useCashbackBonuses } from '../hooks/use-cashback-bonuses'
import styles from '../../account/account.module.scss'

export const AccountActiveCashbackBonus: React.FC = () => {
  const { activeBonus, handleCancelBonus, bonusCancelationLoading } =
    useCashbackBonuses()

  const isActiveBonusExists = Boolean(activeBonus?.id)

  const bonusStartTime = activeBonus?.startedAt || 0
  const bonusEndTime = activeBonus?.closedAt || 0
  const activeBonusAmount = (activeBonus?.amount || 0) * 100

  const { percentage, remainingTimeText } = useTimer(
    new Date(bonusStartTime),
    new Date(bonusEndTime)
  )

  const cancelBonus = async () => {
    await handleCancelBonus(activeBonus?.id || '')
  }

  return (
    <Flex
      direction={'column'}
      gap={isActiveBonusExists ? '1rem' : '4rem'}
      className={styles.accountBonusesHeaderBlock}
      width={'100%'}
    >
      <Flex
        align={'center'}
        justify={'between'}
      >
        <Text
          className='color-gray-light'
          weight={'bold'}
        >
          Active Cashback Bonus
        </Text>

        {isActiveBonusExists && (
          <Button
            size={'1'}
            variant='outline'
            color='pink'
            disabled={bonusCancelationLoading}
            onClick={cancelBonus}
          >
            <Text size={'1'}>CANCEL</Text>
          </Button>
        )}
      </Flex>
      {isActiveBonusExists ?
        <Flex
          direction={'column'}
          gap={'2'}
        >
          <Text
            size={'4'}
            weight={'bold'}
            className='color-white'
          >
            {activeBonus?.name || ''}
          </Text>

          <Flex
            align={'center'}
            gap={'6'}
          >
            <Text
              size={'8'}
              className='color-white'
              weight={'light'}
            >
              +{activeBonusAmount}%
            </Text>

            <Flex
              width={'100%'}
              align={'center'}
              gap={'3'}
            >
              <ProgressBar
                completed={percentage}
                height='1.25rem'
                isLabelVisible={false}
                bgColor='var(--pink)'
                baseBgColor='var(--gray)'
                className={styles.progressBar}
              />

              <Text
                className={cn('no-wrap', 'color-gray')}
                size={'2'}
              >
                {remainingTimeText}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      : <Text
          className='color-gray'
          size={'6'}
        >
          No active bonus
        </Text>
      }
    </Flex>
  )
}
