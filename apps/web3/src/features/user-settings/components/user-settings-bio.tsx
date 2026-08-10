import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { userVar } from 'shared/store/user'
import { ChangeBioModal } from './change-bio-modal'
import styles from '../user-settings.module.scss'

export const UserSettingsBio: React.FC = () => {
  const user = useReactiveVar(userVar)

  return (
    <Flex
      align={'center'}
      justify={'between'}
      width={'100%'}
    >
      <Flex
        direction={'column'}
        gap={'0'}
      >
        <Flex
          direction={'column'}
          gap={'2'}
        >
          <Text
            size={'1'}
            weight={'bold'}
            className={styles.mainItemTextTitle}
          >
            BIO
          </Text>
          <Text
            size={'3'}
            weight={'light'}
          >
            <Flex
              align={'center'}
              gap={'1'}
            >
              <Text
                className={cn({
                  'color-gray-dark': !Boolean(user?.bio),
                  [styles.userBioText]: Boolean(user?.bio)
                })}
                size={'3'}
                weight={'bold'}
                data-testid={DataTestIDs.userSettingsBio}
              >
                {user?.bio || 'Tell us a little bit about yourself'}
              </Text>
            </Flex>
          </Text>
        </Flex>
      </Flex>

      <ChangeBioModal />
    </Flex>
  )
}
