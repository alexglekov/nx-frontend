import { Flex, Text } from '@radix-ui/themes'
import { formatDate } from 'shared/utils/format-date'
import { useReferralData } from '../hooks/use-referral-data'

export const ActiveSeason: React.FC = () => {
  const { activeReferralSeason } = useReferralData()

  const { startsAt = 0, endsAt = 0 } = activeReferralSeason || {}

  const formattedStartsAt = formatDate(startsAt, false)
  const formattedEndsAt = formatDate(endsAt, false)

  if (!activeReferralSeason || !startsAt || !endsAt) {
    return null
  }

  return (
    <Flex
      direction={'column'}
      gap={{ initial: '0', sm: '3' }}
    >
      <Flex
        align={'center'}
        gap={'2'}
      >
        <Text
          size={'3'}
          className={'color-white'}
          weight={'bold'}
        >
          Season:
        </Text>

        <Text
          size={'3'}
          className={'color-gray'}
        >
          ({formattedStartsAt} - {formattedEndsAt})
        </Text>
      </Flex>

      <Text
        size={'7'}
        weight={'bold'}
        className={'color-white'}
      >
        Referral Tournament
      </Text>
    </Flex>
  )
}
