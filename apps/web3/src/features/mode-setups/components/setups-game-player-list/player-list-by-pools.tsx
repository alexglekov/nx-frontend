import { Flex } from '@radix-ui/themes'
import { SetupsPredictFragment } from '__generated__/graphql'
import { BetList } from '../setups-game-view/bet-list'

export const PlayerListByPools = ({
  bets
}: {
  bets: SetupsPredictFragment[]
}) => {
  const upBets = bets?.filter(bet => bet.isLong)
  const downBets = bets?.filter(bet => !bet.isLong)

  return (
    <Flex gap='6'>
      <BetList
        type='UP'
        bets={upBets}
      />

      <BetList
        type={'DOWN'}
        bets={downBets}
      />
    </Flex>
  )
}
