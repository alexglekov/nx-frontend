import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Grid, ScrollArea, Text } from '@radix-ui/themes'
import { RaceGame } from '__generated__/graphql'
import { memeWarsGameVar } from '../store/meme-wars-game.store'
import { MemeWarsFormMyPredictItem } from './meme-wars-form-my-predict-item'
import { MemeWarsFormPredictItem } from './meme-wars-form-predict-item'
import styles from '../mode-meme-wars.module.scss'

interface Props {
  title: string
  items: RaceGame['predicts']
  isMyBets?: boolean
}
export const MemeWarsFormPlayerList: React.FC<Props> = ({
  title,
  items,
  isMyBets = false
}) => {
  if (isMyBets && items.length === 0) return null

  return (
    <Flex
      direction={'column'}
      gap={'3'}
    >
      <Text
        className='color-gray-light'
        align={'center'}
        size={{ initial: '4', sm: '3' }}
      >
        {title}
      </Text>

      <MemeWarsFormPlayerListItems
        items={items}
        isMyBets={isMyBets}
      />
    </Flex>
  )
}

interface IMemeWarsFormPlayerListItems {
  items: RaceGame['predicts']
  isMyBets?: boolean
}

const MemeWarsFormPlayerListItems: React.FC<IMemeWarsFormPlayerListItems> = ({
  items,
  isMyBets
}) => {
  const memeWarsGame = useReactiveVar(memeWarsGameVar)

  const isMyBetExists =
    memeWarsGame?.myPredicts && memeWarsGame?.myPredicts.length > 0

  const isEmptyItems = items.length === 0
  const isOneItem = items.length === 1

  if (isMyBets) {
    return (
      <Grid
        columns={isOneItem ? '1fr' : '1fr 1fr'}
        gap={'2'}
      >
        {items.map(p => {
          return (
            <MemeWarsFormMyPredictItem
              key={p.id}
              amount={p.amount}
              assetId={p.feedId}
            />
          )
        })}
      </Grid>
    )
  }

  if (!isMyBets && isEmptyItems) {
    return (
      <Flex
        className={styles.calloutWrapper}
        py={'3'}
        width={'100%'}
        direction={'column'}
        gap={'2'}
        align={'center'}
        justify={'center'}
      >
        {!isMyBetExists && (
          <Text
            align={'center'}
            size={'2'}
            weight={'bold'}
            color='cyan'
          >
            Be the first one to join the game!
          </Text>
        )}

        <Text
          align={'center'}
          size={'1'}
          className={styles.calloutText}
        >
          We need at list 2 players in different pools to get started
        </Text>
      </Flex>
    )
  }

  return (
    <ScrollArea className={styles.memeWarsPlayersListScrollArea}>
      <Flex
        direction={'column'}
        gap={'3'}
        width={'100%'}
        className={styles.playerPredictsContainer}
      >
        {items.map(p => {
          return (
            <MemeWarsFormPredictItem
              key={p.id}
              name={p.owner?.name || ''}
              amount={p.amount}
              avatar={p.owner?.avatarUris[0] || ''}
              assetId={p.feedId}
            />
          )
        })}
      </Flex>
    </ScrollArea>
  )
}
