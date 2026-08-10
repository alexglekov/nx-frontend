import { FC, useState } from 'react'
import * as RadixForm from '@radix-ui/react-form'
import { Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { RadixColorType, Maybe } from 'shared/types'
import { DotTitle } from '../dot-title/dot-title'
import { SelectionButton } from './selection-button'
import styles from './selection-buttons.module.scss'
import { SelectionButtonOption } from './types'

// TODO: extract separated components for the each appearance
interface Props {
  options: SelectionButtonOption[]
  name: string
  appearance: 'radix' | 'xyro' | 'switch'
  color?: RadixColorType
  label?: string
  labelColor?: RadixColorType | 'black'
  size?: '1' | '2' | '3' | '4'
  onChange?: (value: string | number) => void
  defaultFieldValue?: Maybe<string>
  className?: string
  dataTestIds?: DataTestIDs[]
}
export const SelectionButtons: FC<Props> = ({
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
    [styles.betDirectionButtons]: appearance === 'xyro',
    [styles.radixSelectionButtons]: appearance === 'radix'
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
          {options.map((o, i) => {
            const dataTestID = dataTestIds?.[i] || ''

            return (
              <SelectionButton
                key={o.value}
                option={o}
                handleClick={handleClick}
                size={size}
                color={color}
                fieldValue={fieldValue}
                appearance={appearance}
                dataTestId={dataTestID}
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
