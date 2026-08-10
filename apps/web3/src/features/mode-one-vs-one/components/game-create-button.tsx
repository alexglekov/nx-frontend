import { Flex, Button, Text } from '@radix-ui/themes'
import { isCreate1vs1DialogOpenVar } from '../store/dialog'
import styles from '../mode-one-vs-one.module.scss'

export const GameCreateButton = () => {
  const handleClick = () => isCreate1vs1DialogOpenVar(true)

  return (
    <Flex
      justify={'center'}
      className={styles.createGameButtonWrap}
      mb={'2'}
    >
      <Button
        color={'green'}
        className={styles.createGameButton}
        size={'4'}
        onClick={handleClick}
      >
        <Text weight={'bold'}>+ Create game</Text>
      </Button>
    </Flex>
  )
}
