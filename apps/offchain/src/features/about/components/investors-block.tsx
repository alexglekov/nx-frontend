import { Flex, Heading, Text } from '@radix-ui/themes'
import { useResponsive } from 'shared/hooks/use-responsive'
import {
  BACKERS_LIST,
  PARTNERS_LIST_DESKTOP,
  PARTNERS_LIST_MOBILE
} from '../investors'
import { IncubatedBy } from './incubated-by'
import { Investors } from './investors'
import styles from '../about.module.scss'

const InvestorsBlock: React.FC = () => {
  const [isNotDesktop] = useResponsive(['xs', 'sm', 'md', 'lg'])

  const partnersList =
    isNotDesktop ? PARTNERS_LIST_MOBILE : PARTNERS_LIST_DESKTOP

  return (
    <Flex
      className={styles.backersBlock}
      direction={'column'}
      align={'center'}
      justify={'center'}
    >
      <Heading
        size={{ initial: '8', lg: '9' }}
        as={'h2'}
        className={'color-white'}
        weight={'bold'}
      >
        Supported by
      </Heading>

      <Text
        className={'color-gray-light'}
        size={{ initial: '6', lg: '8' }}
        mt={'3'}
      >
        Backers:
      </Text>

      <Investors
        items={BACKERS_LIST}
        short
      />

      <IncubatedBy />

      <Flex
        direction={'column'}
        gap={'3'}
        mt={'9'}
        align={'center'}
        justify={'center'}
      >
        <Text
          className={'color-gray-light'}
          size={{ initial: '6', lg: '8' }}
          mb={'5'}
        >
          Partners:
        </Text>

        <Investors items={partnersList} />
      </Flex>
    </Flex>
  )
}

export default InvestorsBlock
