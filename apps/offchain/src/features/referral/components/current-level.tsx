import { Flex, Text } from '@radix-ui/themes'
import { MAP_LEVEL_ID_TO_ICON } from '../constants'
import { useReferralData } from '../hooks/use-referral-data'
import { ReferralLevels } from './referral-levels'
import styles from '../referral.module.scss'

export const CurrentLevel: React.FC = () => {
  const { referralUserLevel } = useReferralData()

  const currentLevel = referralUserLevel?.referralLevel?.id || 1
  const currentLevelName = referralUserLevel?.referralLevel?.name || 'N/A'
  const LevelIcon = MAP_LEVEL_ID_TO_ICON[currentLevel]

  return (
    <Flex
      align={'start'}
      gap={'3'}
      className={styles.currentLevel}
    >
      <Flex className={styles.cardInfoActionBtn}>
        <ReferralLevels />
      </Flex>

      <LevelIcon
        width={'8.75rem'}
        height={'8.75rem'}
      />

      <Flex
        direction={'column'}
        gap={'1'}
      >
        <Text
          className={'color-gray-light'}
          weight={'bold'}
          size={'2'}
        >
          Level {currentLevel}
        </Text>

        <Text
          className={'color-white'}
          size={'4'}
        >
          {currentLevelName}
        </Text>
      </Flex>
    </Flex>
  )
}
