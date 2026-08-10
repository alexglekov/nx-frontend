import { useCallback, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex, Separator } from '@radix-ui/themes'
import { balanceVar } from 'shared/store/balance-store'
import { Maybe } from 'shared/types'
import { useCoins } from '../hooks/use-coins'
import { useWithdraw } from '../hooks/use-withdraw'
import { isWithdrawDialogOpenVar } from '../store/dialogs-balance-store'
import { CoinType, WithdrawPercentageItem } from '../types'
import { AvailableWithdrawAmount } from './available-withdraw-amount'
import { CoinSelect } from './balance-coin-select'
import { BalanceTextField } from './balance-text-field'
import { DepositParamView } from './deposit-param-view'
import styles from '../balance-add.module.scss'

// eslint-disable-next-line max-statements, complexity
export const FormWithdraw: React.FC = () => {
  const { coins, error, loading } = useCoins()
  const { commitWithdraw } = useWithdraw()

  const balance = useReactiveVar(balanceVar)
  const [amount, setAmount] = useState(0)
  const [address, setAddress] = useState('')
  const [activeWirhdrawPercentage, setActiveWithdrawPercentage] =
    useState<WithdrawPercentageItem | null>(null)
  const [coin, setCoin] = useState<Maybe<CoinType>>()

  const handleAmountChange = useCallback(
    (value: string) => {
      setAmount(Number(value))
    },
    [setAmount]
  )
  const handleCancel = () => isWithdrawDialogOpenVar(false)
  const handleWithdraw = useCallback(() => {
    if (!address || !amount || !coin || !commitWithdraw) return

    commitWithdraw({
      address,
      amountUsd: amount,
      currency: coin.name
    })
  }, [coin, amount, address, commitWithdraw])

  const minimumAmount = coin?.minimumAmount || 0
  const amountCurrency = amount / (coin?.rate || 1)
  const isRejectToWithdraw =
    amount === 0 ||
    !Boolean(coin) ||
    amount > balance.usdtBalance ||
    amountCurrency < minimumAmount

  return (
    <Flex
      direction={'column'}
      gap={'3'}
    >
      <AvailableWithdrawAmount />

      <BalanceTextField
        value={String(amount)}
        setValue={handleAmountChange}
        isEqualsXYROToken
        isWithDraw
        activeWirhdrawPercentage={activeWirhdrawPercentage}
        setActiveWirhdrawPercentage={setActiveWithdrawPercentage}
      />

      <CoinSelect
        amount={Number(amount)}
        coins={coins}
        error={error}
        loading={loading}
        onChange={setCoin}
      />

      <Separator
        size={'4'}
        my={'1'}
      />

      <DepositParamView coin={coin as CoinType} />

      <Button
        disabled={isRejectToWithdraw}
        onClick={handleWithdraw}
        className={
          isRejectToWithdraw ? styles.topUpButtonDisabled : styles.topUpButton
        }
      >
        Withdraw
      </Button>
      <Button
        variant='soft'
        onClick={handleCancel}
        className={styles.cancelButton}
      >
        Cancel
      </Button>
    </Flex>
  )
}
