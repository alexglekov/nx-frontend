import React from 'react'
import { ModeOnboardingSkeleton } from '../common-skeletons/mode-onboarding-skeleton'
import { OneVsOneGameSkeleton } from '../one-vs-one-game-skeleton/one-vs-one-game-skeleton'
import { TableSkeleton } from '../common-skeletons/table-skeleton'
import styles from './page-skeletons.module.scss'
import { useResponsive } from 'shared/hooks/use-responsive'

export const OneVsOnePageSkeleton: React.FC = () => {
  const [isMobile] = useResponsive('xs')
  return (
    <div className={styles.wrapper}>
      <ModeOnboardingSkeleton />

      {!isMobile && <OneVsOneGameSkeleton />}

      <TableSkeleton />

      <TableSkeleton />
    </div>
  )
}
