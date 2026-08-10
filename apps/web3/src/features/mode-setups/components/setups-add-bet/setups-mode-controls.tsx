import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import {
  Maybe,
  SetupsGamePoolFragment,
  SetupsPredictShallowFragment
} from '__generated__/graphql'
import { DataTestIDs } from 'shared/constants'
import { SelectionButtonsWithText } from 'shared/ui/selection-buttons/selection-buttons-with-text'
import { formatToUSD } from 'shared/utils/format-price'
import { EXIT_STRATEGY_OPTIONS } from '../../constants'
import { AddBetFieldNames as FieldNames, SetupPredictType } from '../../types'
import { SetupsModeControlsPayout } from './setups-mode-controls-payout'
import styles from '../../mode-setups.module.scss'

interface Props {
  activeBetType: string
  setActiveBetType: React.Dispatch<React.SetStateAction<SetupPredictType>>
  takeProfitPool: SetupsGamePoolFragment
  stopLossPool: SetupsGamePoolFragment
  userPredict: Maybe<SetupsPredictShallowFragment>
  takeProfitAmount: number
  stopLossAmount: number
}
export const SetupsExitStrategyButtons: React.FC<Props> = ({
  activeBetType,
  setActiveBetType,
  takeProfitPool,
  stopLossPool,
  userPredict,
  takeProfitAmount,
  stopLossAmount
}) => {
  const handleBetTypeChange = (value: string) => {
    setActiveBetType(value as SetupPredictType)
  }
  const takeProfitAmountFormatted = formatToUSD(takeProfitAmount) || 0
  const stopLossAmountFormatted = formatToUSD(stopLossAmount) || 0
  const defaultExitStrategyValue = EXIT_STRATEGY_OPTIONS[0].value

  return (
    <Flex
      direction={'column'}
      gap={'2'}
      align={'start'}
      justify={'center'}
      mt={Boolean(userPredict) ? '6' : '4'}
    >
      {Boolean(userPredict) ?
        <Text
          className='color-white'
          size={'2'}
          weight={'regular'}
        >
          Your prediction
        </Text>
      : <Text
          className='color-white'
          size={'2'}
          weight={'regular'}
        >
          2. Will it be <Text weight={'bold'}>Take Profit</Text> or{' '}
          <Text weight={'bold'}>Stop Loss</Text>:
        </Text>
      }

      <SelectionButtonsWithText
        additionalInfoFirstButton={
          <AdditionalInfoAmountBtn
            text={takeProfitAmountFormatted}
            isActive={activeBetType === 'TP'}
          />
        }
        additionalInfoSecondButton={
          <AdditionalInfoAmountBtn
            text={stopLossAmountFormatted}
            isActive={activeBetType === 'SL'}
          />
        }
        name={FieldNames.betType}
        options={EXIT_STRATEGY_OPTIONS}
        defaultFieldValue={defaultExitStrategyValue}
        onChange={handleBetTypeChange}
        appearance={'xyro'}
        disabled={Boolean(userPredict)}
        className={styles.setupTakeProfitSelection}
        size='4'
        dataTestIds={[
          DataTestIDs.buttonJoinSetupsTP,
          DataTestIDs.buttonJoinSetupsSL
        ]}
      />

      <SetupsModeControlsPayout
        takeProfitPool={takeProfitPool}
        stopLossPool={stopLossPool}
      />
    </Flex>
  )
}

interface AdditionalBtnInfoProps {
  text: string | number
  isActive: boolean
}
const AdditionalInfoAmountBtn: React.FC<AdditionalBtnInfoProps> = ({
  text,
  isActive
}) => {
  return (
    <Text
      size={'2'}
      weight={'regular'}
      className={isActive ? 'color-black' : 'color-white'}
    >
      {/* TODO: Refactor this check */}
      {text !== '0.00' ? text : '$0.00'}
    </Text>
  )
}
