import { useEffect, useState } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Text, DropdownMenu } from '@radix-ui/themes'
import cn from 'classnames'
import { CheckboxIcon } from 'shared/icons/about-page'
import { XyroButton } from '../xyro-button/xyro-button'
import styles from './dropdown-select.module.scss'

interface Props<T> {
  items: T[]
  keyForTitle: keyof T
  title: string
  onSelectionChange?: (selectedItems: T[]) => void
}

export const DropdownSelect = <T extends Record<string, any>>({
  items,
  keyForTitle,
  title,
  onSelectionChange
}: Props<T>) => {
  const [selectedItems, setSelectedItems] = useState<T[]>([])

  const handleSelection = (item: T) => {
    setSelectedItems(prevSelectedItems => {
      const isSelected = prevSelectedItems.some(
        selectedItem => selectedItem[keyForTitle] === item[keyForTitle]
      )

      if (isSelected) {
        return prevSelectedItems.filter(
          selectedItem => selectedItem[keyForTitle] !== item[keyForTitle]
        )
      } else {
        return [...prevSelectedItems, item]
      }
    })
  }

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedItems)
    }
  }, [selectedItems, onSelectionChange])

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <XyroButton className={styles.dropdownTrigger}>{title}</XyroButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className={styles.dropdownContent}>
        {items.map((item, index) => {
          const isChecked = selectedItems.some(
            selectedItem => selectedItem[keyForTitle] === item[keyForTitle]
          )

          return (
            <Checkbox.Root
              key={index}
              className={styles.checkBoxItem}
              checked={'indeterminate'}
              onSelect={e => e.preventDefault()}
              onClick={() => handleSelection(item)}
            >
              <Checkbox.Indicator
                className={cn(styles.checkBoxIndicator, {
                  [styles.checkBoxIndicatorChecked]: isChecked
                })}
              >
                {isChecked && <CheckboxIcon />}
              </Checkbox.Indicator>

              <Text
                size={'2'}
                weight={'bold'}
                className={styles.checkboxTitle}
              >
                {item[keyForTitle]}
              </Text>
            </Checkbox.Root>
          )
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
