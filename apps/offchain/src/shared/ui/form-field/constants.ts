import { FormFieldErrorMessage } from './types'

export const DEFAULT_ERROR_MESSAGES: FormFieldErrorMessage[] = [
  {
    match: 'valueMissing',
    title: 'Please, enter '
  },
  {
    match: 'typeMismatch',
    title: 'Please, provide a valid '
  }
]
