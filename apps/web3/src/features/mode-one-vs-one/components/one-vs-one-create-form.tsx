/* eslint-disable max-lines */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import * as RadixForm from '@radix-ui/react-form'
import {
  Box,
  Card,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Text
} from '@radix-ui/themes'
import { Asset } from '__generated__/graphql'
import { CreateExactBetParams } from 'contracts/exact-price'
import { DataTestIDs } from 'shared/constants'
import { useResponsive } from 'shared/hooks/use-responsive'
import { OneVsOneIcon } from 'shared/icons'
import { balanceVar } from 'shared/store/balance-store'
import { selectedAssetVar } from 'shared/store/selected-asset'
import { Maybe, RequiredExcept } from 'shared/types'
import { AssetSelect } from 'shared/ui'
import { useAccount } from 'wagmi'
import { ONE_VS_ONE_CREATE_FORM_INITIAL_STATE } from '../constants'
import { isConfirm1vs1DialogOpenVar } from '../store/dialog'
import { oneVsOneCreateFormStateVar } from '../store/form'
import { opponentsVar } from '../store/opponents-store'
import { FieldNames, OneVsOneCreateFormState } from '../types'
import { getCreate1vs1GameVariables } from '../utils/get-create-one-vs-one-game-variables'
import { GameConfirmationDialog } from './game-confirmation-dialog'
import { GameCreateDialogPriceGraph } from './game-create-dialog-price-graph'
import { OneVsOneFormCreateAmount } from './one-vs-one-create-form-amount'
import { OneVsOneCreateFormSubmit } from './one-vs-one-create-form-submit'
import { OneVsOneFormDateFields } from './one-vs-one-form-date-fields'
import { OneVsOneBetPredictField } from './one-vs-one-predict-field'
import { UserDropdownSelect } from './user-dropdown-select'
import styles from '../mode-one-vs-one.module.scss'

// eslint-disable-next-line max-statements
export const CreateBetForm = () => {
  const [newGame, setNewGame] = useState<Maybe<CreateExactBetParams>>(null)
  const [isMobile] = useResponsive('xs')
  const oneVsOneCreateFormState = useReactiveVar(oneVsOneCreateFormStateVar)
  const selectedAssetData = useReactiveVar(selectedAssetVar)
  const opponents = useReactiveVar(opponentsVar)
  const balance = useReactiveVar(balanceVar)
  const account = useAccount()

  const isPrivateGameOptionSelected =
    Boolean(oneVsOneCreateFormState[FieldNames.isPrivate]) || false

  const isBalanceEnough =
    Boolean(oneVsOneCreateFormState[FieldNames.betAmount]) ?
      balance.usdtBalance + balance.treasuryDeposit >=
      Number(oneVsOneCreateFormState[FieldNames.betAmount])
    : true

  useEffect(() => {
    return () => {
      selectedAssetVar(null)
    }
  }, [])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formValues = oneVsOneCreateFormState as RequiredExcept<
        OneVsOneCreateFormState,
        FieldNames.predictTimeframe
      >

      const gameData = getCreate1vs1GameVariables(
        formValues,
        selectedAssetData as Asset
      )

      setNewGame(gameData)

      isConfirm1vs1DialogOpenVar(true)
    },
    [oneVsOneCreateFormState, setNewGame, selectedAssetData]
  )

  const clearForm = useCallback(() => {
    oneVsOneCreateFormStateVar({
      ...ONE_VS_ONE_CREATE_FORM_INITIAL_STATE,
      [FieldNames.predictTimeframe]:
        oneVsOneCreateFormState[FieldNames.predictTimeframe]
    })
    selectedAssetVar(null)
  }, [oneVsOneCreateFormState])

  const handlePrivacyChange = useCallback(
    (checked: boolean) => {
      oneVsOneCreateFormStateVar({
        ...oneVsOneCreateFormState,
        [FieldNames.isPrivate]: checked
      })
    },
    [oneVsOneCreateFormState]
  )
  const disabled = useMemo(
    () =>
      !selectedAssetData ||
      !account.address ||
      !isBalanceEnough ||
      (oneVsOneCreateFormState[FieldNames.isPrivate] &&
        !Boolean(oneVsOneCreateFormState[FieldNames.betOpponent])),
    [selectedAssetData, account, oneVsOneCreateFormState, isBalanceEnough]
  )

  const handleOpponentChange = useCallback(
    (value: string) => {
      const opponentByID = opponents.find(opponent => opponent.id === value)

      if (!opponentByID) return

      oneVsOneCreateFormStateVar({
        ...oneVsOneCreateFormState,
        [FieldNames.betOpponent]: opponentByID
      })
    },
    [opponents, oneVsOneCreateFormState]
  )

  useEffect(() => {
    if (isPrivateGameOptionSelected) return

    oneVsOneCreateFormStateVar({
      ...oneVsOneCreateFormState,
      [FieldNames.betOpponent]: undefined
    })
  }, [isPrivateGameOptionSelected])

  const handleFormChange = useCallback(
    (event: React.ChangeEvent<HTMLFormElement>) => {
      const fieldName = event.target.name as FieldNames
      if (fieldName === FieldNames.isPrivate) return
      if (fieldName === FieldNames.betOpponent) return
      if (fieldName === FieldNames.predictExactPrice) return
      if (fieldName === FieldNames.betAmount) return

      oneVsOneCreateFormStateVar({
        ...oneVsOneCreateFormState,
        [event.target.name]: event.target.value
      })
    },
    [oneVsOneCreateFormState]
  )

  const submitTitle = isBalanceEnough ? 'PLAY' : 'Insufficient balance'

  return (
    <Card
      size='2'
      className={styles.createPredictFormWrapper}
    >
      <OneVsOneIcon className={styles.formBackgroundElement} />

      <Heading
        size={{ initial: '6', sm: '5' }}
        weight={'medium'}
        align={'center'}
        className={styles.createNewOneVsOneTitle}
        mb={'3'}
      >
        Create new 1vs1
      </Heading>

      <RadixForm.Root
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        className={styles.createPredictForm}
      >
        <Grid
          width={'100%'}
          gap={'2'}
          columns={{ initial: '1fr', sm: '1fr' }}
          position={'relative'}
          className={styles.createPredictWrapper}
        >
          <Box className={styles.createPredictAssetSelect}>
            <AssetSelect
              name={FieldNames.predictAsset}
              itemsDataTestID={DataTestIDs.buttonOneVsOneSelectAsset}
              triggerDataTestID={DataTestIDs.buttonOneVsOneSelectAssetTrigger}
            />
          </Box>

          {isMobile && selectedAssetData && <GameCreateDialogPriceGraph />}

          <OneVsOneBetPredictField />

          <OneVsOneFormCreateAmount />

          <OneVsOneFormDateFields />

          <label className={styles.checkBoxLabel}>
            <Checkbox
              size={'3'}
              onCheckedChange={handlePrivacyChange}
              checked={isPrivateGameOptionSelected}
              name={FieldNames.isPrivate}
              className={styles.opponentSelectCheckbox}
              variant={'classic'}
              color='pink'
            />{' '}
            <Text
              size={{ initial: '3', sm: '1' }}
              weight={'medium'}
              className={styles.checkBoxText}
            >
              Make game private (invite friend)
            </Text>
          </label>

          {isPrivateGameOptionSelected && (
            <Flex width={'100%'}>
              <UserDropdownSelect
                name={FieldNames.betOpponent}
                onChange={handleOpponentChange}
              />
            </Flex>
          )}
        </Grid>

        <OneVsOneCreateFormSubmit
          disabled={disabled}
          title={submitTitle}
        />
      </RadixForm.Root>

      <GameConfirmationDialog
        gameData={newGame || null}
        asset={selectedAssetData}
        clearForm={clearForm}
      />
    </Card>
  )
}
