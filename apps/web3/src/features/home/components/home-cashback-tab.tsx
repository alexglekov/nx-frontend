import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { STAND } from 'app/constants'
import { Stand } from 'app/types'
import cn from 'classnames'
import { useUserCashback } from 'features/user-profile/hooks/use-user-cashback'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import { Link } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { usePaymentsStartDate } from 'shared/hooks/use-payments-start-date'
import { TetherAssetIcon } from 'shared/icons'
import { userVar } from 'shared/store/user'
import styles from '../home.module.scss'

// eslint-disable-next-line max-statements
export const HomeCashbackTab: React.FC = () => {
  const { totalCashBackAmount } = useUserCashback()

  const user = useReactiveVar(userVar)

  const endDate = new Date(Date.UTC(2025, 0, 14, 0, 0, 0))
  const endDateUtcPlus3Time = new Date(endDate.getTime() + 3 * 60 * 60 * 1000)

  const startDate = new Date(Date.UTC(2025, 0, 1, 0, 0, 0))
  const startDateUtcPlus3StartDate = new Date(
    startDate.getTime() + 3 * 60 * 60 * 1000
  )

  const { paymentsWillStart, paymentsWillStartPercentage } =
    usePaymentsStartDate(startDateUtcPlus3StartDate, endDateUtcPlus3Time)

  // TODO: Remove stand when API will be ready
  if (!user || STAND !== Stand.dev) return null

  return (
    <Flex
      align={'center'}
      justify={'between'}
      className={styles.cashBackTabWrapper}
      mb={'3'}
      gap={{ initial: '6', sm: '0' }}
      direction={{ initial: 'column', sm: 'row' }}
    >
      <Flex
        direction={'column'}
        gap={'1'}
      >
        <Flex
          align={'center'}
          gap={'3'}
          justify={{ initial: 'center', sm: 'start' }}
        >
          <Text
            className='color-white'
            size={{ initial: '5', sm: '4' }}
            weight={'bold'}
          >
            Available cashback:
          </Text>

          <Flex
            align={'center'}
            gap={'1'}
          >
            <TetherAssetIcon
              width={'2rem'}
              height={'2rem'}
            />

            <Text
              className='color-white'
              size={{ initial: '5', sm: '4' }}
              weight={'bold'}
            >
              {totalCashBackAmount}
            </Text>
          </Flex>
        </Flex>

        <Text
          className={cn('color-gray', styles.cashBackAvailabilityText)}
          weight={'medium'}
          size={{ initial: '3', sm: '2' }}
          align={{ initial: 'center', sm: 'left' }}
        >
          Cashback payments will start on 14.01.2025 — make sure to earn more by
          then.
        </Text>
      </Flex>

      <Flex
        direction={'column'}
        gap={'1'}
      >
        <Text
          className={styles.paymentsWillStartText}
          size={{ initial: '3', sm: '1' }}
          weight={'bold'}
          align={{ initial: 'center', sm: 'left' }}
        >
          PAYMENTS WILL START IN
        </Text>

        <Flex
          align={'center'}
          gap={'1'}
        >
          <Box
            className={styles.roundProgressBar}
            width={'3rem'}
            height={'3rem'}
          >
            <CircularProgressbar
              className={styles.timeframeCountdown}
              value={paymentsWillStartPercentage}
              maxValue={100}
              counterClockwise={true}
              strokeWidth={50}
              background={true}
              styles={progressBarStyles}
            />
          </Box>

          <Text
            className={styles.timerTimeText}
            size={{ initial: '8', sm: '5' }}
          >
            {paymentsWillStart}
          </Text>
        </Flex>
      </Flex>

      <Link
        to={RouterPathes.profile}
        className={styles.gogoToProfileLink}
      >
        <Button className={styles.goToProfileBtn}>
          <Text
            className='color-black'
            size={{ initial: '4', sm: '2' }}
            weight={'bold'}
          >
            GO TO MY PROFILE
          </Text>
        </Button>
      </Link>
    </Flex>
  )
}

const progressBarStyles = buildStyles({
  pathColor: 'var(--c-a-lazur)',
  trailColor: 'var(--c-black)',
  backgroundColor: 'var(--c-black)',
  pathTransitionDuration: 0.3,
  strokeLinecap: 'butt'
})
