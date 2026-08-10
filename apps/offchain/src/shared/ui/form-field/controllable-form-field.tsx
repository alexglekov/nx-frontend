import * as RadixForm from '@radix-ui/react-form'
import { Flex, TextField } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { ControllableFormFieldValidationMessages } from './controllable-form-field-validation-messages'
import styles from './form-field.module.scss'
import { FormFieldErrorMessage } from './types'

interface Props {
  value: string
  handleFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  label?: string
  placeholder?: string
  height?: string
  disabled?: boolean
  borderRadius?: 'small' | 'none' | 'medium' | 'large' | 'full'
  dataTestID?: DataTestIDs | ''
  className?: string
  size?: '1' | '2' | '3'
  onFocus?: () => void
  onBlur?: () => void
  customMessages?: FormFieldErrorMessage[]
  required?: boolean
  type?:
    | 'number'
    | 'search'
    | 'time'
    | 'text'
    | 'hidden'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'password'
    | 'tel'
    | 'url'
    | 'week'
    | undefined
}

export const ControllableFormField: React.FC<Props> = ({
  value,
  handleFieldChange,
  name,
  label,
  placeholder,
  height,
  disabled,
  borderRadius,
  className,
  size,
  onFocus,
  onBlur,
  type,
  dataTestID = '',
  required = true
}) => {
  return (
    <RadixForm.Field
      className={styles.formField}
      name={name}
    >
      <RadixForm.ValidityState name={name}>
        {validityState => {
          const inputClassName = cn(styles.formFieldInput, className, {
            [styles.formFieldInputError]:
              isNotNullOrUndef(validityState) && !validityState.valid
          })

          return (
            <>
              <RadixForm.Control asChild>
                <TextField.Root
                  onChange={handleFieldChange}
                  value={value}
                  className={inputClassName}
                  name={name}
                  radius={borderRadius}
                  placeholder={placeholder || ''}
                  disabled={disabled}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  size={size}
                  type={type}
                  required={required}
                  style={{
                    height
                  }}
                  data-testid={dataTestID}
                />
              </RadixForm.Control>

              <Flex className={styles.formFieldLabelWrap}>
                {label ?
                  <RadixForm.Label className={styles.formLabel}>
                    {label}
                  </RadixForm.Label>
                : null}

                <ControllableFormFieldValidationMessages name={name} />
              </Flex>
            </>
          )
        }}
      </RadixForm.ValidityState>
    </RadixForm.Field>
  )
}
