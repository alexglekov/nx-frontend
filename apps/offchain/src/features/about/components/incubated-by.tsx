import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { CoinMarketCap } from 'shared/icons/about-page'
import styles from '../about.module.scss'

export const IncubatedBy = () => {
  return (
    <Flex
      className={styles.incubatedBy}
      align={'center'}
      justify={'center'}
      direction={{ initial: 'column', lg: 'row' }}
    >
      <Text
        className={cn(styles.incubatedByText, 'color-white')}
        size={'7'}
      >
        Incubated by:
      </Text>

      <Flex
        direction={'column'}
        gap={'3'}
        align={'center'}
      >
        <CoinMarketCap className={styles.incubatedByIcon} />

        <Text
          size={'4'}
          className={'color-white'}
        >
          (CMC Labs)
        </Text>
      </Flex>
    </Flex>
  )
}
