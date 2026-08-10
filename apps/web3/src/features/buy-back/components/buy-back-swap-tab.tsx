import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { useLoadTokenPrice } from '../hooks/use-load-token-price'
import { SwapCard } from './buy-back-swap-card'
import { BuyBackWrapper } from './buy-back-wrapper'
import styles from '../buy-back.module.scss'

export const BuybackSwapTab = () => {
  const { loadTokenPrice } = useLoadTokenPrice()

  useEffect(() => {
    loadTokenPrice()
  }, [])

  return (
    <BuyBackWrapper>
      <Flex
        width={'100%'}
        align={'center'}
        justify={'center'}
        className={styles.buybackSwapTab}
      >
        <SwapCard />
      </Flex>
    </BuyBackWrapper>
  )
}
