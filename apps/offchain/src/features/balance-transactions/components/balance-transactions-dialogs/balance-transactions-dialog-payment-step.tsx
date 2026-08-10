/* eslint-disable max-lines */
import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { CopyIcon } from '@radix-ui/react-icons'
import { Button, Flex, Separator, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { useAvailableAssets } from 'features/balance-transactions/hooks/use-available-assets'
import {
  operationAmountVar,
  requestedDepositAddressVar,
  selectedPaymentAssetVar
} from 'features/balance-transactions/store/balance-flow-values.store'
import { BalanceOperationStatusType } from 'features/balance-transactions/types'
import QRCode from 'react-qr-code'
import { useResponsive } from 'shared/hooks/use-responsive'
import { notificationStateVar } from 'shared/store/notification'
import { OrSeparator } from 'shared/ui/or-separator'
import { formatHugePrice } from 'shared/utils/format-huge-price'
import { useCryptoTransfer } from '../../hooks/use-crypto-transfer'
import styles from '../../balance-transactions.module.scss'
import { roundToFixedFloat } from 'features/balance-transactions/utils/round-to-fixed-float'

interface Props {
  setDialogStep: (step: BalanceOperationStatusType) => void
}
// eslint-disable-next-line max-statements
export const BalanceTransactionsDialogPaymentStep: React.FC<Props> = ({
  setDialogStep
}) => {
  const selectedAsset = useReactiveVar(selectedPaymentAssetVar)
  const selectedAmount = useReactiveVar(operationAmountVar)
  const requestedDepositAddress = useReactiveVar(requestedDepositAddressVar)

  const [isMobile] = useResponsive(['xs'])

  const { availableAssets } = useAvailableAssets()

  const selectedAssetEntity = availableAssets.find(
    a => a.name === selectedAsset
  )

  const isMetamaskPaymentAvailable = selectedAssetEntity?.ethlike || false

  const finalAmountInAsset = roundToFixedFloat(
    Number(selectedAmount || 0) / (selectedAssetEntity?.convertRate || 0)
  )

  const formattedFinalAmount =
    (Number(finalAmountInAsset) > 1000000 ?
      formatHugePrice(Number(finalAmountInAsset))
    : finalAmountInAsset) || '0'

  const { initiatePayment } = useCryptoTransfer()

  const handlePayWithWallet = async () => {
    try {
      const result = await initiatePayment({
        to: requestedDepositAddress,
        amount: selectedAmount,
        currency: selectedAssetEntity?.id as 'USDTE' | 'USDTT' | 'ETH' | 'BTC'
      })

      if (result) {
        setDialogStep('statusSuccess')
      } else {
        setDialogStep('statusFail')
      }
    } catch {
      setDialogStep('statusFail')
    }
  }

  const handleCopyAddress = async () => {
    if (!requestedDepositAddress) return

    await navigator.clipboard.writeText(requestedDepositAddress)

    notificationStateVar({
      isOpen: true,
      type: 'success',
      title: 'Success',
      description: 'Address was successfully copied to you clipboard'
    })
  }

  const handleCancelTransaction = () => {
    setDialogStep('amount')
  }

  const handleTransferSuccessClick = () => {
    setDialogStep('statusSuccess')
  }

  return (
    <Flex
      direction={'column'}
      gap={'4'}
      width={'100%'}
      mt={'3'}
    >
      <Flex
        direction={'column'}
        width={'100%'}
        gap={'4'}
      >
        <Flex
          align={'center'}
          justify={'between'}
          width={'100%'}
        >
          <Text
            size={'5'}
            className='color-gray-light'
          >
            Final amount:
          </Text>

          <Flex
            align={'center'}
            gap={'2'}
          >
            <Text
              size={'7'}
              className='color-white'
              weight={'bold'}
            >
              {formattedFinalAmount}
            </Text>

            <Text
              size={'7'}
              className='color-gray-light'
            >
              {selectedAsset}
            </Text>
          </Flex>
        </Flex>

        <Separator size={'4'} />

        {isMetamaskPaymentAvailable && (
          <Button
            className={styles.payWithWalletButton}
            onClick={handlePayWithWallet}
          >
            <Text
              className='color-white'
              size={'2'}
              weight={'bold'}
            >
              PAY WITH WALLET
            </Text>
          </Button>
        )}
      </Flex>

      {isMetamaskPaymentAvailable && <OrSeparator />}

      <Flex
        direction={'column'}
        width={'100%'}
        gap={'3rem'}
      >
        <Text
          size={'5'}
          className='color-white'
          weight={'medium'}
        >
          Transfer{' '}
          <b>
            {formattedFinalAmount} {selectedAsset}
          </b>{' '}
          to the address via wallet or QR code.
        </Text>

        <Flex
          align={'center'}
          gap={'3rem'}
          direction={{ initial: 'column', sm: 'row' }}
        >
          <Flex
            direction={'column'}
            gap={'1rem'}
          >
            <Flex
              align={'center'}
              justify={'between'}
              gap={'3'}
              className={styles.transferAddressContainer}
            >
              <Text size={{ initial: '3', sm: '2' }}>
                {requestedDepositAddress}
              </Text>

              <Flex
                className='cursor-pointer'
                onClick={handleCopyAddress}
              >
                <CopyIcon
                  width={'3rem'}
                  height={'3rem'}
                />
              </Flex>
            </Flex>

            <Text
              size={{ initial: '3', sm: '2' }}
              color='cyan'
              weight={'regular'}
            >
              <b>Important</b>: Use this address once for this transaction only.
              Sending via another network or splitting the amount may result in
              loss. You cover the transfer fee.
            </Text>
          </Flex>

          <Flex
            maxWidth={'14rem'}
            maxHeight={'14rem'}
            p={'0.25rem'}
            style={{ backgroundColor: 'var(--white)' }}
          >
            <QRCode
              size={isMobile ? 80 : 110}
              value={requestedDepositAddress}
              viewBox='0 0 110 110'
            />
          </Flex>
        </Flex>

        <Flex
          align={'center'}
          direction={{ initial: 'column', sm: 'row' }}
          gap={{ initial: '4rem', sm: '2rem' }}
          width={'100%'}
        >
          <Button
            className={cn(
              styles.paymentConfirmationButtonFormer,
              styles.paymentButtonCancel
            )}
            onClick={handleCancelTransaction}
          >
            <Text
              color='pink'
              size={'2'}
              weight={'bold'}
            >
              CANCEL APPLICATION
            </Text>
          </Button>

          <Button
            className={cn(
              styles.payWithWalletButton,
              styles.paymentConfirmationButtonFormer
            )}
            onClick={handleTransferSuccessClick}
          >
            <Text
              className='color-white'
              size={'2'}
              weight={'bold'}
            >
              I TRANSFERED
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
