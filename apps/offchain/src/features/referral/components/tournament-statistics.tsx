import { useState } from 'react'
import { Flex, Separator, Text } from '@radix-ui/themes'
import { BetsTypeSwitcher } from 'shared/ui'
import { formatToUSD } from 'shared/utils/format-price'
import { useReferralData } from '../hooks/use-referral-data'
import styles from '../referral.module.scss'

export enum ActiveTournamentStats {
  OVERALL = 'Overall',
  CURRENT = 'Current'
}

export const TournamentStatistics: React.FC = () => {
  const [activeType, setActiveType] = useState<string>(
    ActiveTournamentStats.OVERALL
  )

  const { referralUserLevel, numberOfOwnReferrals } = useReferralData()

  const { directCashbackPercentage = 0, subCashbackPercentage = 0 } =
    referralUserLevel?.referralLevel || {}

  const totalDirectInvited =
    numberOfOwnReferrals?.numberOfDepositedReferrals || 0
  const totalSubInvited =
    numberOfOwnReferrals?.numberOfDepositedSubReferrals || 0

  const totalTurnover =
    formatToUSD(referralUserLevel?.totalEarning || 0) || '$0.00'
  const remainingTurnover =
    formatToUSD(referralUserLevel?.remainingToNextLevel || 0) || '$0.00'

  return (
    <Flex
      className={styles.tournamentStatistics}
      direction={'column'}
      gap={'4'}
      width={'100%'}
    >
      <Flex
        align={{ initial: 'start', sm: 'center' }}
        justify={'between'}
        direction={{ initial: 'column', sm: 'row' }}
        gap={'3'}
      >
        <Text
          size={'5'}
          className={'color-white'}
        >
          Tournament Statistics
        </Text>

        <BetsTypeSwitcher
          activeType={activeType}
          setActiveType={setActiveType}
          betsTypes={ActiveTournamentStats}
        />
      </Flex>

      <Flex
        direction={'column'}
        gap={'3'}
        width={'100%'}
      >
        <Flex
          gap={'3'}
          width={'100%'}
          direction={{ initial: 'column', sm: 'row' }}
        >
          <StatsItem
            title={'Number of first deposits made'}
            firstStatsTitle={'Friends'}
            firstValue={`${totalDirectInvited}`}
            secondStatsTitle={'Friends of friends'}
            secondValue={`${totalSubInvited}`}
          />

          <StatsItem
            title={'My current profit percentage'}
            firstStatsTitle={'Friends'}
            firstValue={`${directCashbackPercentage}%`}
            secondStatsTitle={'Friends of friends'}
            secondValue={`${subCashbackPercentage}%`}
          />
        </Flex>

        <Flex
          gap={'3'}
          width={'100%'}
          direction={{ initial: 'column', sm: 'row' }}
        >
          <StatsItem
            title={'Total turnover from all friends'}
            firstValue={totalTurnover}
          />

          <StatsItem
            title={'Turnover required for the next level'}
            firstValue={remainingTurnover}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

interface BigStatsProps {
  title: string
  firstStatsTitle?: string
  secondStatsTitle?: string
  firstValue: string
  secondValue?: string
}

const StatsItem: React.FC<BigStatsProps> = ({
  title,
  firstStatsTitle,
  secondStatsTitle,
  secondValue,
  firstValue
}) => {
  return (
    <Flex
      className={styles.statsBlock}
      gap={'2'}
      direction={'column'}
    >
      <Text
        size={'3'}
        weight={'bold'}
        className={'color-gray-light'}
      >
        {title}
      </Text>

      {secondValue && (
        <Separator
          className={styles.separator}
          size={'2'}
        />
      )}

      <Flex
        width={'100%'}
        justify={'between'}
      >
        <Flex
          direction={'column'}
          gap={'1'}
        >
          {secondValue && (
            <Text
              className={'color-gray-light'}
              size={'3'}
            >
              {firstStatsTitle}
            </Text>
          )}

          <Text
            className={'color-accent-blue'}
            size={'5'}
          >
            {firstValue}
          </Text>
        </Flex>

        {secondValue && (
          <Flex
            direction={'column'}
            gap={'1'}
          >
            <Text
              className={'color-gray-light'}
              size={'3'}
            >
              {secondStatsTitle}
            </Text>

            <Text
              className={'color-accent-blue'}
              size={'5'}
            >
              {secondValue}
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}
