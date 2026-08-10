import { useQuery, useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { MeSocialQuery, User } from '__generated__/graphql'
import { GET_ME_SOCIAL } from 'api/auth/me-social'
import { userVar } from 'shared/store/user'
import { accountActiveTabVar } from '../store/account-profile.store'
import { AccountTab } from '../types'
import { AccountBasicInfo } from './account-profile/account-profile-basic-info'
import { AccountInfo } from './account-profile/account-profile-info'
import { AccountSocials } from './account-profile/account-profile-socials'
import { AccountTabSwitcher } from './account-profile/account-profile-tab-switcher'

export const AccountProfile: React.FC = () => {
  const mainUser = useReactiveVar(userVar)

  const { data } = useQuery<MeSocialQuery>(GET_ME_SOCIAL)

  const user = data?.me || mainUser
  const accountActiveTab = useReactiveVar(accountActiveTabVar)

  const renderTabContent = () => {
    switch (accountActiveTab) {
      case AccountTab.MY_ACCOUNT:
        return <AccountInfo />
      case AccountTab.BASIC_INFO:
        return <AccountBasicInfo />
      case AccountTab.SOCIAL:
        return <AccountSocials user={user as User} />
      default:
        return null
    }
  }

  return (
    <Flex
      width={'100%'}
      direction={'column'}
      gap={'5'}
    >
      <AccountTabSwitcher />

      {renderTabContent()}
    </Flex>
  )
}
