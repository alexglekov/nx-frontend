import React, { FC, useState } from 'react'
import * as RadixForm from '@radix-ui/react-form'
import { Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { RadixColorType } from 'shared/types'
import { DotTitle } from '../dot-title/dot-title'
import { SelectionButtonWithText } from './selection-button-with-text'
import styles from './selection-buttons.module.scss'
import { SelectionButtonOption } from './types'

/**
 * NOTE: copy-pasted from the {@link file://./selection-buttons.tsx} to avoid over-over-complicating the component
 * TODO: extract common parts with the selection-buttons.tsx
 */
interface Props {
  options: SelectionButtonOption[]
  name: string
  appearance: 'radix' | 'xyro' | 'switch'
  color?: RadixColorType
  label?: string
  labelColor?: RadixColorType | 'black'
  size?: '1' | '2' | '3' | '4'
  onChange?: (value: string) => void
  defaultFieldValue?: string
  className?: string
  disabled?: boolean
  additionalInfoFirstButton?: React.ReactNode
  additionalInfoSecondButton?: React.ReactNode
  dataTestIds?: DataTestIDs[]
}
export const SelectionButtonsWithText: FC<Props> = ({
  onChange,
  options,
  name,
  color,
  label,
  labelColor,
  appearance,
  size = '4',
  defaultFieldValue = options[0].value.toString(),
  className = '',
  disabled = false,
  additionalInfoFirstButton,
  additionalInfoSecondButton,
  dataTestIds = []
}) => {
  const [fieldValue, setFieldValue] = useState<string>(defaultFieldValue || '')

  if (options.length === 0) throw Error('No options provided')

  const handleClick = (value: string) => {
    setFieldValue(value)
    if (!onChange) return
    onChange?.(value)
  }

  const selectionButtonsClassNames = cn(styles.selectionButtons, {
    [styles.switch]: appearance === 'switch',
    [styles.betDirectionButtons]: appearance === 'xyro'
  })

  return (
    <Flex
      direction={'column'}
      gap='2'
      width={'100%'}
      className={cn(styles.selectionButtons, className)}
    >
      {label ?
        <DotTitle color={labelColor}>{label}</DotTitle>
      : null}

      <RadixForm.Field
        name={name}
        asChild
      >
        <Flex
          gap='1'
          className={selectionButtonsClassNames}
        >
          {options.map((o, index) => {
            const dataTestID = dataTestIds?.[index] || ''

            return (
              <SelectionButtonWithText
                key={o.value}
                option={o}
                handleClick={handleClick}
                size={size}
                color={color}
                fieldValue={fieldValue}
                appearance={appearance}
                disabled={disabled}
                additionalButtonInfo={
                  index === 0 ?
                    additionalInfoFirstButton
                  : additionalInfoSecondButton
                }
                dataTestID={dataTestID}
              />
            )
          })}

          {/* NOTE: hack: hidden field to pass a button click value to the form submit */}
          <input
            name={name}
            type='hidden'
            value={fieldValue}
          />
        </Flex>
      </RadixForm.Field>
    </Flex>
  )
}
