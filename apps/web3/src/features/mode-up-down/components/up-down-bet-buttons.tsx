import { useReactiveVar } from '@apollo/client'
import { Grid } from '@radix-ui/themes'
import { useAddUpDownBet } from 'contracts/up-down/hooks/use-add-up-down-bet'
import { userVar } from 'shared/store/user'
import { useCheckBetAllowed } from '../hooks/use-check-bet-allowed'
import { selectedBetVar } from '../store/amount.store'
import { UpDownBetAmountSelection } from './up-down-bet-amount-selection'
import { UpDownBetButton } from './up-down-bet-button'
import styles from '../mode-up-down.module.scss'

export const UpDownBetButtons = () => {
  const selectedBet = useReactiveVar(selectedBetVar)
  const user = useReactiveVar(userVar)

  const { addUpDownBet, isLoading } = useAddUpDownBet()
  const canBet = useCheckBetAllowed()

  const isDisabled = !user || !canBet || Boolean(selectedBet) || isLoading

  return (
    <Grid
      className={styles.betsContainer}
      gap={{ initial: '3', sm: '6' }}
      px={'6'}
    >
      <UpDownBetButton
        createBet={addUpDownBet}
        selectedBet={selectedBet}
        isDisabled={isDisabled}
        loading={isLoading}
        betDirection='UP'
      />

      <UpDownBetAmountSelection canBet={canBet} />

      <UpDownBetButton
        createBet={addUpDownBet}
        selectedBet={selectedBet}
        isDisabled={isDisabled}
        loading={isLoading}
        betDirection='DOWN'
      />
    </Grid>
  )
}
