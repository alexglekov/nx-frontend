export type AmountFieldErrorMessage = {
  match:
    | 'valueMissing'
    | 'badInput'
    | 'patternMismatch'
    | 'rangeOverflow'
    | 'rangeUnderflow'
    | 'stepMismatch'
    | 'tooLong'
    | 'tooShort'
    | 'typeMismatch'
    | 'valid'
  testLocator:
    | 'validationMessageAmountMismatch'
    | 'validationMessageTypeMismatch'
    | 'validationMessageAmountSmall'
    | 'validationMessageAmountLarge'
    | 'validationMessageBadInput'
    | 'validationMessageInsufficientBalance'
  title: string
}
