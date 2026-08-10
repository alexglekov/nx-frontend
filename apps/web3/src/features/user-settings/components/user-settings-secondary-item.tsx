import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Flex, Switch, Text } from '@radix-ui/themes'
import {
  UpdateNotificationsPolicyMutation,
  UpdatePrivacyPolicyMutation
} from '__generated__/graphql'
import { UPDATE_EMAIL_NOTIFICATIONS } from 'api/user-settings/update-email-notofications'
import { UPDATE_PRIVACY_POLICY } from 'api/user-settings/update-privacy-policies'
import {
  emailNotificationsVar,
  privacySettingsVar
} from '../store/privacy-notifications.store'
import { UserSettingSecondaryItem } from '../types'
import styles from '../user-settings.module.scss'
import {
  errorGlobalNotification,
  successGloalNotification
} from '../utils/global-notifications'

const PRIVACY_POLICY_TYPE = 'PrivacyPolicyType'

export const UserSettingsSecondaryItem: React.FC<
  UserSettingSecondaryItem & { isEnabled: boolean; itemType: string }
> = ({ name, isEnabled, isMain, id, itemType }) => {
  const isPrivacyPolicy = itemType === PRIVACY_POLICY_TYPE
  const [isSwitchActive, setSwitchActive] = useState<boolean>(false)
  const [commitUpdatePoliciesNotifications, { loading }] = useMutation<
    UpdatePrivacyPolicyMutation | UpdateNotificationsPolicyMutation
  >(isPrivacyPolicy ? UPDATE_PRIVACY_POLICY : UPDATE_EMAIL_NOTIFICATIONS)

  useEffect(() => {
    setSwitchActive(isEnabled)
  }, [isEnabled])

  // eslint-disable-next-line max-statements
  const handleSwitch = async () => {
    if (loading || !itemType) return
    setSwitchActive(!isSwitchActive)

    const mutationOptions = {
      variables: { changes: { [id]: !isSwitchActive } },
      onError: () => errorGlobalNotification(`${name} was not updated`),
      onCompleted: () =>
        successGloalNotification(`${name} was successfully updated`)
    }

    const updatePoliciesNotificationsRes =
      await commitUpdatePoliciesNotifications(mutationOptions)

    if (!updatePoliciesNotificationsRes?.data) {
      setSwitchActive(!isSwitchActive)
      throw new Error('No data returned from the server')
    }

    const updatePolicyData = updatePoliciesNotificationsRes?.data
    if ('updatePrivacyPolicy' in updatePolicyData) {
      privacySettingsVar(updatePolicyData.updatePrivacyPolicy)
    } else if ('updateNotificationsPolicy' in updatePolicyData) {
      emailNotificationsVar(updatePolicyData.updateNotificationsPolicy)
    }
  }

  return (
    <Flex
      justify={'between'}
      align={'center'}
    >
      <Text
        size={'3'}
        weight={'medium'}
        className={isMain ? 'color-white' : 'color-gray-light'}
      >
        {name}
      </Text>
      <Switch
        className={styles.switcher}
        size={'2'}
        radius='full'
        color='yellow'
        checked={isSwitchActive}
        onClick={handleSwitch}
      />
    </Flex>
  )
}
