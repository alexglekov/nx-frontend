import React from 'react'
import { Flex, Grid, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { useResponsive } from 'shared/hooks/use-responsive'
import { CARD_MODES } from '../constants'
import { ModeCard } from './mode-card'
import styles from '../home.module.scss'

export const ModeCards: React.FC = () => {
  const [isMobile] = useResponsive(['xs', 'sm'])

  return (
    <Flex
      direction={'column'}
      className={styles.cardsSectionsWrapper}
      width={'100%'}
    >
      <Flex
        direction={'column'}
        gap={'1'}
        width={'100%'}
      >
        <Text
          className={cn(styles.sectionTitle, 'color-white')}
          weight={'regular'}
        >
          Game Modes
        </Text>
        <Grid
          columns={{ initial: '1fr 1fr', sm: '1fr 1fr 1fr' }}
          rows={'1fr 1fr'}
          className={styles.gameModeCards}
          gap={'1'}
        >
          <ModeCard
            mode={CARD_MODES[5]}
            key={CARD_MODES[5].key}
            isWide={true}
          />

          <ModeCard
            mode={CARD_MODES[2]}
            key={CARD_MODES[2].key}
          />

          <ModeCard
            mode={CARD_MODES[4]}
            key={CARD_MODES[4].key}
          />

          <ModeCard
            mode={CARD_MODES[3]}
            key={CARD_MODES[3].key}
            isWide={true}
          />

          <ModeCard
            mode={CARD_MODES[10]}
            key={CARD_MODES[10].key}
            isNewBadgeShown
          />
        </Grid>
      </Flex>

      <Flex
        direction={'column'}
        gap={'1'}
        width={'100%'}
      >
        <Text
          className={cn(styles.sectionTitle, 'color-white')}
          weight={'regular'}
        >
          Extra
        </Text>

        <Flex
          align={'stretch'}
          gap={'1'}
          height={'100%'}
        >
          <ModeCard
            mode={CARD_MODES[8]}
            key={CARD_MODES[8].key}
            isNewBadgeShown
          />

          <ModeCard
            mode={CARD_MODES[9]}
            key={CARD_MODES[9].key}
            isNewBadgeShown
          />
        </Flex>

        <Grid
          columns={'1fr 1fr'}
          rows={{ initial: '1fr 1fr 1fr', sm: '1fr 1fr' }}
          className={styles.extraModeCards}
          gap={'1'}
        >
          <ModeCard
            mode={CARD_MODES[1]}
            key={CARD_MODES[1].key}
            isWide={Boolean(isMobile)}
          />

          <ModeCard
            mode={CARD_MODES[6]}
            key={CARD_MODES[6].key}
            isWide={Boolean(isMobile)}
          />

          <ModeCard
            mode={CARD_MODES[7]}
            key={CARD_MODES[7].key}
            isWide={Boolean(isMobile)}
            isNewBadgeShown
          />

          <ModeCard
            mode={CARD_MODES[0]}
            key={CARD_MODES[0].key}
          />
        </Grid>
      </Flex>
    </Flex>
  )
}
