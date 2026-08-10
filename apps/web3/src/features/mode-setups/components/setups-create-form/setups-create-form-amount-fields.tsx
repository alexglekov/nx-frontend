import { useReactiveVar } from '@apollo/client'
import { getExitStrategyBoundaries } from 'features/mode-setups/utils/get-exit-strategy-boundaries'
import { DataTestIDs, PRICE_PATTERN, PRICE_REGEXP } from 'shared/constants'
import { selectedAssetVar } from 'shared/store/selected-asset'
import { AmountField } from 'shared/ui'
import { FieldNames } from '../../types'
import styles from '../../mode-setups.module.scss'

interface Props {
  isLong: boolean
  currentAssetPrice: number
  placeholder: string
}
// eslint-disable-next-line max-statements
export const SetupsCreateFormAmountFields: React.FC<Props> = ({
  isLong,
  currentAssetPrice,
  placeholder
}) => {
  const selectedAsset = useReactiveVar(selectedAssetVar)

  const takeProfitBoundaries = getExitStrategyBoundaries(
    currentAssetPrice,
    isLong,
    'TP'
  )
  const stopLosslBoundaries = getExitStrategyBoundaries(
    currentAssetPrice,
    isLong,
    'SL'
  )

  return (
    <>
      <AmountField
        label='Take Profit'
        maxAmount={takeProfitBoundaries?.[0]}
        minAmount={takeProfitBoundaries?.[1]}
        name={FieldNames.setupTakeProfit}
        placeholder={placeholder}
        isDisabled={!selectedAsset}
        className={styles.amountFieldWithoutPadding}
        hasTetherIcon={false}
        dataTestID={DataTestIDs.inputSetupsTP}
        regexp={PRICE_REGEXP}
        pattern={PRICE_PATTERN}
        inputMode='decimal'
      />

      <AmountField
        label='Stop loss'
        maxAmount={stopLosslBoundaries?.[0]}
        minAmount={stopLosslBoundaries?.[1]}
        name={FieldNames.setupStopLoss}
        placeholder={placeholder}
        isDisabled={!selectedAsset}
        className={styles.amountFieldWithoutPadding}
        hasTetherIcon={false}
        dataTestID={DataTestIDs.inputSetupsSL}
        regexp={PRICE_REGEXP}
        pattern={PRICE_PATTERN}
        inputMode='decimal'
      />
    </>
  )
}
