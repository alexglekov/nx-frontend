import { Flex } from '@radix-ui/themes'
import { useResponsive } from 'shared/hooks/use-responsive'
import { BullsEyeBetInviteAlert } from './bulls-eye-bet-invite-alert'
import { BullsEyeFormMyBets } from './bulls-eye-form-my-bets'
import { BullsEyeFormUserList } from './bulls-eye-form-user-list'
import { BullsEyePoolInfo } from './bulls-eye-pool-info'
import { BullsEyeWinnerList } from './bulls-eye-winner-list'

export const BullsEyeGameInfo = () => {
  const [isMobile] = useResponsive('xs')

  return (
    <Flex
      direction={'column'}
      gap={'6'}
      width={'100%'}
    >
      <BullsEyePoolInfo />

      <BullsEyeBetInviteAlert />

      {!isMobile && <BullsEyeFormMyBets />}

      <BullsEyeWinnerList />

      <BullsEyeFormUserList />
    </Flex>
  )
}
