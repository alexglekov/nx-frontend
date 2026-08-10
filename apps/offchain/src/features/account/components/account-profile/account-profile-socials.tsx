import React from 'react'
import { Flex, Grid, Text } from '@radix-ui/themes'
import { User } from '__generated__/graphql'
import { UserSettignsSocialsItem } from 'features/user-settings/components/user-settings-socials-item'
import { UserSettingsTelegramSocialItem } from 'features/user-settings/components/user-settings-telegram-social-item'
import { SocialsOptions } from 'features/user-settings/constants'
import { useAttachSocialNetwork } from 'features/user-settings/hooks/use-attach-social-network'
import styles from '../../account.module.scss'

interface Props {
  user: User | null
}
export const AccountSocials: React.FC<Props> = ({ user }) => {
  useAttachSocialNetwork()

  const isMetamaskVerified = Boolean(user?.wallet?.address)

  const isDiscordVerified = Boolean(user?.discord?.id)

  const isTwitterVerified = Boolean(user?.twitter?.id)

  const isTelegramVerified = Boolean(user?.telegram?.telegramId)

  return (
    <Flex
      className={styles.accountInfoWrapper}
      width={'100%'}
      direction={'column'}
      gap={'3'}
    >
      <Text
        size={'4'}
        weight={'bold'}
        className={'color-white'}
      >
        Social and Wallet links
      </Text>

      <Grid
        width={'100%'}
        justify={'between'}
        gap={'4'}
        columns={{
          initial: '1fr',
          sm: '1fr 1fr 1fr'
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

        <UserSettignsSocialsItem
          type={SocialsOptions.metamask}
          isVerified={isMetamaskVerified}
          verifiedName={user?.wallet?.address}
        />
      </Grid>

      <UserSettingsTelegramSocialItem
        isVerified={isTelegramVerified}
        verifiedName={user?.telegram?.username}
      />
    </Flex>
  )
}
