import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { GameType } from '__generated__/graphql'
import { MY_BETS_MODES } from 'shared/constants'
import { getIconByGameId } from 'shared/utils/get-mode-icon-by-id'
import styles from '../../table.module.scss'

interface Props {
  type: GameType
}

export const TableItemMode: React.FC<Props> = ({ type }) => {
  const ModeIcon = getIconByGameId(type)
  const modeColor = getColorByModeId(type)

  return (
    <Flex
      align={'center'}
      height={'100%'}
      gap={'4'}
    >
      <ModeIcon
        color={modeColor}
        width={'4rem'}
        height={'4rem'}
      />

      <Text
        size={'4'}
        weight={'medium'}
        className={styles.tableItemMode}
      >
        {MY_BETS_MODES[type].name}
      </Text>
    </Flex>
  )
}

function getColorByModeId(type: GameType) {
  const modeIdToColorMap = {
    [GameType.Bullseye]: 'var(--c-bulls-eye)',
    [GameType.Onevsone]: 'var(--c-one-vs-one)',
    [GameType.Setup]: 'var(--c-setups)',
    [GameType.Updown]: 'var(--c-up-down)',
    // TODO: MEME-WARS change color
    [GameType.Race]: 'var(--c-a-red)'
  }
  return modeIdToColorMap[type] ?? 'gray'
}
