import { Flex, Link } from '@radix-ui/themes'
import cn from 'classnames'
import { SOCIAL_ITEM_OPTIONS_MAP, SocialTypes } from '../constants'
import styles from '../about.module.scss'

interface Props {
  type: SocialTypes
  position: 'header' | 'footer'
}
export const SocialItem: React.FC<Props> = ({ type, position }) => {
  const { icon: Icon, href } = SOCIAL_ITEM_OPTIONS_MAP[type]

  const iconClassNames = cn(styles.socialItem, {
    [styles.socialItemFooter]: position === 'footer'
  })

  return (
    <Link
      href={href}
      target='_blank'
    >
      <Flex
        className={iconClassNames}
        align={'center'}
        justify={'center'}
      >
        <Icon
          className={styles.socialItemIcon}
          color={'white'}
        />
      </Flex>
    </Link>
  )
}
