import { Button, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import styles from '../home.module.scss'

export const BonusBanner: React.FC = () => {
  return (
    <Link
      to={RouterPathes.bonusWelcomePack}
      className={styles.bonusBannerWrapper}
    >
      <Flex
        direction={'column'}
        align={'center'}
        className={styles.bonusBannerInfo}
      >
        <Text
          className={styles.bonusBannerPercentage}
          weight={'bold'}
        >
          350%
        </Text>

        <Text
          size={'7'}
          className={'color-white'}
          mb={'8'}
        >
          Bonuses await!
        </Text>

        <Button
          variant='solid'
          color={'cyan'}
          size={'4'}
          className={styles.bonusBannerButton}
        >
          GET BONUSES
        </Button>
      </Flex>
    </Link>
  )
}
