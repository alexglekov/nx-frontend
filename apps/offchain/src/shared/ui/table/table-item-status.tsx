import { FC } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { PredictStatus } from '__generated__/graphql'
import { CANCEL_RESULT_TOOLTIP_TEXT } from 'shared/constants'
import { CheckBoxCircle, MinusFilledIcon } from 'shared/icons'
import { RadixColorType } from 'shared/types'
import { InfoTooltip } from '../info-tooltip/info-tooltip'
import styles from './table.module.scss'

interface Props {}

const ResultStatuses = [PredictStatus.Loss, PredictStatus.Won]

export const TableItemStatus: FC<Props> = ({}) => {
  //   const { label, color, icon: renderIcon } = getResultBadge(status, until)
  //   const cssColorVar = `var(--${color})`

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
        {/* {renderIcon({ color: cssColorVar, width: '24', height: '24' })} */}

        {/* <Text color={color as RadixColorType}>{label?.toUpperCase()}</Text> */}

        <CheckBoxCircle />

        <Text color='violet'>Pending</Text>
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
