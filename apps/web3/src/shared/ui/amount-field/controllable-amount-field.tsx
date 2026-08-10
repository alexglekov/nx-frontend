import { ElementRef, forwardRef } from 'react'
import * as RadixForm from '@radix-ui/react-form'
import { Flex, TextField } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs, INTEGER_REGEXP } from 'shared/constants'
import { RadixColorType } from 'shared/types'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { RadixText } from '../radix-text'
import styles from './amount-field.module.scss'
import { AmountValidationMessages } from './amount-validation-messages'
import { AmountFieldErrorMessage } from './types'

interface Props extends React.ComponentPropsWithoutRef<typeof TextField.Root> {
  setValue: (value: string) => void
  name: string
  label?: string
  labelColor?: RadixColorType | 'black'
  value: string
  placeholder?: string
  className?: string
  minAmount: number
  dataTestID?: DataTestIDs | ''
  onlyInteger?: boolean
  customErrorMessages?: AmountFieldErrorMessage[]
  inputMode?: 'numeric' | 'decimal'
  pattern?: string
}

export const ControllableAmountField = forwardRef<
  ElementRef<typeof TextField.Root>,
  Props
>(
  (
    {
      setValue,
      name,
      label,
      value,
      className,
      minAmount = 0,
      labelColor,
      placeholder = 'Enter amount',
      inputMode = 'numeric',
      pattern = '[0-9]*',
      onChange,
      max = 200000,
      onlyInteger = false,
      dataTestID,
      customErrorMessages,
      ...props
    },
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value

      if (onlyInteger && value !== '' && !INTEGER_REGEXP.test(value)) return

      setValue(value)
      if (onChange) onChange(event)
    }

    const minValue = Number(minAmount?.toFixed(2)) || 0

    const onWheelEvent = (e: React.WheelEvent<HTMLInputElement>) => {
      e.currentTarget.blur()
    }

    return (
      <RadixForm.Field
        name={name}
        asChild
      >
        <RadixForm.ValidityState name={name}>
          {validityState => {
            const amountFieldClassNames = cn(
              styles.amountField,
              className ? className : '',
              {
                [styles.amountFieldError]:
                  isNotNullOrUndef(validityState) && !validityState.valid
              }
            )

            return (
              <Flex
                gap='1'
                direction='column'
                width={'100%'}
                className={styles.controllableAmountFieldWrapper}
              >
                <Flex
                  gap='2'
                  justify={'between'}
                  align={'center'}
                  className={styles.amountFieldLabelWrapper}
                >
                  {label ?
                    <RadixForm.Label asChild>
                      <RadixText
                        color={labelColor as RadixColorType}
                        className={cn(
                          labelColor === 'black' ? 'color-black' : '',
                          'no-wrap',
                          styles.amountFieldLabel
                        )}
                      >
                        {label}
                      </RadixText>
                    </RadixForm.Label>
                  : null}

                  <AmountValidationMessages
                    customMessages={customErrorMessages}
                  />
                </Flex>

                <RadixForm.Control asChild>
                  <TextField.Root
                    {...props}
                    ref={ref}
                    onChange={handleChange}
                    name={name}
                    value={value}
                    min={minValue}
                    max={max}
                    placeholder={placeholder}
                    className={amountFieldClassNames}
                    radius='large'
                    type='number'
                    size='3'
                    step={'any'}
                    data-testid={dataTestID}
                    inputMode={inputMode}
                    onWheel={e => onWheelEvent(e)}
                    pattern={pattern}
                  />
                </RadixForm.Control>
              </Flex>
            )
          }}
        </RadixForm.ValidityState>
      </RadixForm.Field>
    )
  }
)
