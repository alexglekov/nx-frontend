import { Flex, Heading } from '@radix-ui/themes'
import { TRACTION_GENERAL, TRACTION_MAINNET_STATS } from '../constants'
import { TractionCard } from './traction-card'
import styles from '../about.module.scss'

const TractionBlock: React.FC = () => {
  return (
    <Flex
      direction={'column'}
      align={'center'}
      justify={'center'}
      mt={'10rem'}
      mb={'23.5rem'}
      gap={'6rem'}
    >
      <Heading
        size={{ initial: '8', lg: '9' }}
        as={'h2'}
        className={'color-white'}
        weight={'bold'}
      >
        Traction
      </Heading>

      <Flex
        className={styles.tractionBlockCards}
        justify={'between'}
        gap={'3'}
        align={'center'}
        direction={{ initial: 'column', lg: 'row' }}
      >
        <TractionCard
          title={'First Months of Mainnet Stats'}
          items={TRACTION_MAINNET_STATS}
          linkTitle={'Dune Dashboard'}
          href={'https://dune.com/whale_hunter/xyro'}
          type={'green'}
        />

        <TractionCard
          title={'General Traction'}
          items={TRACTION_GENERAL}
          linkTitle={'Cookie3 Dashboard'}
          href={'https://xyro.cookie3.co'}
          type={'purple'}
        />
      </Flex>
    </Flex>
  )
}

export default TractionBlock
