import { useEffect, useRef } from 'react'
import { useReactiveVar } from '@apollo/client'
import * as RadixForm from '@radix-ui/react-form'
import { Button, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { BetsTypeSwitcher, XyroLoading } from 'shared/ui'
import { useApprovedBalanceForm } from '../hooks/use-approved-balance-form'
import { activeBalanceClaimSwitchTypeVar } from '../store/switch-types'
import { ClaimBalanceSwitchTypes } from '../types'
import { ApprovedBalanceInput } from './approved-balance-input'
import styles from '../approved-balance.module.scss'

export const ApprovedBalanceForm = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const activeType = useReactiveVar(activeBalanceClaimSwitchTypeVar)

  const {
    inputValue,
    setInputValue,
    buttonTitle,
    handleChangeAmountValue,
    handleSubmit,
    loading,
    isDisabledButton
  } = useApprovedBalanceForm()

  useEffect(() => {
    formRef.current?.reset()
  }, [activeType])

  useEffect(() => {
    setInputValue('')
  }, [activeType])

  return (
    <Flex
      mt={'6'}
      align={'center'}
      direction={'column'}
      width={'100%'}
    >
      <Flex mb={'6'}>
        <BetsTypeSwitcher
          activeType={activeType}
          setActiveType={(newValue: string) =>
            activeBalanceClaimSwitchTypeVar(newValue as ClaimBalanceSwitchTypes)
          }
          betsTypes={ClaimBalanceSwitchTypes}
          size='3'
          betsTypeDataTestIDs={[
            buttonTreasureDeposit,
            buttonTreasureApproveBalance,
            buttonTreasureClaim
          ]}
        />
      </Flex>

      <RadixForm.Root
        className={styles.approveBalanceForm}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Flex
          direction={'column'}
          align={'center'}
        >
          <ApprovedBalanceInput
            onChange={handleChangeAmountValue}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />

          <Button
            className={cn(styles.approvedFormButton, {
              [styles.approvedFormButtonDisabled]: isDisabledButton || loading
            })}
            disabled={isDisabledButton || loading}
            variant={loading ? 'outline' : 'soft'}
            type={'submit'}
            size={'4'}
            mt={'6'}
            data-testid={buttonTreasureAction}
          >
            <XyroLoading loading={loading}>
              <Text
                size={'2'}
                weight={'bold'}
              >
                {buttonTitle}
              </Text>
            </XyroLoading>
          </Button>
        </Flex>
      </RadixForm.Root>
    </Flex>
  )
}

const {
  buttonTreasureDeposit,
  buttonTreasureApproveBalance,
  buttonTreasureClaim,
  buttonTreasureAction
} = DataTestIDs
