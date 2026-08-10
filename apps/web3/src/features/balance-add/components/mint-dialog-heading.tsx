import { Flex, Heading, Text, Link } from '@radix-ui/themes'
import { RouterPathes } from 'shared/constants'
import styles from '../balance-add.module.scss'

const GUIDE_LINK =
  'https://mirror.xyz/xyro.eth/8ZcK1uPx1j5_7G4lmbln11tC6un7RHKM2v9ulZ4BX4A'

export const MintDialogHeading = () => (
  <Flex
    direction={'column'}
    className={styles.mintDialogHeading}
  >
    <Heading
      size={{
        xs: '6',
        md: '8',
        xl: '8'
      }}
      align={'center'}
      className='color-white'
    >
      Get more tokens!
    </Heading>
    <Flex
      align={'center'}
      justify={'center'}
      mt={{
        initial: '1',
        md: '2'
      }}
      gap={'1'}
    >
      <Text
        align={'center'}
        weight={'regular'}
        size={'2'}
      >
        To receive test tokens, invoke a transaction on the&nbsp;
        <Link
          href={'https://sepolia.arbiscan.io/'}
          target={'_blank'}
        >
          <Text
            color={'grass'}
            weight={'bold'}
          >
            Arbitrum Sepolia
          </Text>
        </Link>
        &nbsp; network.
      </Text>
    </Flex>
    <Flex className={styles.mintTitleHeading}>
      <Text
        align={'center'}
        weight={'bold'}
        size={'2'}
      >
        Attention! How to get test ETH to start playing?
      </Text>
    </Flex>
    <Flex className={styles.mintDialogTitle}>
      <Text
        align={'center'}
        weight={'regular'}
        size={'2'}
      >
        Compete “The Way of XYRO” challenge in&nbsp;
        <Link href={RouterPathes.rewards}>
          <Text
            color={'grass'}
            weight={'bold'}
          >
            Rewards
          </Text>
        </Link>
        &nbsp; section or check out our&nbsp;
        <Link
          href={GUIDE_LINK}
          target={'_blank'}
        >
          <Text
            color={'grass'}
            weight={'bold'}
          >
            Detailed&nbsp;Guide
          </Text>
        </Link>
        !
      </Text>
    </Flex>
  </Flex>
)
