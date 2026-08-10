import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { AccountWelcomePackList } from './account-welcome-pack-list'
// TODO: Split styles file per feature
import styles from '../../account/account.module.scss'

export const AccountWelcomePack: React.FC = () => {
  return (
    <Flex
      width={'100%'}
      direction={'column'}
      gap={'3.75rem'}
      className={styles.bonusListWrapper}
    >
      <Text
        size={'7'}
        weight={'medium'}
        className='color-white'
      >
        Available welcome bonuses
      </Text>

      <AccountWelcomePackList />
    </Flex>
  )
}
