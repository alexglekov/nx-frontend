/* eslint-disable max-lines */
import React from 'react'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import cn from 'classnames'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import { CopyIcon } from 'shared/icons'
import { notificationStateVar } from 'shared/store/notification'
import { useInviteFriendsInfo } from '../hooks/use-invite-friends-info'
import { ChangeRefferalCodeModal } from './rewards-dialog-referral-code'
import styles from '../rewards.module.scss'

export const InviteFriends: React.FC = () => {
  const {
    refferalCode,
    refferalCodeLoading,
    numberOfInvited,
    numberOfSecondLevelInvited,
    referralStatisticDataLoading
  } = useInviteFriendsInfo()

  const referralCodeLink = `${window.location.origin}/?referralCode=${refferalCode}`
  const referralCodeLinkDisplayText = `xyro.io/?referralCode=${refferalCode}`

  const handleCopyCode = async () => {
    if (!refferalCode) return

    await navigator.clipboard.writeText(referralCodeLink)

    notificationStateVar({
      isOpen: true,
      type: 'success',
      title: 'Success',
      description: 'Referral link was successfully copied to you clipboard'
    })
  }

  if (referralStatisticDataLoading || refferalCodeLoading)
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
            {refferalCodeLoading ? 'Loading...' : refferalCode}
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
              className={styles.iviteLinkExampleText}
            >
              {referralCodeLinkDisplayText}
            </Text>
          </Link>
        </Text>
      </Flex>

      {/* TODO: implement share button for twitter logic */}
      {/* <Button
        size={'3'}
        variant='outline'
        color='yellow'
        mb={'7'}
      >
        <Text
          weight={'bold'}
          size={'2'}
        >
          SHARE INVITE CODE IN X (TWITTER)
        </Text>
      </Button> */}

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
            {numberOfInvited} Friends
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
            {numberOfSecondLevelInvited} Friends
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
