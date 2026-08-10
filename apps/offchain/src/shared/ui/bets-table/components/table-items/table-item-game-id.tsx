import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { CopyIcon } from 'shared/icons'
import { notificationStateVar } from 'shared/store/notification'
import styles from '../../table.module.scss'

interface Props {
  gameId: string
}
export const TableItemGameId: React.FC<Props> = ({ gameId }) => {
  const formattedGameId = gameId.slice(0, 6)

  const handleClick = async () => {
    try {
      await navigator?.clipboard?.writeText(gameId)

      notificationStateVar({
        isOpen: true,
        title: 'Game id was successfully copied to your clipboard',
        type: 'success'
      })
    } catch {
      notificationStateVar({
        isOpen: true,
        title: 'Something went wrong...',
        description: 'Link was not copied to your clipboard',
        type: 'error'
      })
    }
  }

  return (
    <Flex
      align={'center'}
      height={'100%'}
    >
      <Flex
        align={'center'}
        gap={'1'}
        className={styles.gameIdItemContainer}
        onClick={handleClick}
      >
        <CopyIcon
          width={'2rem'}
          height={'2rem'}
          color='var(--c-gray-40)'
        />

        <Text className='color-gray-light'>{formattedGameId}...</Text>
      </Flex>
    </Flex>
  )
}
