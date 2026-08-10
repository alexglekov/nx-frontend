import { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Box, Flex } from '@radix-ui/themes'
import PriceGraph from 'features/price-graph'
import { PriceGraphStub } from 'features/price-graph/components/price-graph-stub'
import { DataTestIDs } from 'shared/constants'
import { useResponsive } from 'shared/hooks/use-responsive'
import { selectedAssetVar } from 'shared/store/selected-asset'
import { AssetId } from 'shared/types'
import { XyroDialog } from 'shared/ui'
import { isCreateSetupDialogOpenVar } from '../../store/dialogs'
import { SetupsCreateForm } from '../setups-create-form/setups-create-form'
import styles from '../../mode-setups.module.scss'

export const SetupsDialogCreateGame: React.FC = () => {
  const isCreateSetupDialogOpen = useReactiveVar(isCreateSetupDialogOpenVar)
  const selectedAsset = useReactiveVar(selectedAssetVar)
  const [isMobile] = useResponsive('xs')

  const handleOpenChange = useCallback(
    (isOpen: boolean) => isCreateSetupDialogOpenVar(isOpen),
    []
  )

  return (
    <XyroDialog
      open={isCreateSetupDialogOpen}
      onOpenChange={handleOpenChange}
      className={styles.createSetupsGameDialog}
    >
      <Box className={styles.setupsGameFormWithGraph}>
        {!isMobile && (
          <Flex className={styles.setupsPriceGraphWrapper}>
            {selectedAsset?.id ?
              <PriceGraph
                assetId={selectedAsset?.id as AssetId}
                withHeader
                assetNameDataTestID={DataTestIDs.setupsSelectedAssetName}
                priceAmountDataTestID={DataTestIDs.setupsSelectedAssetPrice}
              />
            : <PriceGraphStub />}
          </Flex>
        )}

        <SetupsCreateForm />

        {isMobile && (
          <Flex className={styles.setupsPriceGraphWrapper}>
            {selectedAsset?.id ?
              <PriceGraph
                assetId={selectedAsset?.id as AssetId}
                withHeader
                assetNameDataTestID={DataTestIDs.setupsSelectedAssetName}
                priceAmountDataTestID={DataTestIDs.setupsSelectedAssetPrice}
              />
            : <PriceGraphStub />}
          </Flex>
        )}
      </Box>
    </XyroDialog>
  )
}
