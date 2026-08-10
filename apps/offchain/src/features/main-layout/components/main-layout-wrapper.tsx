import React, { Ref } from 'react'
import { Box, ScrollArea } from '@radix-ui/themes'
import { MAIN_LAYOUT_SCROLL_VIEW_ID } from 'shared/constants'
import { useResponsive } from 'shared/hooks/use-responsive'
import styles from '../main-layout.module.scss'

interface Props {
  children: React.ReactNode
  scrollAreaRef: Ref<HTMLDivElement>
  isEmptyPage: boolean
}
export const MainLayoutWrapper: React.FC<Props> = ({
  children,
  scrollAreaRef,
  isEmptyPage
}) => {
  const [isMobile] = useResponsive('xs')

  if (isMobile) {
    return <Box>{children}</Box>
  }

  return (
    <ScrollArea
      ref={scrollAreaRef}
      className={styles.scrollArea}
      scrollbars='vertical'
      size={'2'}
      type='hover'
      asChild={isEmptyPage}
      id={MAIN_LAYOUT_SCROLL_VIEW_ID}
    >
      {children}
    </ScrollArea>
  )
}
