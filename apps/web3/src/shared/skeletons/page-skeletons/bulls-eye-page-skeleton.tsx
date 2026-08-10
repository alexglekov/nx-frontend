import React from 'react'
import { Flex } from '@radix-ui/themes'
import { BullsEyeGameSkeleton } from '../bulls-eye-game-skeleton/bulls-eye-game-skeleton'
import { ModeOnboardingSkeleton } from '../common-skeletons/mode-onboarding-skeleton'
import { TableSkeleton } from '../common-skeletons/table-skeleton'

export const BullsEyePageSkeleton: React.FC = () => {
  return (
    <Flex
      direction='column'
      gap='3'
      height='100%'
    >
      <ModeOnboardingSkeleton />

      <BullsEyeGameSkeleton />

      <TableSkeleton />
    </Flex>
  )
}
