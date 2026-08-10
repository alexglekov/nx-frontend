import { ReactiveVar, useReactiveVar } from '@apollo/client'
import { Overlay } from '@radix-ui/react-dialog'
import { Dialog, Portal } from '@radix-ui/themes'

export interface DialogWindowProps {
  openStore: ReactiveVar<boolean>
  children: React.ReactNode
  width?: string
  height?: string
  border?: string
  radius?: string
}

export const DialogShared: React.FC<DialogWindowProps> = ({
  openStore,
  children,
  width,
  border,
  radius
}) => {
  const isOpenDialog = useReactiveVar(openStore)
  const handleOpenChange = () => openStore(false)

  return (
    <Dialog.Root
      open={isOpenDialog}
      onOpenChange={handleOpenChange}
    >
      <Portal>
        <Overlay />
        <Dialog.Content
          style={{
            width: width ? width : '',
            border: border ? border : '',
            borderRadius: radius ? radius : ''
          }}
        >
          {children}
        </Dialog.Content>
      </Portal>
    </Dialog.Root>
  )
}
