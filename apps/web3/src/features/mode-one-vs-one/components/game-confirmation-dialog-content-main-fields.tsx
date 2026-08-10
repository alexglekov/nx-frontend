import { Flex, Text } from '@radix-ui/themes'
import { User } from '__generated__/graphql'
import { AVATAR_FALLBACK_DEFAULT } from 'shared/constants'
import { DiamondIcon } from 'shared/icons'
import { XyroAvatar } from 'shared/ui'
import { DotTitle } from 'shared/ui/dot-title/dot-title'

export interface Props {
  date: string
  time: string
  initiatorPrice: string
  privacyText: string
  startTime: string
  startDate: string
  opponent?: User
}

export const GameConfirmationDialogContentMainFields: React.FC<Props> = ({
  date,
  time,
  initiatorPrice,
  privacyText,
  opponent,
  startDate,
  startTime
}) => {
  return (
    <Flex
      direction={'column'}
      gap={'4'}
    >
      <Flex
        align={'center'}
        justify={'between'}
      >
        <DotTitle>START AT:</DotTitle>
        <Flex
          align={'center'}
          gap={'3'}
        >
          <Text
            size={'2'}
            weight={'bold'}
            className={'color-gray'}
          >
            {startDate}
          </Text>
          <Text
            size={'2'}
            weight={'bold'}
            className={'color-gray'}
          >
            {startTime}
          </Text>
        </Flex>
      </Flex>
      <Flex
        align={'center'}
        justify={'between'}
      >
        <DotTitle>EXPIRE:</DotTitle>
        <Flex
          align={'center'}
          gap={'1'}
        >
          <Text
            size={'2'}
            weight={'bold'}
            className={'color-gray'}
          >
            {date}
          </Text>
          <Text
            size={'2'}
            weight={'bold'}
            className={'color-gray'}
          >
            {time}
          </Text>
        </Flex>
      </Flex>
      <Flex
        align={'center'}
        justify={'between'}
      >
        <DotTitle>PREDICT PRICE:</DotTitle>
        <Text
          size={'2'}
          weight={'bold'}
          className={'color-gray'}
        >
          {initiatorPrice}$
        </Text>
      </Flex>
      <Flex
        align={'center'}
        justify={'between'}
      >
        <DotTitle>TYPE:</DotTitle>
        <Text
          size={'2'}
          weight={'bold'}
          className={'color-gray'}
        >
          {privacyText}
        </Text>
      </Flex>
      {Boolean(opponent) && (
        <Flex
          align={'center'}
          justify={'between'}
        >
          <DotTitle>OPPONENT:</DotTitle>
          <Flex
            align={'center'}
            gap={'2'}
          >
            <XyroAvatar
              src={opponent?.avatarUris[0] || ''}
              fallback={opponent?.name[0] || AVATAR_FALLBACK_DEFAULT}
              userLevel={opponent?.level?.levelId || 0}
              size={'2'}
            />
            <Flex direction={'column'}>
              <Text>{opponent?.name}</Text>
              <Flex align={'center'}>
                <DiamondIcon color='var(--pink)' />
                <DiamondIcon color='var(--yellow)' />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}
