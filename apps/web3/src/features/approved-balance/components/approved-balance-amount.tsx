import { useReactiveVar } from '@apollo/client'
import { Box, Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { balanceVar } from 'shared/store/balance-store'
import { useBalanceTypeSwitcher } from '../hooks/use-balance-type-switcher'
import { ApprovedBalanceSwitchTypes } from '../types'
import { ApprovedBalanceRakeback } from './approved-balance-rakeback'
import { ApprovedBalanceTypeSwitcher } from './approved-balance-type-switcher'
import { ApprovedBalanceValue } from './approved-balance-value'
import { OldTreasuryBalance } from './old-treasury-balance'
import styles from '../approved-balance.module.scss'

export const ApprovedBalanceAmount = () => {
  const balance = useReactiveVar(balanceVar)

  const { activeType, setActiveType, balanceSwitchTypes } =
    useBalanceTypeSwitcher()

  const isTether = activeType === ApprovedBalanceSwitchTypes.Tether

  const walletBalance = isTether ? balance.usdtBalance : balance.xyroBalance
  const approvedBalance =
    isTether ? balance.treasuryAllowance : balance.xyroAllowance
  const treasureBalance =
    isTether ? balance.treasuryDeposit : balance.xyroDeposit

  return (
    <Box className={styles.approvedAmountBox}>
      <Flex
        direction={'column'}
        className={styles.approvedAmountContent}
        gap={'2'}
      >
        <OldTreasuryBalance />

        <ApprovedBalanceTypeSwitcher
          activeType={activeType}
          setActiveType={setActiveType}
          balanceSwitchTypes={balanceSwitchTypes}
        />

        <Flex
          gap={'2'}
          mt={'4'}
        >
          <Flex className={styles.balanceWrap}>
            <ApprovedBalanceValue
              title={'wallet balance'}
              value={walletBalance}
              dataTestID={DataTestIDs.treasureWalletValue}
              width={'max-content'}
              p={'3'}
            />

            <Box className={styles.approvedDivider} />

            <ApprovedBalanceValue
              title={'approved'}
              width={'max-content'}
              value={approvedBalance}
              dataTestID={DataTestIDs.treasureApprovedValue}
              p={'3'}
            />
          </Flex>

          <ApprovedBalanceValue
            title={'treasure balance'}
            value={treasureBalance}
            dataTestID={DataTestIDs.treasureTreasureValue}
            width={'100%'}
            className={styles.balanceWrap}
            p={'3'}
          />
        </Flex>

        <ApprovedBalanceRakeback />
      </Flex>
    </Box>
  )
}
