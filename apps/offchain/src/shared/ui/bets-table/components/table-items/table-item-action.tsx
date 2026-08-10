import React, { SyntheticEvent, useCallback, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import cn from 'classnames'
import { XyroLoading } from 'shared/components'
import { DataTestIDs } from 'shared/constants'
import { useWallet } from 'shared/hooks/use-wallet'
import { CrossIcon, TickIcon } from 'shared/icons'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { XyroButton } from '../../../xyro-button/xyro-button'
import styles from '../../table.module.scss'

interface Props {
  action: (event: SyntheticEvent) => void | Promise<void>
  type: 'approve' | 'deny'
  withLoader?: boolean
  title?: string
  dataTestID?: DataTestIDs | ''
}

/* eslint-disable-next-line complexity */
export const TableItemAction: React.FC<Props> = ({
  action,
  title,
  type,
  dataTestID,
  withLoader
}) => {
  const [loading, setLoading] = useState(false)
  const { isReady, handlePrepareWallet } = useWallet()

  const isApproveType = type === 'approve'

  const handleAction = useCallback(
    async (event: SyntheticEvent) => {
      if (!withLoader) {
        action(event)
        return
      }

      setLoading(true)

      await action(event)
    },
    [withLoader, action]
  )

  if (isNotNullOrUndef(withLoader)) {
    return (
      <Flex
        data-testid={dataTestID}
        className={styles.actionWrap}
      >
        <XyroButton
          color={isApproveType ? 'green' : 'pink'}
          className={cn(
            styles.actionButton,
            isApproveType ? 'color-black' : 'color-white',
            {
              [styles.actionButtonWide]: Boolean(title)
            }
          )}
          onClick={isReady ? handleAction : handlePrepareWallet}
          isIconOnly={!Boolean(title)}
          isWide={Boolean(title)}
        >
          <XyroLoading loading={loading}>
            {isApproveType ?
              <TickIcon />
            : <CrossIcon color='--c-black' />}
            {title}
          </XyroLoading>
        </XyroButton>
      </Flex>
    )
  }

  return (
    <Flex data-testid={dataTestID}>
      <XyroButton
        color={isApproveType ? 'green' : 'pink'}
        className={cn(
          styles.actionButton,
          isApproveType ? 'color-black' : 'color-white',
          {
            [styles.actionButtonWide]: Boolean(title)
          }
        )}
        onClick={isReady ? action : handlePrepareWallet}
        isIconOnly={!Boolean(title)}
        isWide={Boolean(title)}
      >
        {isApproveType ?
          <TickIcon />
        : <CrossIcon color='--c-black' />}
        {title}
      </XyroButton>
    </Flex>
  )
}
