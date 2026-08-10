import React from 'react'
import { Flex, Tooltip } from '@radix-ui/themes'
import { MS_IN_SEC } from 'shared/constants'
import { useInterval } from 'shared/hooks/use-interval'
import { Maybe, Milliseconds, Seconds } from 'shared/types'
import { XyroNumeral } from 'shared/ui'
import { DotTitle } from 'shared/ui/dot-title/dot-title'
import { RoundProgressBar } from 'shared/ui/timeframe-countdown/round-progress-bar'
import { formatTime } from 'shared/utils/format-time'
import styles from '../../mode-setups.module.scss'

interface Props {
  timeframe: Maybe<Seconds>
  startPrice: Maybe<number>
  stopPredictAt: Maybe<number>
}
/* eslint-disable */
export const SetupsCardStats: React.FC<Props> = ({
  startPrice,
  stopPredictAt,
  timeframe
}) => {
  const millisRemaining = stopPredictAt && stopPredictAt - Date.now()
  const [timeRemaining, setTimeRemaining] = React.useState(millisRemaining)

  useInterval(
    () => setTimeRemaining(stopPredictAt && stopPredictAt - Date.now()),
    MS_IN_SEC
  )

  const secsRemaining = (timeRemaining && timeRemaining / MS_IN_SEC) as Seconds
  const predictTimeframe =
    timeframe ? (Math.round(timeframe / 3) as Seconds) : null
  const formattedTimeRemaining = formatTime(
    (timeRemaining as Milliseconds) ?? null
  )

  return (
    <Flex
      width={'100%'}
      justify={'between'}
      gap={'1'}
    >
      <Flex
        width={'100%'}
        direction={'column'}
        justify={'between'}
        gap={'1'}
        className={styles.setupElementWrapper}
      >
        <DotTitle
          withDot={false}
          color={'gray'}
        >
          {/* TODO: should be current price, provide this data and replace */}
          START PRICE:
        </DotTitle>
        <XyroNumeral
          weight={'light'}
          size={'5'}
          isWhite
        >
          {startPrice ? `$${startPrice.toFixed(2)}` : '—'}
        </XyroNumeral>
      </Flex>

      <Flex
        width={'100%'}
        direction={'column'}
        justify={'between'}
        gap={'1'}
        className={styles.setupElementWrapper}
      >
        <DotTitle
          withDot={false}
          color={'gray'}
        >
          time to enter:
        </DotTitle>
        <Flex
          align={'center'}
          gap={'1'}
        >
          {predictTimeframe ?
            <RoundProgressBar
              progress={secsRemaining}
              maxValue={predictTimeframe}
            />
          : null}

          <Tooltip content='Days : Hours : Minutes: Seconds'>
            <XyroNumeral
              size={'5'}
              weight={'light'}
              isWhite
            >
              {formattedTimeRemaining}
            </XyroNumeral>
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  )
}
