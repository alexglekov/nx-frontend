import { Box, Flex } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { TableSkeleton } from '../common-skeletons/table-skeleton'
import { ProfileModesSkeleton } from '../common-skeletons/profile-modes-skeleton'
import { UserProfileInfoSkeleton } from '../common-skeletons/user-profile-info-skeleton'
import styles from './page-skeletons.module.scss'

export const ProfilePageSkeleton: React.FC = () => {
  return (
    <Flex
      direction={'column'}
      width={'100%'}
      gap={'2'}
    >
      <ProfileModesSkeleton />

      <UserProfileInfoSkeleton />

      <Flex
        width={'100%'}
        gap={'6'}
        direction={'column'}
        className={styles.winrateGraphWrapper}
      >
        <Skeleton
          height={'8rem'}
          width={'25rem'}
        />
        <Box
          height={'100%'}
          width={'100%'}
        >
          <Skeleton
            height={'100%'}
            borderRadius={'5rem'}
          />
        </Box>
      </Flex>

      <TableSkeleton />
    </Flex>
  )
}
