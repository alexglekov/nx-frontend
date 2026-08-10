import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Button, Flex, Text } from '@radix-ui/themes'
import { DEFAULT_CONTRACT_VERSION } from 'contracts/constants'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { TetherAssetIcon, WarningRectangleIcon } from 'shared/icons'
import { balanceVar } from 'shared/store/balance-store'
import { Web3Adress } from 'shared/types'
import { zeroAddress } from 'viem'
import { formatBalance } from '../format-balance'
import { useClaimSubmit } from '../hooks/use-claim-submit'
import styles from '../approved-balance.module.scss'

/* eslint-disable-next-line max-statements */
export const OldTreasuryBalance: React.FC = () => {
  const balance = useReactiveVar(balanceVar)

  const { smartContractEntry } = useGetSmartContract('Treasury')
  const smartContractAddress =
    smartContractEntry?.contracts?.[0]?.contractAddress || zeroAddress
  const smartContractVersion =
    smartContractEntry?.contracts?.[0]?.version || DEFAULT_CONTRACT_VERSION

  const { handleClaimOld, loading } = useClaimSubmit(
    smartContractAddress as Web3Adress,
    smartContractVersion
  )

  const oldTreasuryBalance = Math.floor(balance?.treasuryOldDeposit || 0)

  const handleClaimOldTreasury = () => {
    void handleClaimOld(oldTreasuryBalance.toString())
  }

  if (!oldTreasuryBalance) {
    return null
  }

  return (
    <Flex
      mb={'4'}
      className={styles.oldTreasuryWrapper}
      direction={'column'}
      gap={'3'}
    >
      <Flex
        align={'center'}
        gap={'4'}
      >
        <WarningRectangleIcon
          width={'7rem'}
          height={'7rem'}
          color={'black'}
        />

        <Text
          size={'3'}
          className={styles.oldTreasuryText}
        >
          You have a treasury balance on the old contract not included in the
          total; <b>please transfer it to the new one.</b>
        </Text>
      </Flex>

      <Flex
        align={'center'}
        justify={'between'}
        width={'100%'}
      >
        <Flex
          direction={'column'}
          gap={'1'}
        >
          <Text
            className={styles.oldTreasuryText}
            size={'2'}
            weight={'bold'}
          >
            OLD TREASURE BALANCE
          </Text>

          <Flex
            align={'center'}
            gap={'2'}
          >
            <TetherAssetIcon
              width={'2.5rem'}
              height={'2.5rem'}
            />

            <Text
              className={'color-black'}
              size={'3'}
              weight={'bold'}
            >
              {formatBalance(oldTreasuryBalance)}
            </Text>
          </Flex>
        </Flex>

        <Button
          className={styles.oldTreasuryButton}
          disabled={loading}
          onClick={handleClaimOldTreasury}
        >
          <Text
            className={'color-white'}
            size={'2'}
            weight={'bold'}
          >
            TRANSFER NOW
          </Text>
        </Button>
      </Flex>
    </Flex>
  )
}
