import { useCallback, useState } from 'react'
import * as RadixForm from '@radix-ui/react-form'
import { Flex, TextField } from '@radix-ui/themes'
import { FieldType } from 'shared/types'
import styles from './form-field.module.scss'

interface Props {
  type: FieldType
  name: string
  label?: string
  placeholder?: string
  height?: string
  disabled?: boolean
  borderRadius?: 'small' | 'none' | 'medium' | 'large' | 'full'
}
export const FormField: React.FC<Props> = ({
  type,
  name,
  label,
  placeholder,
  height,
  disabled,
  borderRadius
}) => {
  const [fieldState, setFieldState] = useState('')

  const handleFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldState(event.target.value)
    },
    []
  )

  return (
    <RadixForm.Field
      className={styles.formField}
      name={name}
    >
      <Flex>
        {label ?
          <RadixForm.Label className={styles.formLabel}>
            {label}
          </RadixForm.Label>
        : null}

        <RadixForm.Message
          className={styles.formValidationMessage}
          match='valueMissing'
        >
          Please enter your {name}
        </RadixForm.Message>
        <RadixForm.Message
          className={styles.formValidationMessage}
          match='typeMismatch'
        >
          Please provide a valid {name}
        </RadixForm.Message>
      </Flex>

      <RadixForm.Control asChild>
        <TextField.Root
          onChange={handleFieldChange}
          value={fieldState}
          className={styles.formFieldInput}
          name={name}
          // type={type}
          radius={borderRadius}
          placeholder={placeholder || ''}
          disabled={disabled}
          required
          style={{
            height: height ? height : ''
          }}
        />
      </RadixForm.Control>
    </RadixForm.Field>
  )
}
