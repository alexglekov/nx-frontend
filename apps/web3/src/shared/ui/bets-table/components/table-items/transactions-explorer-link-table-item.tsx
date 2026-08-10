import { Button, Link, Text } from '@radix-ui/themes'
import { STAND } from 'app/constants'
import { Stand } from 'app/types'
import { LinkDoubled } from 'shared/icons'
import styles from '../../table.module.scss'

interface Props {
  txId: string
}

export const TransactionsExplorerLinkTableItem: React.FC<Props> = ({
  txId
}) => {
  const txEplorerLink =
    STAND === Stand.mainnet ?
      `https://arbiscan.io/tx/${txId}`
    : `https://sepolia.arbiscan.io/tx/${txId}`

  const transactionId = txId.slice(0, 16) + '...' + txId.slice(-6)

  return (
    <Link
      className={styles.explorerLinkWrapper}
      href={txEplorerLink}
      target={'_blank'}
      rel={'noopener noreferrer'}
    >
      <Button className={styles.explorerLink}>
        <LinkDoubled />

        <Text className={'color-gray'}>{transactionId}</Text>
      </Button>
    </Link>
  )
}
