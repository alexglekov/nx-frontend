import { Button, Flex, Separator } from '@radix-ui/themes'
import { useReactiveVar } from '@apollo/client'
import { useCoins } from '../hooks/use-coins'
import { isDepositDialogOpenVar } from '../store/dialogs-balance-store'
import { coinDepositVar, depositAmountVar } from '../store/coin-store'
import styles from '../balance-add.module.scss'
import { CoinSelect } from './balance-coin-select'
import { BalanceTextField } from './balance-text-field'
import { DepositParamView } from './deposit-param-view'

export interface DepositForm1Props {
  onSubmit: () => void
}
export const FormStep1: React.FC<DepositForm1Props> = ({
  onSubmit: handleSubmit
}) => {
  const { coins, error, loading } = useCoins()

  const amount = useReactiveVar(depositAmountVar)
  const coin = useReactiveVar(coinDepositVar)

  const handleAmountChange = (value: string) => depositAmountVar(Number(value))
  const handleCancel = () => isDepositDialogOpenVar(false)

  const isTopUpButtonDisabled = Number(amount) === 0 || !Boolean(coin)

  return (
    <Flex
      direction={'column'}
      gap={'3'}
    >
      <BalanceTextField
        value={String(amount)}
        setValue={handleAmountChange}
        isEqualsXYROToken
      />
      <CoinSelect
        amount={Number(amount)}
        coins={coins}
        error={error}
        loading={loading}
        onChange={coinDepositVar}
      />

      <Separator
        size={'4'}
        my={'1'}
      />

      <DepositParamView coin={coin} />

      <Button
        disabled={isTopUpButtonDisabled}
        onClick={handleSubmit}
        className={
          isTopUpButtonDisabled
            ? styles.topUpButtonDisabled
            : styles.topUpButton
        }
      >
        TOP UP
      </Button>

      <Button
        onClick={handleCancel}
        className={styles.cancelButton}
      >
        CANCEL
      </Button>
    </Flex>
  )
}
