import { FC } from 'react'
import { Flex, Link, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { Link as RouterLink } from 'react-router-dom'
import { RadixText } from 'shared/ui'
import styles from '../main-layout.module.scss'

interface FooterLinksSectionProps {
  section: {
    title: string
    isExternal?: boolean
    invisible?: boolean
    links: {
      name: string
      path?: string
    }[]
  }
}
export const FooterLinksSection: FC<FooterLinksSectionProps> = ({
  section
}) => {
  return (
    <Flex
      direction={'column'}
      gap={'4'}
    >
      <RadixText
        weight={'bold'}
        className={cn({ [styles['titleInvisible']]: section.invisible })}
      >
        {section.title}
      </RadixText>
      <Flex
        gap={'3'}
        direction={'column'}
      >
        {section.links.map(link => {
          return (
            <FooterLink
              key={link.name}
              link={link}
              isExternal={section.isExternal}
            />
          )
        })}

        {/* TODO: Add modal opening logic for the "report a bug" and "contact us" links*/}
      </Flex>
    </Flex>
  )
}

interface FooterLinkProps {
  link: {
    name: string
    path?: string
  }
  isExternal?: boolean
}
const FooterLink: FC<FooterLinkProps> = ({ link, isExternal = false }) => {
  if (isExternal) {
    return (
      <Link
        className={styles.footerLink}
        weight='medium'
        href={link.path}
        target='_blank'
        rel='noopener noreferrer'
      >
        <Text>{link.name}</Text>
      </Link>
    )
  }

  return (
    <Link
      className={styles.footerLink}
      weight={'medium'}
      asChild
    >
      <RouterLink to={link.path || '#'}>{link.name}</RouterLink>
    </Link>
  )
}
