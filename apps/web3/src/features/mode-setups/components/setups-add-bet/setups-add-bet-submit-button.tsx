import { useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { SetupsPredictShallowFragment } from '__generated__/graphql'
import { DataTestIDs, MS_IN_SEC } from 'shared/constants'
import { useInterval } from 'shared/hooks/use-interval'
import { userVar } from 'shared/store/user'
import { Maybe, Milliseconds } from 'shared/types'
import { InfoTooltip, RadixText, XyroLoading, XyroNumeral } from 'shared/ui'
import { ButtonWithWalletConnection } from 'shared/ui/with-wallet/with-wallet-connection'
import { formatMillisToRemainingTime } from 'shared/utils/formatMillisToRemainingTime'
import styles from '../../mode-setups.module.scss'

interface Props {
  loading: boolean
  userPredict: Maybe<SetupsPredictShallowFragment>
  stopPredictAt?: Maybe<number>
  title: string
  disabled: boolean
  isUserFriellyLogicBetAdded?: boolean
}
// eslint-disable-next-line complexity, max-statements
export const SetupsAddBetSubmitButton: React.FC<Props> = ({
  userPredict,
  loading,
  title,
  disabled,
  stopPredictAt,
  isUserFriellyLogicBetAdded
}) => {
  const timeRemainingUntilStop = stopPredictAt && stopPredictAt - Date.now()
  const [timeRemaining, setTimeRemaining] = useState(timeRemainingUntilStop)

  const user = useReactiveVar(userVar)

  useInterval(
    () => setTimeRemaining(stopPredictAt && stopPredictAt - Date.now()),
    MS_IN_SEC
  )

  const isTimeOver = Boolean((timeRemaining ?? 0) <= 0)
  const formattedStopBetsAt = formatMillisToRemainingTime(
    (timeRemaining as Milliseconds) ?? null
  )

  const tooltipText =
    isTimeOver ?
      'This setup is not accepting new players.'
    : 'Time left before the game starts.'

  if (Boolean(userPredict) || isUserFriellyLogicBetAdded)
    return <ExistingBetMessage />

  return (
    <ButtonWithWalletConnection
      className={styles.setupAddBetButton}
      disabled={!user || isTimeOver || loading || disabled}
      type='submit'
      color='blue'
      mb='3'
      size='4'
      highContrast
      data-testid={DataTestIDs.buttonSetupsJoinSetup}
    >
      <XyroLoading
        iconSize='0'
        loading={loading}
      >
        <Flex
          gap='2'
          align={'center'}
        >
          <RadixText
            size={'2'}
            weight={'bold'}
          >
            {title}
          </RadixText>

          <XyroNumeral
            size={'2'}
            isBlack={true}
            isWhite={false}
          >
            {stopPredictAt && `${formattedStopBetsAt}`}
          </XyroNumeral>

          <InfoTooltip
            color={'gray'}
            content={tooltipText}
          />
        </Flex>
      </XyroLoading>
    </ButtonWithWalletConnection>
  )
}

const ExistingBetMessage = () => {
  return (
    <Flex
      align={'center'}
      justify={'center'}
      className={styles.betExistsContainer}
    >
      <Text
        color='green'
        weight={'bold'}
        align={'center'}
        size={'2'}
        className={styles.betExistsContainerText}
      >
        You are already in this game
      </Text>
    </Flex>
  )
}
