import { Flex, Grid, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { TetherRoundedIcon, XyroTokenRounded } from 'shared/icons'
import { LevelTier } from '../../types'
import {
  MAP_ACCOUNT_LEVEL_ICON,
  MAP_TIER_STATS
} from '../../utils/map-account-level'
import styles from '../../account.module.scss'

interface Props {
  tier: LevelTier
}

export const AccountLevel: React.FC<Props> = ({ tier }) => {
  const IconTier = MAP_ACCOUNT_LEVEL_ICON[tier]
  const levelItems = MAP_TIER_STATS[tier]

  return (
    <Flex
      className={styles.accountLevelWrapper}
      direction={'column'}
      gap={'4'}
      width={'100%'}
    >
      <Flex
        align={'center'}
        gap={'3'}
      >
        <IconTier />

        <Text
          size={'4'}
          className={'color-white'}
        >
          Tier {tier}
        </Text>
      </Flex>

      <Flex direction={'column'}>
        <Grid
          className={cn(styles.levelItemWrapper, styles.levelHeaderWrapper)}
        >
          <Text
            className={styles.levelHeaderTitle}
            size={'3'}
          >
            Level
          </Text>

          <Text
            className={styles.levelHeaderTitle}
            size={'3'}
          >
            Volume USD
          </Text>

          <Text
            className={styles.levelHeaderTitle}
            size={'3'}
          >
            Xyro token
          </Text>
        </Grid>

        {levelItems.map((item, index) => (
          <LevelItem
            key={index}
            level={item.level}
            usdVolume={item.volume}
            xyroVolume={item.token}
          />
        ))}
      </Flex>
    </Flex>
  )
}

interface LevelItemProps {
  level: number
  usdVolume: number
  xyroVolume: number
  isYour?: boolean
}
const LevelItem: React.FC<LevelItemProps> = ({
  level,
  usdVolume,
  xyroVolume,
  isYour = false
}) => {
  return (
    <Grid className={styles.levelItemWrapper}>
      <Flex direction={'column'}>
        <Text
          className={'color-white'}
          size={'3'}
        >
          {level}
        </Text>

        {isYour && (
          <Text
            className={'color-gray-light'}
            size={'3'}
          >
            (your)
          </Text>
        )}
      </Flex>

      <Flex
        align={'center'}
        gap={'1'}
      >
        <TetherRoundedIcon
          color={'var(--lime)'}
          width={'2rem'}
          height={'2rem'}
        />

        <Text
          className={'color-white'}
          size={'3'}
        >
          {usdVolume}
        </Text>
      </Flex>

      <Flex
        align={'center'}
        gap={'1'}
      >
        <XyroTokenRounded
          width={'2rem'}
          height={'2rem'}
        />

        <Text
          className={'color-white'}
          size={'3'}
        >
          {xyroVolume}
        </Text>
      </Flex>
    </Grid>
  )
}
