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
  dataTestId?: DataTestIDs
}
// eslint-disable-next-line max-statements, complexity
export const SelectionButton: FC<SelectionButtonProps> = ({
  handleClick,
  option,
  size,
  fieldValue,
  appearance,
  color = 'black' as RadixColorType,
  dataTestId = ''
}) => {
  const optionValue = option?.value?.toString() || ''
  const isSwitch = appearance === 'switch'
  const withoutFill = isSwitch ? 'soft' : 'outline'
  /** @description define bg for the selected option */
  const selectedOptionVariant =
    fieldValue === optionValue ? 'solid' : withoutFill

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
      data-testid={dataTestId}
    >
      <ButtonComponent
        onClick={() => handleClick(optionValue)}
        variant={selectedOptionVariant}
        highContrast={isSwitch}
        color={color}
        className={styles.selectionButton}
        size={size}
        value={optionValue}
        shape={shape}
        type='button'
        {...xyroButtonProps}
      >
        <Flex
          gap='1'
          align='center'
        >
          {ButtonIcon && <ButtonIcon />}
          {option.label}
        </Flex>
      </ButtonComponent>
    </RadixForm.Control>
  )
}
