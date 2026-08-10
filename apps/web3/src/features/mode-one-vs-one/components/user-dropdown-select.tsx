import * as React from 'react'
import { useCallback, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import * as Popover from '@radix-ui/react-popover'
import { Button, Flex, Text, TextField, Theme } from '@radix-ui/themes'
import { DataTestIDs } from 'shared/constants'
import { XyroAvatar } from 'shared/ui'
import { useLoadOpponents } from '../hooks/use-load-opponents'
import { oneVsOneCreateFormStateVar } from '../store/form'
import { opponentsVar } from '../store/opponents-store'
import { FieldNames } from '../types'
import styles from '../mode-one-vs-one.module.scss'

interface Props {
  name: string
  onChange?: (value: string) => void
}

// eslint-disable-next-line max-statements
export const UserDropdownSelect: React.FC<Props> = ({ name, onChange }) => {
  const oneVsOneCreateFormState = useReactiveVar(oneVsOneCreateFormStateVar)
  const chosenOpponent = oneVsOneCreateFormState[FieldNames.betOpponent]
  const [open, setOpen] = useState(false)
  const [searchString, setSearchString] = useState('')

  const opponents = useReactiveVar(opponentsVar)

  const { error, loading } = useLoadOpponents(searchString)

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (loading || error) return
      setOpen(isOpen)
    },
    [loading, error]
  )

  const toggleDropdown = () => {
    if (loading || error) return
    setOpen(!open)
  }

  const handleChange = useCallback(
    (value: string) => {
      if (onChange && value) {
        onChange(value)
      }
      setOpen(false)
    },
    [onChange]
  )

  return (
    <Popover.Root
      key={name}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Popover.Trigger asChild>
        <Button
          className={styles.selectTrigger}
          data-testid={DataTestIDs.dropdownOneVsOneSelectOpponent}
          onClick={toggleDropdown}
        >
          {chosenOpponent ?
            <Flex
              align={'center'}
              width={'100%'}
              gap={'3'}
              className={styles.selectedDropdownItem}
            >
              <XyroAvatar
                displayLevel={false}
                size={'1'}
                userLevel={chosenOpponent.level?.levelId || 0}
                src={chosenOpponent.avatarUris[0]}
                fallback={chosenOpponent.name[0].toUpperCase()}
              />
              <Text>{chosenOpponent.name}</Text>
            </Flex>
          : <Text
              size={'3'}
              weight={'regular'}
            >
              {loading ? 'Loading...' : 'Select an opponent'}
            </Text>
          }
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Theme>
          <Popover.Content
            className={styles.popOverSelect}
            side='top'
            align='start'
            sideOffset={4}
            avoidCollisions={false}
            onOpenAutoFocus={e => e.preventDefault()}
          >
            <TextField.Root
              onChange={e => setSearchString(e.target.value)}
              value={searchString}
              placeholder='Search an opponent'
              className={styles.comboxSearch}
              radius={'large'}
              type={'text'}
              data-testid={DataTestIDs.inputOneVsOneFindUser}
            />

            <Flex
              role='listbox'
              className={styles.userList}
            >
              {opponents.length > 0 ?
                opponents.map(o => {
                  const opponentFallback = o.name[0].toUpperCase()

                  return (
                    <Button
                      key={o.id}
                      type={'button'}
                      variant={'ghost'}
                      className={styles.dropdownItem}
                      onClick={() => handleChange(o.id)}
                      data-testid={DataTestIDs.dropdownItemOneVsOneFindUser}
                    >
                      <Flex
                        align={'center'}
                        width={'100%'}
                        gap={'3'}
                        pr={'1'}
                      >
                        <XyroAvatar
                          displayLevel={false}
                          size={'1'}
                          userLevel={o.level?.levelId || 0}
                          src={o.avatarUris[0]}
                          fallback={opponentFallback}
                        />
                        <Text
                          className={styles.opponentName}
                          weight={'medium'}
                        >
                          {o.name}
                        </Text>
                      </Flex>
                    </Button>
                  )
                })
              : <Text>{loading ? 'Loading...' : 'No users found'}</Text>}
            </Flex>
          </Popover.Content>
        </Theme>
      </Popover.Portal>
    </Popover.Root>
  )
}
