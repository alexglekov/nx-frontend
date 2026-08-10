import { Flex, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import styles from '../about.module.scss'

interface Props {
  title: string
  href: string
}
export const GradientLink: React.FC<Props> = ({ title, href }) => (
  <Link
    to={href}
    className={styles.launchLinkWrapper}
  >
    <Flex className={styles.launchButtonWrapperOutline}>
      <Flex className={styles.launchButtonWrapper}>
        <Flex
          className={styles.launchLink}
          justify={'center'}
        >
          <Text
            className={'color-white'}
            size={'2'}
            weight={'bold'}
          >
            {title}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  </Link>
)
