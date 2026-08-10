import {
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
  ReactNode,
  forwardRef
} from 'react'
import * as RadixForm from '@radix-ui/react-form'
import { Flex } from '@radix-ui/themes'
import { DataTestIDs } from 'shared/constants'
import styles from './amount-field.module.scss'
import { DEFAULT_ERROR_MESSAGES } from './constants'
import { AmountFieldErrorMessage } from './types'

interface Props {
  customMessages?: AmountFieldErrorMessage[]
}

export const AmountValidationMessages: FC<Props> = ({
  customMessages = []
}) => {
  return (
    <Flex
      gap='2'
      width={'auto'}
      wrap={'nowrap'}
    >
      {DEFAULT_ERROR_MESSAGES.map(defaultMessage => {
        const messageData =
          customMessages.find(
            customMessage => customMessage.match === defaultMessage.match
          ) ?? defaultMessage

        const { match, title, testLocator } = messageData

        return (
          <ValidationMessage
            key={match}
            match={match}
            dataTestID={DataTestIDs[testLocator]}
          >
            {title}
          </ValidationMessage>
        )
      })}
    </Flex>
  )
}

interface MessageProps
  extends ComponentPropsWithoutRef<typeof RadixForm.Message> {
  children?: ReactNode
  dataTestID?: DataTestIDs | ''
}

const ValidationMessage = forwardRef<
  ElementRef<typeof RadixForm.Message>,
  MessageProps
>(({ children, match, dataTestID, ...props }, ref) => {
  return (
    <RadixForm.Message
      {...props}
      match={match}
      ref={ref}
      className={styles.amountFieldErrorMessage}
      data-testid={dataTestID}
    >
      {children}
    </RadixForm.Message>
  )
})
