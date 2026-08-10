import { Flex, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { RouterPathes } from '../../../shared/constants'
import styles from '../referral.module.scss'

interface Props {
  title?: string
}

export const JoinNowLink: React.FC<Props> = ({ title }) => {
  const titleText = title || 'JOIN NOW'

  return (
    <Link
      to={RouterPathes.referral}
      className={styles.linkWrapper}
    >
      <Flex className={styles.buttonWrapperOutline}>
        <Flex
          className={styles.launchLink}
          justify={'center'}
        >
          <Text
            className={'color-white'}
            size={'2'}
            weight={'bold'}
          >
            {titleText}
          </Text>
        </Flex>
      </Flex>
    </Link>
  )
}
