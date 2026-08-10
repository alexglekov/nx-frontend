import { AmountFieldErrorMessage } from './types'

export const DEFAULT_ERROR_MESSAGES: AmountFieldErrorMessage[] = [
  {
    match: 'valueMissing',
    testLocator: 'validationMessageAmountMismatch',
    title: 'Enter your amount'
  },
  {
    match: 'typeMismatch',
    testLocator: 'validationMessageTypeMismatch',
    title: 'Enter a valid amount'
  },
  {
    match: 'rangeUnderflow',
    testLocator: 'validationMessageAmountSmall',
    title: 'Amount is too small'
  },
  {
    match: 'rangeOverflow',
    testLocator: 'validationMessageAmountLarge',
    title: 'Amount is large'
  },
  {
    match: 'badInput',
    testLocator: 'validationMessageBadInput',
    title: 'Try another value'
  }
]
