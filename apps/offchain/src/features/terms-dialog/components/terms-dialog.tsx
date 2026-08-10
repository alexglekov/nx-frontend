import { useReactiveVar } from '@apollo/client'
import { Dialog, Flex, Portal, ScrollArea, Tabs } from '@radix-ui/themes'
import { RadixText } from 'shared/ui'
import { TermsDialogTab } from '../constants'
import { isTermsDialogOpenVar, termsTabVar } from '../store/dialog'
import { PrivacyPolicy } from './privacy-policy'
import { TermsAndConditions } from './terms-and-conditions'
import styles from '../terms-dialog.module.scss'

export const TermsDialog = () => {
  const isDialogOpen = useReactiveVar(isTermsDialogOpenVar)
  const activeTab = useReactiveVar(termsTabVar)

  const handleOpenChange = (newIsOpen: boolean) => {
    return isTermsDialogOpenVar(newIsOpen)
  }

  return (
    <Dialog.Root
      open={isDialogOpen}
      onOpenChange={handleOpenChange}
    >
      {/* <Dialog.Trigger /> */}

      <Portal>
        <Dialog.Content className={styles.termsDialogContent}>
          <Tabs.Root
            defaultValue={TermsDialogTab.TermsAndConditions}
            activationMode='manual'
            onValueChange={newValue => termsTabVar(newValue as TermsDialogTab)}
            value={activeTab}
            asChild
          >
            <Flex
              direction={'column'}
              className={styles.termsDialogTabs}
              p='4'
            >
              <Tabs.List
                size='2'
                color='gray'
              >
                <Tabs.Trigger value={TermsDialogTab.TermsAndConditions}>
                  <RadixText size={'4'}>Terms and Conditions</RadixText>
                </Tabs.Trigger>

                <Tabs.Trigger value={TermsDialogTab.PrivacyPolicy}>
                  <RadixText size={'4'}>Privacy Policy</RadixText>
                </Tabs.Trigger>
              </Tabs.List>

              <ScrollArea
                scrollbars='vertical'
                size={'2'}
                type='hover'
                className={styles.termsDialogScrollArea}
              >
                <Tabs.Content value='terms-and-conditions'>
                  <TermsAndConditions />
                </Tabs.Content>
              </ScrollArea>

              <ScrollArea
                scrollbars='vertical'
                size={'2'}
                type='hover'
                className={styles.termsDialogScrollArea}
              >
                <Tabs.Content value='privacy-policy'>
                  <PrivacyPolicy />
                </Tabs.Content>
              </ScrollArea>
            </Flex>
          </Tabs.Root>
        </Dialog.Content>
      </Portal>
    </Dialog.Root>
  )
}
