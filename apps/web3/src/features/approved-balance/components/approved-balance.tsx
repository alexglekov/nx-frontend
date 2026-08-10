/* eslint-disable max-statements */
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { DataTestIDs } from 'shared/constants'
import { useResponsive } from 'shared/hooks/use-responsive'
import { useWallet } from 'shared/hooks/use-wallet'
import { TetherAssetIcon, XyroTokenRounded } from 'shared/icons'
import { balanceVar } from 'shared/store/balance-store'
import { userVar } from 'shared/store/user'
import { formatHugePrice } from 'shared/utils/format-huge-price'
import { formatBalance } from '../format-balance'
import { isOpenAllowanceDialogVar } from '../store/dialogs'
import { ApprovedBalanceContent } from './approved-balance-content'
import styles from '../approved-balance.module.scss'

export const ApprovedBalance = () => {
  const [isMobile] = useResponsive(['xs', 'sm'])
  const user = useReactiveVar(userVar)
  const { isReady } = useWallet()

  const balance = useReactiveVar(balanceVar)

  const onClickOpenDialog = () => {
    isOpenAllowanceDialogVar(true)
  }

  const totalUSDTBalanceNumber =
    balance.usdtBalance + balance.treasuryDeposit || 0
  const totalXYROBalanceNumber = balance.xyroBalance + balance.xyroDeposit || 0

  const fullFormattedUSDTBalance =
    totalUSDTBalanceNumber > 1000 ?
      `${formatHugePrice(totalUSDTBalanceNumber)} USDT`
    : `${formatBalance(totalUSDTBalanceNumber)} USDT`

  const fullFormattedXYROBalance =
    totalXYROBalanceNumber > 1000 ?
      `${formatHugePrice(totalXYROBalanceNumber)} XYRO`
    : `${formatBalance(totalXYROBalanceNumber)} XYRO`

  if (!user || !isReady) return null

  return (
    <>
      <Flex
        direction={'column'}
        className={styles.approvePopoverTrigger}
        onClick={onClickOpenDialog}
        data-testid={DataTestIDs.buttonApprovedBalanceHeader}
        p={'2'}
      >
        {!isMobile && (
          <Text
            className='color-white'
            size={'1'}
            weight={'medium'}
          >
            Balance:
          </Text>
        )}

        <Flex
          align={{ initial: 'start', sm: 'center' }}
          gap={{ initial: '1', sm: '2' }}
          direction={{ initial: 'column', sm: 'row' }}
        >
          <Flex
            justify={'center'}
            align={'center'}
            gap={'1'}
          >
            <TetherAssetIcon />

            <Text
              className={styles.balanceValue}
              data-testid={DataTestIDs.balanceValueHeader}
            >
              {fullFormattedUSDTBalance}
            </Text>
          </Flex>

          <Flex
            justify={'center'}
            align={'center'}
            gap={'1'}
          >
            <XyroTokenRounded />

            <Text
              className={styles.balanceValue}
              data-testid={DataTestIDs.balanceValueHeader}
            >
              {fullFormattedXYROBalance}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <ApprovedBalanceContent />
    </>
  )
}
