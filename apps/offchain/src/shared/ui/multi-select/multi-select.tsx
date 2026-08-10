import { useCallback, useEffect, useState } from 'react'
import { TriangleDownIcon, CheckIcon } from '@radix-ui/react-icons'
import { Button, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import styles from './multi-select.module.scss'

interface MultiSelectProps<T> {
  items: Array<{ value: T; label: string }>
  selectedItems: T[]
  onSelect: (item: T[]) => void
  title: string
}

export const MultiSelect = <T extends string | number>({
  selectedItems,
  onSelect,
  items,
  title
}: MultiSelectProps<T>) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false)
  const [tempSelectedItems, setTempSelectedItems] = useState<T[]>(selectedItems)

  const handleOpenClose = useCallback(() => {
    setIsDropdownOpened(ps => !ps)
  }, [])

  const handleSelect = (value: T) => {
    const updatedSelectedItems =
      tempSelectedItems.includes(value) ?
        tempSelectedItems.filter(item => item !== value)
      : [...tempSelectedItems, value]

    setTempSelectedItems(updatedSelectedItems)
  }

  const handleClear = () => {
    if (selectedItems.length === 0) return

    setTempSelectedItems([])
    onSelect([])
  }

  const handleOK = () => {
    onSelect(tempSelectedItems)
    setIsDropdownOpened(false)
  }

  useEffect(() => {
    if (isDropdownOpened) {
      setTempSelectedItems(selectedItems)
    }
  }, [isDropdownOpened, selectedItems])

  return (
    <DropdownMenu.Root
      open={isDropdownOpened}
      onOpenChange={handleOpenClose}
    >
      <DropdownMenu.Trigger>
        <Flex
          className={styles.dropdownTrigger}
          align={'center'}
          gap={'4'}
        >
          <Text
            size={'3'}
            className={'color-gray-light'}
          >
            {title}
          </Text>

          <TriangleDownIcon
            className={cn(styles.triangleIcon, {
              [styles.triangleIconRotated]: isDropdownOpened
            })}
            width={'2.5rem'}
            height={'2.5rem'}
          />
        </Flex>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className={styles.dropdownContent}>
        {items.map(({ value, label }, index) => {
          const itemTitle = label[0].toUpperCase() + label.slice(1)
          const isSelected = tempSelectedItems.includes(value)

          return (
            <DropdownMenu.Item
              key={index}
              className={cn(styles.dropdownItem, {
                [styles.dropdownItemSelected]: isSelected
              })}
              onSelect={event => event.preventDefault()}
              onClick={() => handleSelect(value)}
            >
              <Flex
                align={'center'}
                justify={'center'}
                className={cn(styles.checkmark, {
                  [styles.checkmarkSelected]: isSelected
                })}
              >
                {isSelected && (
                  <CheckIcon
                    width={'2.5rem'}
                    height={'2.5rem'}
                    className={'color-white'}
                  />
                )}
              </Flex>

              <Text
                size={'3'}
                className={'color-gray-light'}
                weight={isSelected ? 'bold' : 'medium'}
              >
                {itemTitle}
              </Text>
            </DropdownMenu.Item>
          )
        })}

        <Flex
          align={'center'}
          className={styles.buttons}
        >
          <Button
            my={'0'}
            mx={'0'}
            size={'3'}
            variant={'outline'}
            color={'gray'}
            onClick={handleClear}
          >
            CLEAR
          </Button>

          <Button
            my={'0'}
            mx={'2'}
            size={'3'}
            variant={'outline'}
            color={'gray'}
            onClick={handleOK}
          >
            OK
          </Button>
        </Flex>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
