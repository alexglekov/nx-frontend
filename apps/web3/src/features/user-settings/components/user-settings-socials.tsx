import React from 'react'
import { Flex, Grid, Text } from '@radix-ui/themes'
import { User } from '__generated__/graphql'
import { SocialsOptions } from '../constants'
import { useAttachSocialNetwork } from '../hooks/use-attach-social-network'
import { UserSettignsSocialsItem } from './user-settings-socials-item'
import styles from '../user-settings.module.scss'

interface Props {
  user: User | null
}
export const UserSettignsSocials: React.FC<Props> = ({ user }) => {
  useAttachSocialNetwork()

  const isMetamaskVerified = Boolean(user?.wallet?.address) || null

  const isDiscordVerified = Boolean(user?.discord?.id) || null

  const isTwitterVerified = Boolean(user?.twitter?.id) || null

  return (
    <Flex
      width={'100%'}
      direction={'column'}
      gap={'3'}
    >
      <Text
        size={'1'}
        weight={'bold'}
        className={styles.mainItemTextTitle}
      >
        SOCIAL LINKS
      </Text>

      <Text
        weight={'medium'}
        size={'2'}
        className={styles.socialsSectionDescription}
        mb={'2'}
      >
        Sign in into all of your social media accounts - will verify that you
        are the owner of the accounts and add them to your ID. You can choose
        which services you want to grant access to selected accounts.
      </Text>

      <Grid
        width={'100%'}
        justify={'between'}
        gap={'4'}
        columns={{
          initial: '1fr 1fr',
          sm: '1fr 1fr 1fr 1fr'
        }}
      >
        <UserSettignsSocialsItem
          type={SocialsOptions.twitter}
          isVerified={isTwitterVerified}
          verifiedName={user?.twitter?.name}
        />

        <UserSettignsSocialsItem
          type={SocialsOptions.discord}
          isVerified={isDiscordVerified}
          verifiedName={user?.discord?.name}
        />

        <UserSettignsSocialsItem type={SocialsOptions.telegram} />

        <UserSettignsSocialsItem
          type={SocialsOptions.metamask}
          isVerified={isMetamaskVerified}
          verifiedName={user?.wallet?.address}
        />
      </Grid>
    </Flex>
  )
}
