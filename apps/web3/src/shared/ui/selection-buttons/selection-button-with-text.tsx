import { FC } from 'react'
import * as RadixForm from '@radix-ui/react-form'
import { Button, Flex } from '@radix-ui/themes'
import { DataTestIDs } from 'shared/constants'
import { RadixColorType } from 'shared/types'
import { getIconByButtonLabel } from 'shared/utils/get-color-by-button-label'
import { XyroButton } from '../xyro-button/xyro-button'
import { getButtonShapeByValue } from './get-option-shape-by-value'
import styles from './selection-buttons.module.scss'
import { SelectionButtonOption } from './types'

interface SelectionButtonProps {
  handleClick: (value: string) => void
  option: SelectionButtonOption
  size: '1' | '2' | '3' | '4'
  appearance: 'radix' | 'xyro' | 'switch'
  fieldValue?: string
  color?: RadixColorType
  disabled?: boolean
  additionalButtonInfo?: React.ReactNode
  dataTestID?: DataTestIDs
}
// eslint-disable-next-line max-statements, complexity
export const SelectionButtonWithText: FC<SelectionButtonProps> = ({
  handleClick,
  option,
  size,
  fieldValue,
  appearance,
  color = 'black' as RadixColorType,
  disabled = false,
  additionalButtonInfo,
  dataTestID = ''
}) => {
  const optionValue = option?.value?.toString() || ''
  const isSwitch = appearance === 'switch'
  const withoutFill = isSwitch ? 'soft' : 'outline'
  const variant = fieldValue === optionValue ? 'solid' : withoutFill

  const isXyroAppearance = appearance === 'xyro'
  const ButtonComponent = isXyroAppearance ? XyroButton : Button
  const xyroButtonProps =
    isXyroAppearance ?
      {
        withBorder: false,
        isWide: true
      }
    : {}
  const ButtonIcon = getIconByButtonLabel(optionValue)
  const shape = getButtonShapeByValue(appearance)

  return (
    <RadixForm.Control
      key={optionValue}
      type='button'
      value={optionValue}
      asChild
      data-testid={dataTestID}
    >
      <ButtonComponent
        onClick={() => handleClick(optionValue)}
        highContrast={isSwitch}
        color={color}
        className={styles.selectionButton}
        variant={variant}
        size={size}
        value={optionValue}
        {...xyroButtonProps}
        shape={shape}
        type='button'
        disabled={disabled}
      >
        <Flex
          gap='1'
          align='center'
        >
          {ButtonIcon && <ButtonIcon />}
          {option.label}

          {additionalButtonInfo && additionalButtonInfo}
        </Flex>
      </ButtonComponent>
    </RadixForm.Control>
  )
}
