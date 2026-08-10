import { Flex, Text } from '@radix-ui/themes'
import { ChangeAvatarModal } from './change-avatar-modal'
import styles from '../user-settings.module.scss'

export const UserSettingsPhoto: React.FC = () => {
  return (
    <Flex
      direction={'column'}
      gap={'1'}
    >
      <Text
        size={'1'}
        weight={'bold'}
        className={styles.mainItemTextTitle}
      >
        PHOTO
      </Text>

      <ChangeAvatarModal />
    </Flex>
  )
}
