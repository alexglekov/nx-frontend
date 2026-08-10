import React from 'react'
import { ModeOnboardingSkeleton } from '../common-skeletons/mode-onboarding-skeleton'
import { TableSkeleton } from '../common-skeletons/table-skeleton'
import { UpDownGameSkeleton } from '../up-down-game-skeleton/up-down-game-skeleton'
import styles from './page-skeletons.module.scss'

export const UpDownPageSkeleton: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <ModeOnboardingSkeleton />

      <UpDownGameSkeleton />

      <TableSkeleton />
    </div>
  )
}
