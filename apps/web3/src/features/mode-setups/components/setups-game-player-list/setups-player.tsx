import { Flex, Box } from '@radix-ui/themes'
import { useFragment } from '__generated__'
import { SetupsPredictFragment } from '__generated__/graphql'
import { FRAGMENT_SETUPS_GAME_OWNER } from 'api/mode-setups'
import { TetherToken, XyroNumeral } from 'shared/ui'
import { UserProfileNameWithAvatar } from 'shared/ui/user-profile-link'
import styles from '../../mode-setups.module.scss'

export const SetupsPlayer = ({
  bet,
  place
}: {
  bet: SetupsPredictFragment
  place?: number
}) => {
  const owner = useFragment(FRAGMENT_SETUPS_GAME_OWNER, bet.owner)

  const formattedAmount = bet?.amount?.toFixed(2) ?? 0

  return (
    <li className={styles.playerItem}>
      <Flex
        justify={'between'}
        gap='3'
      >
        <Flex gap='2'>
          {/* TODO: replace with special icons from UI layout */}
          {place && (
            <XyroNumeral
              size='4'
              isWhite={true}
            >
              #{place}
            </XyroNumeral>
          )}

          <UserProfileNameWithAvatar
            name={owner.name}
            avatarUrl={owner.avatarUris[0]}
            userLevel={owner.level?.levelId || 0}
            avatarSize='1'
          />
        </Flex>

        <Flex
          align={'center'}
          justify={'end'}
          gap='1'
        >
          <TetherToken color='yellow' />

          <Box width={'6'}>
            <XyroNumeral isWhite={true}>{formattedAmount}</XyroNumeral>
          </Box>
        </Flex>
      </Flex>
    </li>
  )
}
