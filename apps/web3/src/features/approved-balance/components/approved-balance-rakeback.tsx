import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { useResponsive } from 'shared/hooks/use-responsive'
import { SwapTetherToken, SwapXyroToken } from 'shared/icons'
import { RAKEBACK_GAMES_MAP } from '../constants'
import { formatBalance } from '../format-balance'
import { useClaimRakeback } from '../hooks/use-claim-rakeback'
import { useLoadRakeback } from '../hooks/use-load-rakeback'
import { ApprovedBalanceRakebackClaimButton } from './approved-balance-rakeback-claim-button'
import { ApprovedBalanceRakebackGame } from './approved-balance-rakeback-game'
import styles from '../approved-balance.module.scss'

export const ApprovedBalanceRakeback = () => {
  const { data, refetch } = useLoadRakeback()

  const totalRakebackToClaim =
    data.total.xyro > data.total.usdt ? data.total.xyro : data.total.usdt

  const { handleButtonClick, loading, disabled } = useClaimRakeback(
    Number(totalRakebackToClaim),
    refetch
  )

  const formattedUSDTValue = formatBalance(Number(data.total.usdt))
  const formattedXYROValue = formatBalance(Number(data.total.xyro))

  const [isMobile] = useResponsive(['xs'])

  return (
    <Flex
      gap={{ initial: '5', sm: '0' }}
      className={cn(styles.balanceWrap, styles.approvedBalanceRakebackWrap)}
      justify={'between'}
      p={'4'}
      width={'100%'}
    >
      <Flex>
        <Flex
          direction={'column'}
          justify={'between'}
          gap={'5'}
        >
          <Flex
            direction={'column'}
            gap={'1'}
          >
            <Text
              size={'1'}
              weight={'bold'}
              color={'gray'}
              className={styles.balanceTitle}
            >
              RAKEBACK
            </Text>

            <Flex gap={'1'}>
              <Flex className={styles.approvedAmountTokenIcon}>
                <SwapTetherToken
                  width={'2.5rem'}
                  height={'2.5rem'}
                />
              </Flex>

              <Text
                data-testid={DataTestIDs.treasureUnclaimedRakebackValue}
                weight={'bold'}
              >
                {formattedUSDTValue}
              </Text>
            </Flex>

            <Flex gap={'1'}>
              <Flex className={styles.approvedAmountTokenIcon}>
                <SwapXyroToken
                  width={'2.5rem'}
                  height={'2.5rem'}
                />
              </Flex>

              <Text
                data-testid={DataTestIDs.treasureUnclaimedRakebackValue}
                weight={'bold'}
              >
                {formattedXYROValue}
              </Text>
            </Flex>
          </Flex>

          {!isMobile && (
            <ApprovedBalanceRakebackClaimButton
              handleButtonClick={handleButtonClick}
              disabled={disabled}
              loading={loading}
            />
          )}
        </Flex>
      </Flex>

      <Flex
        direction={'column'}
        gap={'2'}
      >
        {RAKEBACK_GAMES_MAP.map(({ icon, name, dataSource }) => (
          <ApprovedBalanceRakebackGame
            key={name}
            icon={icon}
            name={name}
            amount={data[dataSource]}
          />
        ))}
      </Flex>

      {isMobile && (
        <ApprovedBalanceRakebackClaimButton
          handleButtonClick={handleButtonClick}
          disabled={disabled}
          loading={loading}
        />
      )}
    </Flex>
  )
}
