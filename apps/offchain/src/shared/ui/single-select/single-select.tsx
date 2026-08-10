import { useCallback, useState } from 'react'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { DropdownMenu, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import styles from './single-select.module.scss'

interface SingleSelectProps<T> {
  items: Array<{ value: T; label: string }>
  selectedItem: T | null
  onSelect: (item: T) => void
  title: string
}

export const SingleSelect = <T extends string | number>({
  selectedItem,
  onSelect,
  items,
  title
}: SingleSelectProps<T>) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false)

  const handleOpenClose = useCallback(() => {
    setIsDropdownOpened(prev => !prev)
  }, [])

  const handleSelect = (value: T) => {
    onSelect(value)
    setIsDropdownOpened(false)
  }

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
          const isSelected = selectedItem === value

          return (
            <DropdownMenu.Item
              key={index}
              className={cn(styles.dropdownItem, {
                [styles.dropdownItemSelected]: isSelected
              })}
              onClick={() => handleSelect(value)}
            >
              <Flex
                align={'center'}
                justify={'center'}
                className={cn(styles.checkmark, {
                  [styles['checkmark--selected']]: isSelected
                })}
              >
                {isSelected && <Flex className={styles.checkmarkSelected} />}
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
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
