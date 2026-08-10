import { FC } from 'react'
import { Flex } from '@radix-ui/themes'
import classnames from 'classnames'
import { RouterPathes } from 'shared/constants'
import { XyroLogoText, XyroTokenMetallicTwo } from 'shared/icons'
import { XyroLink } from '../xyro-link'
import styles from './xyro-logo-link.module.scss'

interface Props {
  withText?: boolean
  withLogo?: boolean
  withPadding?: boolean
  className?: string
}
export const XyroLogoLink: FC<Props> = ({
  withText = true,
  withLogo = true,
  className,
  withPadding = true
}) => {
  return (
    <XyroLink
      to={RouterPathes.home}
      className={classnames(className, styles.logoLink, {
        [styles.withPadding]: withPadding
      })}
    >
      <Flex
        align={'center'}
        justify={'center'}
        gap={'2'}
      >
        {withLogo && (
          <XyroTokenMetallicTwo
            height={'5rem'}
            width={'5rem'}
          />
        )}

        {withText && <XyroLogoText className={styles.logoText} />}
      </Flex>
    </XyroLink>
  )
}
