import { Flex } from '@radix-ui/themes'
import { XyroLogoText } from 'shared/icons'
import { XyroLogoLink } from 'shared/ui'
import styles from '../header.module.scss'

interface Props {
  children?: React.ReactNode
}
export const Header: React.FC<Props> = ({ children }) => {
  return (
    <header className={styles.header}>
      <XyroLogoLink
        className={styles.headerLogo}
        withText={false}
      />

      <XyroLogoText className={styles.logoText} />

      <Flex
        ml={'auto'}
        align={'center'}
        gap={{ initial: '3', md: '7' }}
      >
        {children}
      </Flex>
    </header>
  )
}
