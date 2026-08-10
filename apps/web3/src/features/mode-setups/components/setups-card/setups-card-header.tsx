import { Badge, Flex, Text } from '@radix-ui/themes'
import { SECS_IN_HOUR, SECS_IN_MIN } from 'shared/constants'
import { TimerClockIcon } from 'shared/icons'
import { AssetId, Maybe, Seconds } from 'shared/types'
import { RadixText } from 'shared/ui'
import { XyroCard } from 'shared/ui/xyro-card/xyro-card'
import { getAssetColorById } from 'shared/utils/get-asset-color-by-id'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'
import { SetupsCardHeaderDirectionBadge } from './setups-card-header-direction-badge'
import styles from '../../mode-setups.module.scss'

interface Props {
  assetId: string
  isLong: boolean
  timeframe?: Maybe<Seconds>
}
export const SetupsCardHeader: React.FC<Props> = ({
  assetId,
  isLong,
  timeframe
}) => {
  const AssetIcon = getAssetIconById(assetId as AssetId)
  const assetBgColor = getAssetColorById(assetId as AssetId)
  const formattedTimeframe =
    timeframe &&
    (timeframe > SECS_IN_HOUR
      ? `${Math.round(timeframe / SECS_IN_HOUR)}h`
      : `${Math.round(timeframe / SECS_IN_MIN)}m`)

  return (
    <Flex
      align='center'
      width={'100%'}
      justify={'between'}
      py='4'
      mb={'4'}
    >
      <Flex
        align={'center'}
        gap='2'
      >
        <XyroCard bgColor={assetBgColor}>
          <AssetIcon
            width={'6rem'}
            height={'6rem'}
          />
        </XyroCard>

        <Text
          size={'5'}
          weight={'medium'}
          className={styles.assetId}
        >
          {assetId}
        </Text>
      </Flex>

      <Flex
        direction={'column'}
        gap={'1'}
      >
        <SetupsCardHeaderDirectionBadge isLong={isLong} />

        {formattedTimeframe && (
          <Badge
            size={'1'}
            radius='large'
          >
            <Flex
              width={'100%'}
              align={'center'}
              justify={'center'}
              gap={'1'}
            >
              <TimerClockIcon color='var(--c-white)' />
              <RadixText
                className='color-white'
                ml='1'
              >
                {formattedTimeframe}
              </RadixText>
            </Flex>
          </Badge>
        )}
      </Flex>
    </Flex>
  )
}
