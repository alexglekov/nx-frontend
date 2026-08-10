import React from 'react'
import { Button, Link, Text } from '@radix-ui/themes'
import { LinkDoubled } from 'shared/icons'
import styles from '../balance-transactions.module.scss'

interface Props {
  link: string
}
export const BalanceTransactionLinkTableItem: React.FC<Props> = ({ link }) => {
  if (!link) return null

  const formattedLink = link.slice(0, 16) + '...' + link.slice(-6)

  return (
    <Link
      className={styles.explorerLinkWrapper}
      href={link}
      target={'_blank'}
      rel={'noopener noreferrer'}
    >
      <Button className={styles.explorerLink}>
        <LinkDoubled />

        <Text className={'color-gray'}>{formattedLink}</Text>
      </Button>
    </Link>
  )
}
