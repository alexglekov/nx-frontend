/* eslint-disable max-statements */
import { useCallback, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import * as RadixForm from '@radix-ui/react-form'
import { Box, Dialog, Flex, Text } from '@radix-ui/themes'
import { useChosenAssetUpdater } from 'features/mode-setups/hooks/use-chosen-asset-updater'
import { DataTestIDs } from 'shared/constants'
import { SetupsIcon } from 'shared/icons'
import { selectedAssetVar } from 'shared/store/selected-asset'
import { SelectionButtons, AssetSelect } from 'shared/ui'
import { SETUP_POSITION_BUTTONS, TIMEFRAME_BUTTONS } from '../../constants'
import { useSetupCreationSubmit } from '../../hooks/use-create-game-submit'
import { isCreateSetupDialogOpenVar } from '../../store/dialogs'
import { FieldNames } from '../../types'
import { SetupsCreateFormAmountFields } from './setups-create-form-amount-fields'
import { SetupsCreateFormSubmitButtons } from './setups-create-form-submit-buttons'
import styles from '../../mode-setups.module.scss'

export const SetupsCreateForm = () => {
  const selectedAsset = useReactiveVar(selectedAssetVar)

  const { currentAssetPrice, selectedAssetPayload } = useChosenAssetUpdater()

  const [setupPosition, setSetupPosition] = useState('long')

  const { handleSetupCreationSubmit, loading } = useSetupCreationSubmit(
    selectedAsset,
    selectedAssetPayload as `0x${string}`
  )

  const handleSetupCancelation = useCallback(() => {
    isCreateSetupDialogOpenVar(false)
  }, [])

  const handleSelectionChange = useCallback(
    (value: number | string) => {
      setSetupPosition(String(value))
    },
    [setSetupPosition]
  )

  const isLong = setupPosition === 'long'
  const placeholder = selectedAsset ? 'Type price' : 'Select an asset first'

  const timeframeSelectionButtonsDataTestIDs = new Array(
    TIMEFRAME_BUTTONS.length
  ).fill(DataTestIDs.buttonSetupsTimeframe)

  return (
    <Box className={styles.setupCreateForm}>
      <SetupsIcon className={styles.formBackgroundIcon} />

      <Dialog.Title
        size={'7'}
        mt={'3'}
      >
        Create new setup
      </Dialog.Title>

      <RadixForm.Root onSubmit={handleSetupCreationSubmit}>
        <Flex
          direction='column'
          gap='3'
        >
          <Flex
            direction={'column'}
            width={'100%'}
            gap={'1'}
          >
            <Text
              size={'1'}
              weight={'regular'}
            >
              Choose position
            </Text>
            <SelectionButtons
              options={SETUP_POSITION_BUTTONS}
              name={FieldNames.setupPosition}
              appearance='switch'
              size='4'
              onChange={handleSelectionChange}
              dataTestIds={[
                DataTestIDs.buttonSetupsLong,
                DataTestIDs.buttonSetupsShort
              ]}
            />
          </Flex>

          <AssetSelect
            name={FieldNames.setupAsset}
            label='Choose asset:'
            labelWithPadding={false}
            isPriceShown={false}
            triggerDataTestID={DataTestIDs.dropDownSetupsSelectAsset}
            itemsDataTestID={DataTestIDs.buttonSetupsSelectAsset}
          />

          <Flex
            direction={'column'}
            width={'100%'}
            gap={'2'}
            data-testid={DataTestIDs.buttonsSetupsTimeframe}
          >
            <Text
              size={'1'}
              weight={'regular'}
            >
              Choose timeframe:
            </Text>
            <SelectionButtons
              options={TIMEFRAME_BUTTONS}
              name={FieldNames.setupTimeframe}
              appearance='radix'
              size='2'
              color='green'
              dataTestIds={timeframeSelectionButtonsDataTestIDs}
            />
          </Flex>

          <SetupsCreateFormAmountFields
            isLong={isLong}
            currentAssetPrice={currentAssetPrice}
            placeholder={placeholder}
          />
        </Flex>

        <SetupsCreateFormSubmitButtons
          handleSetupCancelation={handleSetupCancelation}
          loading={loading}
          disabled={!selectedAsset}
        />
      </RadixForm.Root>
    </Box>
  )
}
