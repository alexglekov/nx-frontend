import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { User } from '__generated__/graphql'
import { formatBalance } from 'features/approved-balance/format-balance'
import { Link } from 'react-router-dom'
import { DataTestIDs, RouterPathes } from 'shared/constants'
import { useResponsive } from 'shared/hooks/use-responsive'
import { CupIcon } from 'shared/icons'
import { userVar } from 'shared/store/user'
import { Maybe } from 'shared/types'
import { XyroButton, XyroToken } from 'shared/ui'
import { formatHugePrice } from 'shared/utils/format-huge-price'
import { useRewardsBalance } from '../hooks/use-rewards-balance'

export const RewardsBalance = () => {
  const [isMobile] = useResponsive(['xs'])
  const user = useReactiveVar(userVar)
  const { userRewards, loading } = useRewardsBalance(user as Maybe<User>)

  const rewardsBalance = userRewards?.rewards || 0

  const fullFormattedRewardsBalance =
    rewardsBalance > 1000 && isMobile ?
      formatHugePrice(rewardsBalance)
    : formatBalance(rewardsBalance)

  const balanceFormat = loading ? '---' : fullFormattedRewardsBalance

  if (!user) return null

  return (
    <Flex
      align={'center'}
      gap={{ initial: '2', xs: '3' }}
      direction={'row'}
    >
      <Link to={RouterPathes.rewards}>
        <XyroButton
          isIconOnly
          shape='cutted-both'
          color='pink'
          data-testid={DataTestIDs.buttonRewardsHeader}
        >
          <CupIcon
            width={'2.5rem'}
            height={'2.5rem'}
            color='var(--white)'
          />
        </XyroButton>
      </Link>

      <Flex direction={'column'}>
        <Text
          size={'1'}
          className={'color-white'}
          weight={'medium'}
        >
          Rewards
        </Text>

        <Flex
          align={'center'}
          gap={'1'}
        >
          <XyroToken
            size='2.5rem'
            color='yellow'
          />

          <Text
            className='color-white'
            data-testid={DataTestIDs.headerRewardAmount}
          >
            {balanceFormat}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
