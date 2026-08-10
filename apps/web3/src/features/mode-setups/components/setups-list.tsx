import { FC, useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Card, Flex, Heading } from '@radix-ui/themes'
import { WarningTriangleIcon } from 'shared/icons'
import { SetupsGameSkeleton } from 'shared/skeletons/setups-game-skeleton/setups-game-skeleton'
import { isChatOpenedVar } from 'shared/store/chat-state-store'
import { RadixText } from 'shared/ui'
import { DotPagination } from 'shared/ui/dot-pagination/dot-pagination'
import {
  ACTIVE_SETUPS_TAKE_VAR,
  ACTIVE_SETUPS_TAKE_VAR_WITH_CHAT
} from '../constants'
import { useAllActiveSetupsLoader } from '../hooks/use-all-active-setups-loader'
import { selectedSetupVar } from '../store/selected-setup'
import { skipAllSetupsVar } from '../store/setups-list-store'
import { SetupsCard } from './setups-card/setups-card'
import styles from '../mode-setups.module.scss'

interface Props {
  title: string
}
export const SetupsList: FC<Props> = ({ title }) => {
  const { setups, total, loading } = useAllActiveSetupsLoader()
  const isChatOpened = useReactiveVar(isChatOpenedVar)
  const skip = useReactiveVar(skipAllSetupsVar)

  const take =
    isChatOpened ? ACTIVE_SETUPS_TAKE_VAR_WITH_CHAT : ACTIVE_SETUPS_TAKE_VAR

  const handleSelect = useCallback(
    (id: string) => {
      const newSelectedSetup = setups?.find(setup => setup.id === id) || null
      selectedSetupVar(newSelectedSetup)
    },
    [setups]
  )

  const handlePaginationChange = useCallback(
    (index: number) => {
      skipAllSetupsVar(index * take)
    },
    [take]
  )

  if (loading) return <SetupsGameSkeleton />

  return (
    <Card size={'3'}>
      <Flex justify={'between'}>
        <Heading
          size={'7'}
          as='h4'
          weight={'medium'}
          mt='3'
          mb='5'
        >
          {title} ({total})
        </Heading>

        {total > take && (
          <DotPagination
            skip={skip}
            take={take}
            total={total}
            onChange={handlePaginationChange}
          />
        )}
      </Flex>

      <Flex
        width={'100%'}
        className={styles.setupsCardList}
      >
        {total === 0 && <EmptyList />}

        {setups?.map(setup => (
          <SetupsCard
            key={setup.id}
            setup={setup}
            onSetupSelect={handleSelect}
          />
        ))}
      </Flex>
    </Card>
  )
}

const EmptyList = () => {
  return (
    <Flex
      align={'center'}
      gap='2'
    >
      <WarningTriangleIcon color='var(--gray-10)' />
      <RadixText
        size={'3'}
        color='gray'
      >
        There are no any opened setups
      </RadixText>
    </Flex>
  )
}
