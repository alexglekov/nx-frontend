import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import {
  GetNotificationsPoliciesQuery,
  GetPrivacyPoliciesQuery
} from '__generated__/graphql'
import { Maybe } from 'shared/types'
import { UserSettingSecondaryItem } from '../types'
import { UserSettingsSecondaryItem } from './user-settings-secondary-item'
import styles from '../user-settings.module.scss'

type PrivacyPolicyType = GetPrivacyPoliciesQuery['getPrivacyPolicies']
type EmailNotificationPolicyType =
  GetNotificationsPoliciesQuery['getNotificationsPolicies']

interface Props {
  items: UserSettingSecondaryItem[]
  title: string
  itemsInfo?: Maybe<PrivacyPolicyType | EmailNotificationPolicyType>
}
export const UserSettingsSecondaryItems: React.FC<Props> = ({
  items,
  title,
  itemsInfo
}) => {
  const IS_MAIN_FUCTION_ACTIVE =
    itemsInfo && itemsInfo[items[0].id as keyof typeof itemsInfo]

  return (
    <Flex
      direction={'column'}
      gap={'4'}
      mt={'1'}
    >
      <Text
        size={'1'}
        weight={'bold'}
        className={styles.mainItemTextTitle}
      >
        {title.toUpperCase()}
      </Text>
      {IS_MAIN_FUCTION_ACTIVE ?
        items.map((el: UserSettingSecondaryItem) => {
          const isItemEnabled = Boolean(
            itemsInfo?.[el.id as keyof typeof itemsInfo]
          )
          return (
            <UserSettingsSecondaryItem
              key={el.name}
              name={el.name}
              id={el.id}
              isMain={el.isMain}
              isEnabled={isItemEnabled}
              itemType={itemsInfo?.__typename || ''}
            />
          )
        })
      : <UserSettingsSecondaryItem
          key={items[0].name}
          name={items[0].name}
          id={items[0].id}
          isMain={true}
          isEnabled={Boolean(IS_MAIN_FUCTION_ACTIVE)}
          itemType={itemsInfo?.__typename || ''}
        />
      }
    </Flex>
  )
}
