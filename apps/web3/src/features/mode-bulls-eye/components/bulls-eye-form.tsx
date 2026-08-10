import React from 'react'
import { Flex } from '@radix-ui/themes'
import { BullsEyeFormSubmitFields } from './bulls-eye-form-submit-fields'
import { BullsEyeGameInfo } from './bulls-eye-game-info'
import styles from '../mode-bulls-eye.module.scss'

export const BullsEyeForm: React.FC = () => {
  return (
    <Flex
      width={'100%'}
      height={'100%'}
      direction={'column'}
      align={'center'}
      justify={'between'}
      className={styles.bullsEyeFormWrapper}
    >
      <BullsEyeGameInfo />

      <BullsEyeFormSubmitFields />
    </Flex>
  )
}
