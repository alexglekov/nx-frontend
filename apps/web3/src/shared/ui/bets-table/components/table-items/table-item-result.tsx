import { QuestionMarkIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import {
  GameSetupResult,
  GameStatus,
  PredictStatus
} from '__generated__/graphql'
import {
  CANCEL_RESULT_TOOLTIP_TEXT,
  RESULT_TO_BADGE_MAP
} from 'shared/constants'
import { InfoTooltip } from '../../../info-tooltip/info-tooltip'
import styles from '../../table.module.scss'

interface ResultProps {
  result: GameStatus | PredictStatus | GameSetupResult | 'Exact' | 'WinStreak'
  dedicatedAmount?: number
}
export const ResultTableItem: React.FC<ResultProps> = ({
  result,
  dedicatedAmount = 0
}) => {
  const { label, color, icon: renderIcon } = getResultBadge(result)
  const cssColorVar = `var(--${color})`

  return (
    <Flex
      align={'center'}
      gap={'2'}
      height={'100%'}
    >
      <Flex
        className={styles.conditionResultItemWrapper}
        align={'center'}
        gap={'1'}
      >
        {renderIcon({ color: cssColorVar, width: '24', height: '24' })}

        <Text color={color}>
          {label?.toUpperCase()}
          {Boolean(result === 'WinStreak' && dedicatedAmount > 1) &&
            `:${dedicatedAmount}`}
        </Text>
      </Flex>

      {result === PredictStatus.Reject && (
        <InfoTooltip
          color='gray'
          content={CANCEL_RESULT_TOOLTIP_TEXT}
        />
      )}
    </Flex>
  )
}

const getResultBadge = (
  result: GameStatus | PredictStatus | GameSetupResult | 'Exact' | 'WinStreak'
) => {
  const unknownResultBadge = {
    label: 'unknown',
    color: 'gray',
    icon: QuestionMarkIcon
  }

  return RESULT_TO_BADGE_MAP?.[result] || unknownResultBadge
}
