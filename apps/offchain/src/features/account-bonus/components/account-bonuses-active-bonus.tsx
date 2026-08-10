import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import ProgressBar from '@ramonak/react-progress-bar'
import { InfoCircleFill } from 'shared/icons'
import { formatToUSD } from 'shared/utils/format-price'
import { useAccountBonuses } from '../hooks/use-account-bonuses'
// TODO: Split styles file per feature
import styles from '../../account/account.module.scss'

export const AccountBonusesActiveBonus: React.FC = () => {
  const { activeBonus, handleCancelBonus, bonusCancelationLoading } =
    useAccountBonuses()

  const isActiveBonusExists = Boolean(activeBonus?.id)

  const turnover = activeBonus?.turnover || 0
  const turnoverTarget = activeBonus?.turnoverTarget || 0
  const activeBonusAmount = formatToUSD(activeBonus?.amount || 0)
  const completedPercentage = Number((turnover * 100) / turnoverTarget) || 0

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
          Active Bonus
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
              {activeBonusAmount}
            </Text>

            <Flex
              width={'100%'}
              align={'center'}
              gap={'3'}
            >
              <ProgressBar
                completed={completedPercentage}
                height='1.25rem'
                isLabelVisible={false}
                bgColor='var(--pink)'
                baseBgColor='var(--gray)'
                className={styles.progressBar}
              />

              <Text
                className='color-gray'
                size={'2'}
              >
                {completedPercentage.toFixed(0)}%
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
