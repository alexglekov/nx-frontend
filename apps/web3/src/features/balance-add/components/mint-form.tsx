import { FC, useCallback, useEffect, useState } from 'react'
import * as RadixForm from '@radix-ui/react-form'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useUsdc } from 'contracts/usdc'
import { TetherRoundedIcon } from 'shared/icons'
import { Maybe } from 'shared/types'
import { XyroLoading } from 'shared/ui/xyro-loading-spinner/xyro-loading'
import { showNotificationToast } from 'shared/utils/notify'
import { isMintDialogOpenVar } from '../store/dialogs-balance-store'
import styles from '../balance-add.module.scss'

const USDT_TOKEN_MINT_AMOUNT = '100'

export const MintForm: FC = () => {
  const [feeAmount, setFeeAmount] = useState<Maybe<string>>(null)
  const [isLoading, setIsLoading] = useState(false)

  const usdc = useUsdc()

  const estimateGas = useCallback(async () => {
    if (!usdc) return

    const fee = await usdc.estimateGas()

    setFeeAmount(fee)
  }, [setFeeAmount, usdc])

  useEffect(() => {
    estimateGas()
  }, [estimateGas])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!usdc) return

    setIsLoading(true)
    try {
      await usdc.mint(USDT_TOKEN_MINT_AMOUNT)
      isMintDialogOpenVar(false)

      showNotificationToast({
        title: 'Success!',
        description: `You successfully minted ${USDT_TOKEN_MINT_AMOUNT} tokens!`,
        type: 'success'
      })
    } catch (error) {
      showNotificationToast({
        title: 'Something went wrong while your minting',
        description:
          'Please try again, or connect with support if it will not help',
        type: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <RadixForm.Root
      onSubmit={handleSubmit}
      className={styles.mintAmountForm}
    >
      <Flex
        className={styles.mintAmount}
        justify={'center'}
        align={'center'}
        gap={'2'}
      >
        <TetherRoundedIcon
          width={'6rem'}
          height={'6rem'}
          className='color-yellow'
        />

        <Text
          size={'9'}
          weight={'bold'}
          className='color-white'
        >
          {USDT_TOKEN_MINT_AMOUNT}
        </Text>
      </Flex>
      <Flex
        className={styles.mintButtonWrap}
        direction={'column'}
      >
        <Flex
          justify={'between'}
          className={styles.mintFee}
        >
          <Text
            color={'gray'}
            size={'1'}
          >
            Minting fee:
          </Text>
          <Text size={'2'}>{feeAmount ?? 0} ETH</Text>
        </Flex>
        <Button
          variant={isLoading ? 'outline' : 'classic'}
          color={'green'}
          type={'submit'}
          className={styles.mintDialogButton}
          size={'4'}
        >
          <XyroLoading loading={isLoading}>
            <span>Mint</span>
          </XyroLoading>
        </Button>
      </Flex>
    </RadixForm.Root>
  )
}
