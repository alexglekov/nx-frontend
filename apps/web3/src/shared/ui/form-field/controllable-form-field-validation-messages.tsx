import { FC, ReactElement } from 'react'
import * as RadixForm from '@radix-ui/react-form'
import { DEFAULT_ERROR_MESSAGES } from './constants'
import styles from './form-field.module.scss'
import { FormFieldErrorMessage } from './types'

interface Props {
  name: string
  customMessages?: FormFieldErrorMessage[]
}

interface ValidationMessageProps {
  key: string
  match: 'valueMissing' | 'typeMismatch'
  children: ReactElement
  forceMatch?: boolean
}

export const ControllableFormFieldValidationMessages: FC<Props> = ({
  name,
  customMessages = []
}) => {
  return (
    <>
      {DEFAULT_ERROR_MESSAGES.map(defaultMessage => {
        const messageData =
          customMessages.find(
            customMessage => customMessage.match === defaultMessage.match
          ) ?? defaultMessage

        const { match, title } = messageData

        return (
          <ValidationMessage
            key={match}
            match={match}
          >
            <>
              {title}
              {name}
            </>
          </ValidationMessage>
        )
      })}
    </>
  )
}

const ValidationMessage: FC<ValidationMessageProps> = ({
  key,
  match,
  children,
  forceMatch
}) => {
  return (
    <RadixForm.Message
      className={styles.formValidationMessage}
      match={match}
      forceMatch={forceMatch}
      key={key}
    >
      {children}
    </RadixForm.Message>
  )
}
