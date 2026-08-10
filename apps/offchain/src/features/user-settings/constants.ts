/* eslint-disable max-lines */
import { DataTestIDs, RouterPathes } from 'shared/constants'
import {
  DiscordLogoIcon,
  MetamaskLogoIcon,
  TelegramLogoIcon,
  TwitterLogoIcon
} from 'shared/icons'
import { UserSettingSecondaryItem } from './types'

export const PRIVACY_SETTINGS_TITLE = 'Privacy'
export const PRIVACY_SETTINGS: UserSettingSecondaryItem[] = [
  {
    name: 'Show my profile to other users',
    id: 'showProfile',
    isMain: true
  },
  {
    name: 'Show my Achievements to other users',
    id: 'showAchievements',
    isMain: false
  },
  {
    name: 'Show my stats to other users',
    id: 'showSetups',
    isMain: false
  },
  {
    name: 'Show my setups to other users',
    id: 'showStats',
    isMain: false
  },
  {
    name: 'Show my gaming history to other users',
    id: 'showBettingHistory',
    isMain: false
  },
  {
    name: 'Allow other users tag me in chat',
    id: 'allowTagInChat',
    isMain: false
  },
  {
    name: 'Allow other users invite me to 1 vs 1 game',
    id: 'allowInviteIn1vs1Game',
    isMain: false
  }
]

export const EMAIL_NOTIFICATION_SETTINGS_TITLE = 'Email notifications'
export const EMAIL_NOTIFICATION_SETTINGS: UserSettingSecondaryItem[] = [
  {
    name: 'Send notifications to email',
    id: 'sendNotificationsToEmail',
    isMain: true
  },
  {
    name: 'Send notifications on deposit/withdrawal',
    id: 'notifyDepositWithdrawal',
    isMain: false
  }
]

export const MAIN_SETTINGS = {
  NAME: {
    name: 'Name',
    buttonText: 'Change name',
    dataTestIdLocator: DataTestIDs.userSettingsName
  },
  EMAIL: {
    name: 'Email',
    buttonText: 'Change email',
    dataTestIdLocator: DataTestIDs.userSettingsEmail
  },
  PASSWORD: {
    name: 'Password',
    buttonText: 'Change password',
    dataTestIdLocator: DataTestIDs.userSettingsPassword
  }
}

export const DELETE_ACCOUNT_REASON_OPTIONS = {
  smthBroken: "Something's broken",
  usingAnotherSevice: 'Using another service',
  other: 'Other'
}

export const MODALS_FIELDS = {
  CHANGE_NAME: {
    name: {
      label: 'Enter new name',
      value: 'username',
      placeholder: 'Type name'
    }
  },
  CHANGE_PASSWORD: {
    oldPassword: {
      label: 'OLD PASSWORD',
      value: 'oldPassword',
      placeholder: 'Type current password'
    },
    newPassword: {
      label: 'NEW PASSWORD',
      value: 'newPassword',
      placeholder: 'Create new password'
    },
    newPasswordRepeated: {
      label: 'CONFIRM NEW PASSORD',
      value: 'newPasswordRepeated',
      placeholder: 'Repeat new password'
    }
  },
  DELETE_ACCOUNT: {
    password: {
      label: 'Enter password',
      value: 'password',
      placeholder: 'Type a password'
    }
  },
  CHANGE_EMAIL: {
    email: {
      label: 'Enter new email',
      placeholder: 'example@mail.com'
    }
  }
}

export const UPLOAD_FILE_TYPES = ['JPG', 'PNG', 'JPEG', 'SVG']
export const UPLOAD_FILE_TYPES_STRING =
  'image/png, image/jpeg, image/png, image/svg'

export const MAX_AVATAR_SIZE_MB = 1

export const MAX_SYMBOLS_CHANGE_BIO_INPUT_VALUE = 200

export enum SocialsOptions {
  twitter = 'twitter',
  discord = 'discord',
  telegram = 'telegram',
  metamask = 'metamask'
}

export const SOCAL_BUTTON_PARAMS_MAP = {
  [SocialsOptions.discord]: {
    name: 'Discord',
    icon: DiscordLogoIcon,
    ghostIcon: DiscordLogoIcon,
    verifiedBackgroundColor: '#5F3AF3',
    verifiedIconColor: ''
  },
  [SocialsOptions.twitter]: {
    name: 'X (Twitter)',
    icon: TwitterLogoIcon,
    ghostIcon: TwitterLogoIcon,
    verifiedBackgroundColor: '#E7E3FF',
    verifiedIconColor: ''
  },
  [SocialsOptions.telegram]: {
    name: 'Telegram',
    icon: TelegramLogoIcon,
    ghostIcon: TelegramLogoIcon,
    verifiedBackgroundColor: '#2398EE',
    verifiedIconColor: ''
  },
  [SocialsOptions.metamask]: {
    name: 'Wallet',
    icon: MetamaskLogoIcon,
    ghostIcon: MetamaskLogoIcon,
    verifiedBackgroundColor: '#FFFFFF',
    verifiedIconColor: ''
  }
}

export const SOCIAL_NETWORK_QUERY_KEY = 'social'

export const SOCIAL_NETWORK_ATTACH_CODE_PARAM = 'code'

export const SOCIAL_NETWORK_ATTACH_STATE_PARAM = 'state'

export const SOCIAL_OPTIONS_REDIRECT_URL = {
  DISCORD: `${window.location.protocol}\/\/${window.location.host}${RouterPathes.accountSocials}?social=discord`,
  TWITTER: `${window.location.protocol}\/\/${window.location.host}${RouterPathes.accountSocials}?social=twitter`,
  TELEGRAM: `${window.location.protocol}\/\/${window.location.host}${RouterPathes.accountSocials}`
}
