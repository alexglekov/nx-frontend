import { useCallback, useState } from 'react'
import { Button, Flex, Separator, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { AVATAR_FALLBACK_DEFAULT } from 'shared/constants'
import { useFetchProfileByUrlParam } from 'shared/hooks/use-fetch-user-by-url-param'
import { MAP_ACCOUNT_LEVEL_ICON } from '../../../features/account/utils/map-account-level'
import { XyroAvatar } from '../xyro-avatar/xyro-avatar'
import { XyroDialog } from '../xyro-dialog/xyro-dialog'
import styles from './user-profile-link.module.scss'
import {
  UserNameProps,
  UserProfileNameWithAvatar
} from './user-profile-name-with-avatar'

// eslint-disable-next-line max-statements
export const UserProfileModal: React.FC<UserNameProps> = props => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const handleOpenChange = useCallback(
    (isOpen: boolean) => setDialogIsOpen(isOpen),
    []
  )

  const { user: watchingProfile, tierStats } = useFetchProfileByUrlParam(
    props.id,
    dialogIsOpen
  )

  const userLevel = props.userLevel
  const avatarUrl = props.avatarUrl
  const name = watchingProfile?.name || props.name
  const nameFallback = name?.at(0) || AVATAR_FALLBACK_DEFAULT
  const bio = watchingProfile?.bio || 'No bio yet'
  const createdAt =
    watchingProfile?.createdAt ?
      format(watchingProfile?.createdAt, 'dd.MM.yyyy')
    : 'N/A'

  const tierLevel = Number(tierStats?.tier) || 1
  const level = tierStats?.lvl || 1

  const IconTier = MAP_ACCOUNT_LEVEL_ICON[tierLevel]

  return (
    <XyroDialog
      key={`user-profile-dialog-${props.id}`}
      open={dialogIsOpen}
      onOpenChange={handleOpenChange}
      className={styles.dialogContent}
      dialogTrigger={
        <Button
          variant={'ghost'}
          className={styles.button}
          disabled={!Boolean(props.id)}
        >
          <UserProfileNameWithAvatar {...props} />
        </Button>
      }
    >
      <Flex
        className={styles.wrapper}
        direction={'column'}
        gap={'5'}
      >
        <Flex
          align={'start'}
          gap={'4'}
        >
          <XyroAvatar
            displayLevel={false}
            src={avatarUrl}
            size={'8'}
            userLevel={userLevel}
            fallback={nameFallback}
          />

          <Text
            size={'6'}
            className={'color-white'}
            weight={'bold'}
          >
            {name}
          </Text>
        </Flex>

        <Text
          size={'3'}
          className={'color-gray-light'}
        >
          {bio}
        </Text>

        <Flex
          align={{ initial: 'start', sm: 'center' }}
          justify={'between'}
          direction={{ initial: 'column', sm: 'row' }}
          gap={'4'}
        >
          <Flex
            direction={'column'}
            gap={'3'}
          >
            <Text
              size={'4'}
              className={'color-white'}
            >
              System Tiers
            </Text>

            <Flex
              align={'center'}
              gap={'2'}
            >
              <IconTier
                width={'8rem'}
                height={'8rem'}
              />

              <Flex
                direction={'column'}
                gap={'1'}
              >
                <Text className={'color-gray-light'}>Tier {tierLevel}</Text>

                <Text
                  className={'color-white'}
                  size={'3'}
                >
                  Level {level}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Separator
          size={'2'}
          className={styles.separator}
        />

        <Flex direction={'column'}>
          <StatsItem
            value={createdAt}
            title={'Joined On'}
          />
        </Flex>
      </Flex>
    </XyroDialog>
  )
}

interface StatsItemProps {
  title: string
  value: string
}

const StatsItem: React.FC<StatsItemProps> = ({ title, value }) => {
  return (
    <Flex
      align={'center'}
      gap={'2'}
    >
      <Text
        size={'2'}
        className={'color-gray-light'}
      >
        {title}:
      </Text>

      <Text
        size={'2'}
        className={'color-white'}
        weight={'bold'}
      >
        {value}
      </Text>
    </Flex>
  )
}
