import { FC } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import styles from './xyro-collapsible.module.scss'

interface Props {
  trigger: React.ReactNode
  children: React.ReactNode
  isOpen: boolean
}
export const XyroCollapsible: FC<Props> = ({ trigger, children, isOpen }) => (
  <Collapsible.Root
    defaultOpen={true}
    open={isOpen}
  >
    <Collapsible.Trigger asChild>{trigger}</Collapsible.Trigger>

    <Collapsible.Content
      className={styles.collapsibleContent}
      asChild
    >
      {children}
    </Collapsible.Content>
  </Collapsible.Root>
)
