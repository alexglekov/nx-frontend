/* eslint-disable complexity */
/* eslint-disable max-statements */
/* eslint-disable max-lines */
import React, { useCallback, useState } from 'react'
import { Flex, Text, DropdownMenu } from '@radix-ui/themes'
import cn from 'classnames'
import {
  ContractsNames,
  DataTestIDs,
  UP_DOWN_GAME_ROOM_PRICE_RANGES
} from 'shared/constants'
import { SwapXyroToken, TetherAssetIcon, TriangleDownIcon } from 'shared/icons'
import { AssetId, GameSmartContractEntity } from 'shared/types'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'
import styles from './mode-headers.module.scss'

interface Props {
  smartContracts: GameSmartContractEntity[]
  handleChangeContract: (contract: GameSmartContractEntity) => void
  currentSmartContract: GameSmartContractEntity | null
  mode: ContractsNames
  dataTestId: DataTestIDs
}
export const ModeRoomPicker: React.FC<Props> = ({
  smartContracts,
  currentSmartContract,
  handleChangeContract,
  mode,
  dataTestId
}) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false)

  const handleOpenClose = useCallback(() => {
    setIsDropdownOpened(ps => !ps)
  }, [])

  const currentSmartContractId = smartContracts.indexOf(
    currentSmartContract || ({} as GameSmartContractEntity)
  )

  const {
    smartContractForXyroToken: isCurrentContractForXyroToken,
    token: currentToken
  } = currentSmartContract || ({} as GameSmartContractEntity)

  // TODO: Improve this logic in future
  const currentSmartContractPriceRange =
    mode === ContractsNames.UP_DOWN ?
      `${UP_DOWN_GAME_ROOM_PRICE_RANGES?.[currentSmartContractId]?.[0] || 0} - ${UP_DOWN_GAME_ROOM_PRICE_RANGES?.[currentSmartContractId]?.[4] || 0}`
    : currentSmartContract?.meta?.amount || 1

  const currentSmartContractAssetId = currentSmartContract?.meta?.asset || 'BTC'

  const CurrentAssetIcon = getAssetIconById(
    currentSmartContractAssetId as AssetId
  )

  const handleSetActiveRoom = useCallback(
    (smartContract: GameSmartContractEntity) => {
      if (
        smartContract?.contractAddress === currentSmartContract?.contractAddress
      ) {
        handleOpenClose()
        return
      }

      handleChangeContract(smartContract)
      handleOpenClose()
    },
    [
      handleOpenClose,
      currentSmartContract?.contractAddress,
      handleChangeContract
    ]
  )

  if (!currentSmartContract?.contractAddress) return null

  return (
    <Flex
      width={'100%'}
      align={'center'}
      justify={'between'}
      gap={'4'}
      data-testid={dataTestId}
      className={styles.modeHeaderWrapper}
    >
      <Text
        className='color-white'
        weight={'bold'}
        size={'4'}
      >
        Room #{currentSmartContractId + 1}
      </Text>

      <CurrentAssetIcon
        width={'4rem'}
        height={'4rem'}
      />

      <DropdownMenu.Root
        open={isDropdownOpened}
        onOpenChange={handleOpenClose}
      >
        <DropdownMenu.Trigger>
          <Flex
            align={'center'}
            gap={'2'}
          >
            <Flex
              align={'center'}
              gap={'2'}
              px={'2'}
              py={'2'}
              className={styles.modePickerDropdownTrigger}
            >
              {isCurrentContractForXyroToken ?
                <SwapXyroToken
                  width={24}
                  height={24}
                />
              : <TetherAssetIcon />}

              <Text
                size={'2'}
                weight={'light'}
                className='color-white'
              >
                {currentSmartContractPriceRange} {currentToken}
              </Text>
            </Flex>

            <Flex className='cursor-pointer'>
              <TriangleDownIcon
                className={cn(styles.triangleIcon, {
                  [styles.triangleIconRotated]: isDropdownOpened
                })}
              />
            </Flex>
          </Flex>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className={styles.dropDownContentWrapper}>
          {smartContracts.map((c, index) => {
            const smartContractId = smartContracts.indexOf(c) + 1

            const {
              smartContractForXyroToken: isContractForXyroToken,
              token: tokenName
            } = c || ({} as GameSmartContractEntity)

            // TODO: Improve this logic in future
            const priceRange =
              mode === ContractsNames.UP_DOWN ?
                `${UP_DOWN_GAME_ROOM_PRICE_RANGES?.[index]?.[0] || 0} - ${UP_DOWN_GAME_ROOM_PRICE_RANGES?.[index]?.[4] || 0}`
              : c.meta?.amount || 1

            const AssetIcon = getAssetIconById(
              (c.meta?.asset as AssetId) || 'BTC'
            )
            return (
              <Flex
                key={smartContractId}
                justify={'between'}
                align={'center'}
                className={styles.dropDownItemWrapper}
                // TODO: Remove onClick from FLEX!
                onClick={() => handleSetActiveRoom(c)}
                data-testid={dataTestId}
                gap={'6'}
              >
                <Text
                  weight={'medium'}
                  size={'2'}
                  className={cn('color-gray-light', 'no-wrap')}
                >
                  Room #{smartContractId}
                </Text>

                <AssetIcon
                  width={'6rem'}
                  height={'6rem'}
                />

                <Flex
                  align={'center'}
                  justify={'start'}
                  width={'100%'}
                >
                  <Flex
                    align={'center'}
                    gap={'2'}
                    className={styles.modePickerDropdownTrigger}
                    px={'3'}
                    py={'2'}
                  >
                    {isContractForXyroToken ?
                      <SwapXyroToken
                        width={24}
                        height={24}
                      />
                    : <TetherAssetIcon />}

                    <Text
                      size={'2'}
                      weight={'light'}
                      className='color-white'
                    >
                      {priceRange} {tokenName}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  )
}
