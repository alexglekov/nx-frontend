import { FC } from 'react'
import { Button, Flex, Separator, Text } from '@radix-ui/themes'
import { Maybe } from '__generated__/graphql'
import { CircleArrowDown } from 'shared/icons'
import { XyroDialog, XyroLoading } from 'shared/ui'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import {
  BuyBackReviewDialogAssetItem,
  OverviewValuesType,
  OverviewItemType
} from '../types'
import { BuyBackReviewDialogAsset } from './buy-back-review-dialog-asset'
import { BuyBackReviewDialogDataTitle } from './buy-back-review-dialog-data-title'
import styles from '../buy-back.module.scss'

interface BuyBackReviewDialogProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: () => Promise<void>
  sellAsset: BuyBackReviewDialogAssetItem
  buyAsset: BuyBackReviewDialogAssetItem
  overviewValues?: Maybe<OverviewValuesType>
  overviewItems?: OverviewItemType[]
  loading: boolean
}

export const BuyBackReviewDialog: FC<BuyBackReviewDialogProps> = ({
  isOpen,
  setIsOpen,
  handleSubmit,
  sellAsset,
  buyAsset,
  overviewValues,
  overviewItems,
  loading
}) => {
  return (
    <XyroDialog
      className={styles.buybackReviewDialog}
      open={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
    >
      <Flex
        direction={'column'}
        p={'6'}
      >
        <Text size={'6'}>Review</Text>

        <Separator
          my={'4'}
          className={styles.buybackReviewDialogSeparator}
        />

        <Flex
          direction={'column'}
          gap={'2'}
          align={'start'}
        >
          <BuyBackReviewDialogAsset {...sellAsset} />

          <CircleArrowDown
            width={32}
            className={styles.reviewDialogAssetTradgeArrow}
          />

          <BuyBackReviewDialogAsset {...buyAsset} />
        </Flex>

        {isNotNullOrUndef(overviewValues) &&
          isNotNullOrUndef(overviewItems) && (
            <Flex
              direction={'column'}
              gap={'5'}
              mt={'5'}
            >
              {overviewItems.map(
                ({ title, tooltipTitle, dataSource, token }) => (
                  <BuyBackReviewDialogDataTitle
                    key={dataSource}
                    title={title}
                    tooltipTitle={tooltipTitle}
                    value={overviewValues?.[dataSource] || null}
                    token={token}
                  />
                )
              )}
            </Flex>
          )}

        <Button
          size={'4'}
          type={'button'}
          color={'lime'}
          mt={'5'}
          onClick={handleSubmit}
          disabled={loading}
          className={styles.reviewDialogButton}
        >
          <XyroLoading loading={Boolean(loading)}>
            <Text
              size={'2'}
              weight={'bold'}
            >
              CONFIRM
            </Text>
          </XyroLoading>
        </Button>
      </Flex>
    </XyroDialog>
  )
}
