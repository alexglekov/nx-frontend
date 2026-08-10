import { FC } from 'react'
import { QuestionMarkIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { PredictStatus } from '__generated__/graphql'
import {
  CANCEL_RESULT_TOOLTIP_TEXT,
  PREDICT_STATUS_TO_BADGE_MAP
} from 'shared/constants'
import { MinusFilledIcon } from 'shared/icons'
import { RadixColorType } from 'shared/types'
import { InfoTooltip } from '../info-tooltip/info-tooltip'
import styles from './table.module.scss'

interface Props {
  status: PredictStatus
  until?: number | null
}

const ResultStatuses = [PredictStatus.Loss, PredictStatus.Won]

export const TableItemResult: FC<Props> = ({ status, until = null }) => {
  const { label, color, icon: renderIcon } = getResultBadge(status, until)
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

        <Text color={color as RadixColorType}>{label?.toUpperCase()}</Text>
      </Flex>

      {status === PredictStatus.Reject && (
        <InfoTooltip
          color='gray'
          content={CANCEL_RESULT_TOOLTIP_TEXT}
        />
      )}
    </Flex>
  )
}

const getResultBadge = (status: PredictStatus, until: number | null) => {
  const unknownResultBadge = {
    label: 'unknown',
    color: 'gray',
    icon: QuestionMarkIcon
  }

  if (until !== null && until <= 0 && !ResultStatuses.includes(status)) {
    return {
      label: 'Expired',
      color: 'red',
      icon: MinusFilledIcon
    }
  }

  return PREDICT_STATUS_TO_BADGE_MAP?.[status] || unknownResultBadge
}
