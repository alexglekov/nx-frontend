/* eslint-disable max-lines */
import React from 'react'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import cn from 'classnames'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import { CopyIcon } from 'shared/icons'
import { notificationStateVar } from 'shared/store/notification'
import { useReferralData } from '../hooks/use-referral-data'
import { ChangeRefferalCodeModal } from './rewards-dialog-referral-code'
import styles from '../referral.module.scss'

export const InviteFriends: React.FC = () => {
  const {
    referralUserLevel: { code: referralCode } = {},
    numberOfOwnReferrals: {
      numberOfDepositedReferrals: numberOfInvites = 0,
      numberOfDepositedSubReferrals: numberOfSubInvites = 0
    } = {},
    loading
  } = useReferralData()

  const referralCodeLink = `${window.location.origin}/?referralCode=${referralCode}`
  const referralCodeLinkDisplayText = `xyro.io/?referralCode=${referralCode}`

  const handleCopyCode = async () => {
    if (!referralCode) return

    await navigator.clipboard.writeText(referralCodeLink)

    notificationStateVar({
      isOpen: true,
      type: 'success',
      title: 'Success',
      description: 'Referral link was successfully copied to you clipboard'
    })
  }

  if (loading)
    return (
      <Skeleton
        width={'100%'}
        height={'44.5rem'}
        borderRadius={'5rem'}
      />
    )

  return (
    <Flex
      width={'100%'}
      className={styles.inviteFriendsWrapper}
      direction={'column'}
      justify={'between'}
    >
      <Flex
        width={'100%'}
        direction={'column'}
      >
        <Text
          className={cn('color-white', styles.inviteFriendsTitle)}
          size={'4'}
          weight={'bold'}
          mb={'2'}
        >
          Invite Friends with a Referral Code
        </Text>

        <Text
          className={cn('color-white', styles.shareCodeText)}
          size={'2'}
          weight={'regular'}
          mb={'4'}
        >
          Share referral link with your friends and get rewards.
        </Text>

        <Flex
          className={styles.referralCodeContainer}
          width={'100%'}
          justify={'between'}
          align={'center'}
          mb={'2'}
        >
          <Text className={styles.referralCodeText}>
            {loading ? 'Loading...' : referralCode}
          </Text>

          <Flex
            align={'center'}
            gap={'2'}
          >
            <ChangeRefferalCodeModal />

            <IconButton
              variant='ghost'
              className={cn(styles.copyIcon, 'cursor-pointer')}
              onClick={handleCopyCode}
            >
              <CopyIcon className='color-white' />
            </IconButton>
          </Flex>
        </Flex>

        <Text
          size={'2'}
          weight={'medium'}
          className='color-white'
          mb={{ initial: '2', sm: '0' }}
        >
          Link example:{' '}
          <Link to={referralCodeLink}>
            <Text
              size={'2'}
              weight={'medium'}
              color='blue'
              className={styles.inviteLinkExampleText}
            >
              {referralCodeLinkDisplayText}
            </Text>
          </Link>
        </Text>
      </Flex>

      <Flex
        direction={'column'}
        width={'100%'}
        gap={'2'}
      >
        <Flex
          align={'center'}
          justify={'between'}
          width={'100%'}
        >
          <Text
            size={'1'}
            weight={'medium'}
            className={styles.invitesStatTitle}
          >
            You invited:
          </Text>
          <Text
            size={'1'}
            weight={'bold'}
            className='color-white'
          >
            {numberOfInvites} Friends
          </Text>
        </Flex>

        <Flex
          align={'center'}
          justify={'between'}
          width={'100%'}
        >
          <Text
            size={'1'}
            weight={'medium'}
            className={styles.invitesStatTitle}
          >
            You Referrals Invited:
          </Text>
          <Text
            size={'1'}
            weight={'bold'}
            className='color-white'
          >
            {numberOfSubInvites} Friends
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
