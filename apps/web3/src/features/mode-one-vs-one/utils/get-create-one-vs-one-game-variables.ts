import { Asset } from '__generated__/graphql'
import { CreateExactBetParams } from 'contracts/exact-price'
import { SECS_IN_HOUR } from 'shared/constants'
import { RequiredExcept } from 'shared/types'
import { Web3Adress } from 'shared/types/web3'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { TIME_ADDITION } from '../constants'
import { FieldNames, OneVsOneCreateFormState } from '../types'

// eslint-disable-next-line max-statements
export const getCreate1vs1GameVariables = (
  formValues: RequiredExcept<
    OneVsOneCreateFormState,
    FieldNames.predictTimeframe
  >,
  selectedAsset: Asset
): CreateExactBetParams => {
  const nowTimestamp = Date.now() / 1000
  const timeframe =
    isNotNullOrUndef(formValues[FieldNames.predictTimeframe]) ?
      formValues[FieldNames.predictTimeframe]
    : SECS_IN_HOUR

  const timeframeAddition = timeframe === SECS_IN_HOUR / 2 ? TIME_ADDITION : 0

  return {
    amount: formValues.betAmount,
    startTime: nowTimestamp,
    endTime: nowTimestamp + timeframe + timeframeAddition,
    feedNumber: selectedAsset.feedNumber,
    initiatorPrice: formValues[FieldNames.predictExactPrice],
    opponent:
      formValues[FieldNames.isPrivate] ?
        (formValues[FieldNames.betOpponent]?.wallet?.address as Web3Adress)
      : null
  }
}
