import React from 'react'
import { useQuery } from '@apollo/client'
import { Badge, Flex, Text } from '@radix-ui/themes'
import { SetupsGameOwnerFragment } from '__generated__/graphql'
import { GET_USER_BETS_STATISTIC } from 'api/user-profile/get-user-bets-statistic'
import {
  AVATAR_FALLBACK_DEFAULT,
  DataTestIDs,
  NAME_FALLBACK_DEFAULT
} from 'shared/constants'
import { XyroAvatar } from 'shared/ui'
import { DotTitle } from 'shared/ui/dot-title/dot-title'
import styles from '../../mode-setups.module.scss'

interface Props {
  user: SetupsGameOwnerFragment
}
export const SetupsInfluencerPreview: React.FC<Props> = ({ user }) => {
  // const { user } = useQueryUserById(userId)

  const { data } = useQuery(GET_USER_BETS_STATISTIC, {
    variables: {
      // TODO: replace to account.address
      userId: user?.id
    }
  })

  const userWinrate = data?.getUserBetsStatistic.winrate

  const { name: userName, avatarUris } = user || {}
  const name = userName ? userName : NAME_FALLBACK_DEFAULT
  const userLevel = user?.level?.levelId || 0

  return (
    <Flex
      position={'relative'}
      className={styles.influencerPreview}
      justify={'between'}
      pb='4'
    >
      <Flex gap='4'>
        <XyroAvatar
          src={avatarUris?.[0]}
          userLevel={userLevel}
          fallback={name[0] || AVATAR_FALLBACK_DEFAULT}
          size={'3'}
        />

        <Flex
          direction={'column'}
          align={'center'}
          gap={'1'}
        >
          <DotTitle
            withDot={false}
            color='gray'
          >
            SETUP BY:
          </DotTitle>
          <Flex
            direction={'column'}
            width={'100%'}
            align={'center'}
            gap={'1'}
          >
            <Text
              className={styles.ownerName}
              data-testid={DataTestIDs.cardOpenedSetupOwner}
            >
              {name}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {Boolean(userWinrate) && (
        <Flex
          align={'center'}
          justify={'center'}
          direction={'column'}
          gap='1'
        >
          <DotTitle
            withDot={false}
            color='gray'
          >
            WINRATE:
          </DotTitle>
          <Badge
            size={'2'}
            radius='large'
            color='green'
          >
            {userWinrate}
          </Badge>
        </Flex>
      )}
    </Flex>
  )
}
