import { FC } from 'react'
import { Flex } from '@radix-ui/themes'

import { PredictCondition } from './predict-condition'
import {
  OneVsOneExactPricePredict,
  OneVsOneUpDownPredict
} from '__generated__/graphql'
import { OneVsOnePredict } from 'shared/types'

import styles from './table.module.scss'

interface Props {
  predict: OneVsOneUpDownPredict | OneVsOneExactPricePredict
}

export const TableItemPredictDirection: FC<Props> = ({ predict }) => (
  <Flex
    align={'center'}
    height={'100%'}
    style={{ minWidth: '12rem' }}
  >
    <Flex
      className={styles.tableItemDirectionWrapper}
      align={'center'}
      gap={'1'}
    >
      <PredictCondition predict={predict as OneVsOnePredict}/>
    </Flex>
  </Flex>
)
