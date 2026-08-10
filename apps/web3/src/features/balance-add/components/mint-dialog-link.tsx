import { Link, Text } from '@radix-ui/themes'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { LinkIcon } from 'shared/icons'
import styles from '../balance-add.module.scss'

export const MintDialogLink = () => {
  const { smartContractAddress } = useGetSmartContract('USDC')

  return (
    <Link
      className={styles.mintContractLink}
      target={'_blank'}
      href={`https://sepolia.arbiscan.io/address/${smartContractAddress}#code`}
    >
      <Text>View contract</Text>
      <LinkIcon />
    </Link>
  )
}
