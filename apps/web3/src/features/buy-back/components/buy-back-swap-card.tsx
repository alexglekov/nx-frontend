import { Flex, Text } from '@radix-ui/themes'
import { SwapForm } from './buy-back-swap-form'
import styles from '../buy-back.module.scss'

export const SwapCard = () => {
  return (
    <Flex
      minWidth={'40rem'}
      minHeight={'15rem'}
      className={styles.swapCard}
      p={'6'}
      justify={'center'}
      direction={'column'}
    >
      <Text
        size={'6'}
        align={'center'}
        className='color-white'
        mb={'5'}
      >
        Trade XYRO
      </Text>

      <SwapForm />
    </Flex>
  )
}
