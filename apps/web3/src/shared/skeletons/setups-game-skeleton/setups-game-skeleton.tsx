import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import { isChatOpenedVar } from 'shared/store/chat-state-store'
import styles from './setups-game-skeleton.module.scss'
import { useResponsive } from 'shared/hooks/use-responsive'

export const SetupsGameSkeleton: React.FC = () => {
  const isChatOpened = useReactiveVar(isChatOpenedVar)
  const [isLargeDesktop] = useResponsive(['lg'])

  return (
    <Flex
      className={styles.setupsContainer}
      direction={'column'}
      gap={'5'}
    >
      <Skeleton
        height={'6rem'}
        width={'32rem'}
      />
      <Grid
        gap='2'
        columns={{
          initial: '1fr 1fr',
          // TODO: Remove on refactoring
          lg: !isLargeDesktop && isChatOpened ? '1fr 1fr' : '1fr 1fr 1fr'
        }}
        width={'100%'}
        className={styles.gridWrapper}
      >
        <Box
          width={'100%'}
          height={'100%'}
        >
          <Skeleton
            width={'100%'}
            height={'60rem'}
            borderRadius={'5rem'}
          />
        </Box>
        <Box
          width={'100%'}
          height={'100%'}
        >
          <Skeleton
            width={'100%'}
            height={'60rem'}
            borderRadius={'5rem'}
          />
        </Box>
        {!isChatOpened && (
          <Box
            width={'100%'}
            height={'100%'}
          >
            <Skeleton
              width={'100%'}
              height={'60rem'}
              borderRadius={'5rem'}
            />
          </Box>
        )}
      </Grid>
    </Flex>
  )
}
