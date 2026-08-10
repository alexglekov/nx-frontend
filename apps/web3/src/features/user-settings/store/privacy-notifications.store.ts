import { makeVar } from '@apollo/client'
import {
  Maybe,
  UpdateNotificationsPolicyMutation,
  UpdatePrivacyPolicyMutation
} from '__generated__/graphql'

type EmailNotificationPolicyType =
  UpdateNotificationsPolicyMutation['updateNotificationsPolicy']
type NotificationPrivacyPolicyType =
  UpdatePrivacyPolicyMutation['updatePrivacyPolicy']

export const privacySettingsVar =
  makeVar<Maybe<NotificationPrivacyPolicyType>>(null)
export const emailNotificationsVar =
  makeVar<Maybe<EmailNotificationPolicyType>>(null)
