/* eslint-disable max-lines */
import React from 'react'
import { useMutation } from '@apollo/client'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { CashbackPeriodSummary } from '__generated__/graphql'
import { MUTATION_CLAIM_CASHBACK } from 'api/user-profile/mutation-claim-cashback'
import { APP_CHAIN } from 'app/wagmi-config'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { TetherAssetIcon } from 'shared/icons'
import { notificationStateVar } from 'shared/store/notification'
import { formatToXyro } from 'shared/utils/format-price'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { getCashbackButtonTextByStatus } from '../utils/get-cashback-button-text-by-status'
import styles from '../user-profile.module.scss'

interface Props {
  handleRefreshCashbackData: () => void
  cashbackPeriod: CashbackPeriodSummary
}
// eslint-disable-next-line max-statements
export const ProfileCashbackTabTransactionItem: React.FC<Props> = ({
  handleRefreshCashbackData,
  cashbackPeriod
}) => {
  const [commitClaimCashback, { loading: claimLoading }] = useMutation(
    MUTATION_CLAIM_CASHBACK
  )

  const {
    period,
    cashbackAmount,
    status,
    commissionPaid,
    applicableLevel,
    txHash
  } = cashbackPeriod
  const { id: periodId, startDate, endDate } = period

  const formattedCashBackAmount = formatToXyro(cashbackAmount || 0)
  const formattedCommissionPaid = commissionPaid?.toFixed(2) || 0

  const formattedStartDate = format(startDate, 'dd.MM.yyyy')
  const formattedEndDate = format(endDate, 'dd.MM.yyyy')

  const buttonText = getCashbackButtonTextByStatus(status || null)
  const isButtonDisabled = claimLoading || buttonText !== 'CLAIM'

  const handleClaimCashback = async () => {
    if (!isNotNullOrUndef(cashbackAmount) || cashbackAmount === 0) {
      notificationStateVar({
        isOpen: true,
        type: 'warning',
        title: "You don't have available cashback",
        duration: 2500
      })

      return
    }

    try {
      await commitClaimCashback({
        variables: {
          periodId
        }
      })

      handleRefreshCashbackData()

      notificationStateVar({
        isOpen: true,
        type: 'success',
        title: 'Cashback successfully claimed!',
        duration: 2500
      })
    } catch {
      notificationStateVar({
        isOpen: true,
        type: 'error',
        title: 'Something went wrong...',
        duration: 2500
      })
    }
  }

  return (
    <Flex
      align={'center'}
      justify={'between'}
      width={'100%'}
      direction={{ initial: 'column', sm: 'row' }}
      className={styles.cashBackTransactionItem}
    >
      <Flex
        align={'center'}
        direction={'column'}
        mb={{ initial: '3', sm: '0' }}
        pl={{ initial: '0', sm: '5' }}
      >
        <Text
          className='color-white'
          weight={'bold'}
          size={'3'}
        >
          {formattedStartDate} - {formattedEndDate}
        </Text>

        {Boolean(txHash) && (
          <Text
            className={styles.timerTimeText}
            size={'2'}
            align={'center'}
          >
            <Link
              to={`${APP_CHAIN.blockExplorers.default.url}/tx/${txHash}`}
              target='_blank'
              className={styles.cashbackTransactionHashLink}
            >
              Your transaction link
            </Link>
          </Text>
        )}
      </Flex>

      <Box className={styles.cashBackTabVerticalSeparator} />

      <Flex
        direction={'column'}
        gap={'1'}
        align={{ initial: 'center', sm: 'start' }}
      >
        <Text
          size={{ initial: '2', sm: '1' }}
          weight={'bold'}
          className={'color-gray'}
        >
          AVAILABLE CASHBACK
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
            className='color-white'
            size={'6'}
            weight={'light'}
          >
            {formattedCashBackAmount}
          </Text>
        </Flex>
      </Flex>

      <Flex
        className={styles.cashBackSecondaryItemsContainer}
        align={'center'}
        justify={{ initial: 'between', sm: 'center' }}
      >
        <Flex
          direction={'column'}
          gap={'1'}
          align={{ initial: 'center', sm: 'start' }}
          className={styles.cashBackSecondaryItem}
        >
          <Text
            size={{ initial: '2', sm: '1' }}
            weight={'bold'}
            className={'color-gray'}
          >
            LEVEL
          </Text>

          <Text
            className='color-white'
            size={'6'}
            weight={'light'}
          >
            {applicableLevel || 0}
          </Text>
        </Flex>

        <Flex
          direction={'column'}
          gap={'1'}
          align={{ initial: 'center', sm: 'start' }}
          className={styles.cashBackSecondaryItem}
        >
          <Text
            size={{ initial: '2', sm: '1' }}
            weight={'bold'}
            className={'color-gray'}
          >
            COMMISSION PAID
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
              className='color-white'
              size={'6'}
              weight={'light'}
            >
              {formattedCommissionPaid}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Button
        className={styles.cashBackClaimBtn}
        disabled={isButtonDisabled}
        onClick={handleClaimCashback}
        mt={{ initial: '3', sm: '0' }}
      >
        <Text
          size={'2'}
          weight={'bold'}
        >
          {buttonText}
        </Text>
      </Button>
    </Flex>
  )
}
