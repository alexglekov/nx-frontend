import { useMemo } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Box, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { useLoyaltyTiers } from 'features/account-bonus/hooks/use-loyalty-tiers'
import { userVar } from 'shared/store/user'
import styles from '../../porgressbar.module.scss'

interface Props {
  withBackground?: boolean
}

export const AccountProfileProgressBar: React.FC<Props> = ({
  withBackground = true
}) => {
  const user = useReactiveVar(userVar)
  const { tiers } = useLoyaltyTiers()

  const userTier = user?.loyaltyProgress?.tier || 1
  const userLevel = user?.loyaltyProgress?.lvl || 1
  const userTurnover = user?.loyaltyProgress?.amount || 0

  const currentTier = useMemo(() => {
    return tiers?.find(t => t.tier === userTier)
  }, [tiers, userTier])

  const nextTier = useMemo(() => {
    if (userTier < tiers.length && userLevel === 5) {
      return tiers.find(t => t.tier === userTier + 1)
    }
    return null
  }, [tiers, userTier, userLevel])

  const nextLevel = useMemo(() => {
    if (userLevel < 5) {
      return currentTier?.levels.find(l => l.lvl === userLevel + 1)
    } else if (userLevel === 5 && nextTier) {
      return nextTier?.levels.find(l => l.lvl === 1)
    }
    return null
  }, [currentTier, userLevel, nextTier])

  const targetTurnover = nextLevel?.turnover || 0

  const percentage = useMemo(() => {
    if (userTier === tiers.length && userLevel === 5) {
      return 100
    }

    const percentage = Math.floor((userTurnover / targetTurnover) * 100)

    return percentage
  }, [userTier, tiers.length, userLevel, userTurnover, targetTurnover])

  const filledItems = Math.round(percentage / 5)

  return (
    <Flex
      className={cn(styles.currentLevelProgress, {
        [styles.currentLevelProgressWithBackground]: withBackground
      })}
      direction={'column'}
      width={'100%'}
      gap={'1'}
    >
      <Flex
        position={'relative'}
        className={styles.currentProgressTooltip}
      >
        <Flex
          className={styles.accountLevelText}
          style={{ left: `calc(${percentage}%)` }}
        >
          <Text weight={'bold'}>{percentage}%</Text>
        </Flex>
      </Flex>

      <Box className={styles.progressBar}>
        <Box className={styles.progress}>
          {Array.from({ length: 20 }).map((_, index) => {
            const isFilled = index < filledItems

            return (
              <Box
                className={cn(styles.progressItem, {
                  [styles.progressItemHidden]: !isFilled
                })}
                key={index}
              />
            )
          })}
        </Box>
      </Box>
    </Flex>
  )
}
