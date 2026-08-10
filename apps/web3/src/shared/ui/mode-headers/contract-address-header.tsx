import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { STAND } from 'app/constants'
import { Stand } from 'app/types'
import { Link } from 'react-router-dom'
import { useResponsive } from 'shared/hooks/use-responsive'
import { ContractSuccessIcon, LinkIcon } from 'shared/icons'
import { truncateString } from 'shared/utils/truncate-string-value'
import styles from './mode-headers.module.scss'

interface Props {
  title?: string
  address: string
}
// TODO: Remove manual address once every game mode will be switched to query contract logic
export const ContractAddressHeader: React.FC<Props> = ({
  address,
  title = 'Game smart contract'
}) => {
  const [isMobile] = useResponsive('xs')

  const gameSmartContractUrl =
    STAND === Stand.mainnet ?
      `https://arbiscan.io/address/${address}`
    : `https://sepolia.arbiscan.io/address/${address}`

  const displayAddress = truncateString(address)

  return (
    <Flex
      width={'100%'}
      align={'center'}
      justify={'start'}
      gap={'3'}
      className={styles.modeHeaderWrapper}
    >
      <ContractSuccessIcon className={styles.successIcon} />

      <Flex
        className={styles.contractAddressBlock}
        direction={'column'}
      >
        <Text
          className='color-gray-light'
          size={'1'}
          weight={'medium'}
        >
          {title}:
        </Text>
        <Link
          className={styles.contractAddressLink}
          to={gameSmartContractUrl}
          target='_blank'
        >
          <Flex
            align={'center'}
            gap={'2'}
          >
            {isMobile ? address : displayAddress}

            {!Boolean(isMobile) && (
              <LinkIcon
                color='var(--white)'
                width={'2rem'}
              />
            )}
          </Flex>
        </Link>
      </Flex>
    </Flex>
  )
}
