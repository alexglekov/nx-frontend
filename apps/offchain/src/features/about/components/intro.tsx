import { Flex, Heading, Text } from '@radix-ui/themes'
import { RouterPathes } from 'shared/constants'
import { GradientLink } from './gradient-link'
import styles from '../about.module.scss'

const Intro: React.FC = () => (
  <Flex
    className={styles.introWrapper}
    direction={'column'}
    align={'center'}
    gap={'5'}
  >
    <Heading
      size={'8'}
      align={'center'}
      className={'color-white'}
      weight={'bold'}
      as={'h1'}
    >
      Unique AI-powered Gamified Trading Platform
    </Heading>

    <Text
      weight={'medium'}
      size={'4'}
      className={'color-gray-light'}
      align={'center'}
    >
      We’re leveraging the power of gamification and social features to redefine
      participation in the crypto space, making it more accessible and engaging.
    </Text>

    <GradientLink
      href={RouterPathes.home}
      title={'LAUNCH XYRO PLATFORM'}
    />
  </Flex>
)

export default Intro
