/* eslint-disable max-statements */
import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { ConnectIcon, VerifyBadgeIcon } from 'shared/icons'
import { notificationStateVar } from 'shared/store/notification'
import { SOCAL_BUTTON_PARAMS_MAP, SocialsOptions } from '../constants'
import { useConncetSocialNetwork } from '../hooks/use-connect-social-network'
import { isSocialNetworkAttachLoadingVar } from '../store/social-network-attach.store'
import styles from '../user-settings.module.scss'

interface Props {
  type: SocialsOptions
  isVerified?: boolean | null
  verifiedName?: string | null
}
// eslint-disable-next-line complexity
export const UserSettignsSocialsItem: React.FC<Props> = ({
  type,
  isVerified = false,
  verifiedName = ''
}) => {
  const { verifySocials, loading } = useConncetSocialNetwork()

  const isAttachSocialNetworkLoading = useReactiveVar(
    isSocialNetworkAttachLoadingVar
  )

  const socialItemName = SOCAL_BUTTON_PARAMS_MAP[type].name
  const SocialItemIcon = SOCAL_BUTTON_PARAMS_MAP[type].icon
  const SocialItemGhostIcon = SOCAL_BUTTON_PARAMS_MAP[type].ghostIcon

  const verifiedIconColor = type === twitter ? 'var(--black)' : 'var(--white)'

  const virifiedBackgroundColor =
    SOCAL_BUTTON_PARAMS_MAP[type].verifiedBackgroundColor

  // eslint-disable-next-line max-statements
  const handleConncetSocialNetwork = () => {
    if (isVerified) return

    if (loading || isAttachSocialNetworkLoading) {
      notifyOnWarning()
      return
    }

    if (type === discord || type === twitter) {
      verifySocials[type].getRedirectUri()
      return
    }

    if (type === metamask) {
      verifySocials[type].connect()
      return
    }

    if (type === telegram) return

    // TODO: Replace it with proper SN conncetion methods
    notificationStateVar({
      isOpen: true,
      type: 'warning',
      title: 'Oops..',
      description: 'Chosen method is not allowed yet'
    })
  }

  const formattedVerifiedName =
    verifiedName && verifiedName.length > 20 ?
      verifiedName.slice(0, 20) + '...'
    : verifiedName

  return (
    <Flex
      className={styles.userSettingsSocialsItemWrapper}
      width={'100%'}
      direction={'column'}
      onClick={handleConncetSocialNetwork}
    >
      <Flex
        align={'start'}
        justify={'between'}
      >
        <Flex
          className={styles.socialsItemLogo}
          style={isVerified ? { backgroundColor: virifiedBackgroundColor } : {}}
          align={'center'}
          justify={'center'}
        >
          {isVerified ?
            <SocialItemIcon color={verifiedIconColor} />
          : <SocialItemGhostIcon color='var(--white)' />}
        </Flex>

        {isVerified ?
          <VerifyBadgeIcon color='var(--yellow)' />
        : <ConnectIcon color='var(--c-gray-40)' />}
      </Flex>

      <Flex
        width={'100%'}
        direction={'column'}
        gap={'1'}
      >
        <Text
          className='color-white'
          size={'2'}
          weight={'medium'}
        >
          {socialItemName}
        </Text>

        <Text
          className={styles.socialsItemNick}
          size={'1'}
          weight={'medium'}
        >
          {isVerified && verifiedName ?
            formattedVerifiedName
          : `Veriy your ${socialItemName} account`}
        </Text>
      </Flex>
    </Flex>
  )
}

const { discord, twitter, metamask, telegram } = SocialsOptions

const notifyOnWarning = () =>
  notificationStateVar({
    isOpen: true,
    type: 'warning',
    title: 'Warning',
    description: 'You already have pending conncetion'
  })
