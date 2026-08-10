/* eslint-disable complexity */
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import * as RadixForm from '@radix-ui/react-form'
import { Flex } from '@radix-ui/themes'
import { useFragment } from '__generated__'
import { GameStatus, SetupsGameFragment } from '__generated__/graphql'
import {
  FRAGMENT_SETUPS_PREDICT_SHALLOW,
  FRAGMENT_SETUPS_GAME
} from 'api/mode-setups'
import { RouterPathes } from 'shared/constants'
import { balanceVar } from 'shared/store/balance-store'
import { AssetId } from 'shared/types'
import { ShareButton } from 'shared/ui'
import { useSetupAddBetForm } from '../../hooks/use-setup-add-bet-form'
import { setupsChartAnnotationsVar } from '../../store/setups-chart-annotations'
import { SetupPredictType } from '../../types'
import { SetupsAddPredictFormHeader } from './setups-add-bet-form-header'
import { SetupsAddBetSubmitButton } from './setups-add-bet-submit-button'
import { SetupsBetAmount } from './setups-bet-amount'
import { SetupsBetPools } from './setups-bet-pools'
import { SetupsExitStrategyButtons } from './setups-mode-controls'
import styles from '../../mode-setups.module.scss'

interface FormProps {
  setup: SetupsGameFragment
}

/* eslint-disable-next-line max-statements */
export const SetupsAddPredictForm: React.FC<FormProps> = ({ setup }) => {
  const [activeBetType, setActiveBetType] = useState<SetupPredictType>(
    SetupPredictType.TP
  )
  const [currentAmountValue, setCurrentAmountValue] = useState<string>('')

  const balance = useReactiveVar(balanceVar)

  const {
    id: setupId,
    stopLossPool: stopLossInitPool,
    takeProfitPool: takeProfitInitPool,
    timeframe,
    asset,
    stopPredictAt,
    myPredict,
    takeProfit,
    stopLoss
  } = setup

  const {
    subscriptionData,
    handleAddBetSubmit,
    loading,
    isUserFriellyLogicBetAdded
  } = useSetupAddBetForm(setupId, activeBetType)

  const handleAmountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setCurrentAmountValue(event.target.value),
    [setCurrentAmountValue]
  )

  const userPredict = useFragment(FRAGMENT_SETUPS_PREDICT_SHALLOW, myPredict)

  const setupsGameSubscription = useFragment(
    FRAGMENT_SETUPS_GAME,
    subscriptionData?.setupGameChanged
  )
  const takeProfitPool =
    setupsGameSubscription?.takeProfitPool || takeProfitInitPool
  const stopLossPool = setupsGameSubscription?.stopLossPool || stopLossInitPool
  const summaryBalance = balance.usdtBalance + balance.treasuryDeposit
  const isBalanceEnough =
    currentAmountValue ? summaryBalance >= Number(currentAmountValue) : true

  const submitButtonTitle = isBalanceEnough ? 'PLAY' : 'Insufficient balance'
  const submitButtonDisabled =
    Boolean(currentAmountValue) ? !isBalanceEnough : true

  useEffect(() => {
    if (setupsGameSubscription?.status !== GameStatus.Close) return
    setupsChartAnnotationsVar(null)
  }, [setupsGameSubscription?.status])

  return (
    <Flex className={styles.setupBetForm}>
      <RadixForm.Root
        onSubmit={handleAddBetSubmit}
        className={styles.setupAddBetForm}
      >
        <Flex
          direction='column'
          height={'100%'}
          justify={userPredict ? 'between' : 'start'}
          gap={'9'}
        >
          <Flex
            direction={'column'}
            height={'100%'}
            gap={'6'}
          >
            <Flex direction={'column'}>
              <ShareButton
                gameId={setupId}
                gameMode={RouterPathes.setups}
              />
              <SetupsAddPredictFormHeader
                timeframe={Number(timeframe)}
                assetId={asset?.id as AssetId}
              />
            </Flex>

            <SetupsBetPools pools={[stopLossPool, takeProfitPool]} />

            {!userPredict ?
              <SetupsBetAmount
                setAmount={setCurrentAmountValue}
                amount={currentAmountValue}
                onChange={handleAmountChange}
              />
            : null}

            <SetupsExitStrategyButtons
              activeBetType={activeBetType}
              setActiveBetType={setActiveBetType}
              userPredict={userPredict || null}
              takeProfitPool={takeProfitPool}
              stopLossPool={stopLossPool}
              takeProfitAmount={takeProfit}
              stopLossAmount={stopLoss}
            />
          </Flex>

          <Flex
            direction={'column'}
            gap='4'
          >
            <SetupsAddBetSubmitButton
              stopPredictAt={stopPredictAt}
              userPredict={userPredict || null}
              loading={loading}
              disabled={
                submitButtonDisabled ||
                Boolean(userPredict) ||
                isUserFriellyLogicBetAdded
              }
              title={submitButtonTitle}
              isUserFriellyLogicBetAdded={isUserFriellyLogicBetAdded}
            />
          </Flex>
        </Flex>
      </RadixForm.Root>
    </Flex>
  )
}
