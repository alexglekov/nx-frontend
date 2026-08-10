import { Flex } from '@radix-ui/themes'
import { AccountBalance } from './account-profile-balance'
import { AccountLevels } from './account-profile-levels'

export const AccountInfo: React.FC = () => {
  return (
    <Flex
      direction={'column'}
      gap={'4'}
    >
      <AccountBalance />

      <AccountLevels />
    </Flex>
  )
}
