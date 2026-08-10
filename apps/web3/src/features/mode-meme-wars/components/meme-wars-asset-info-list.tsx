import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Grid } from '@radix-ui/themes'
import { useResponsive } from 'shared/hooks/use-responsive'
import { AssetId } from 'shared/types'
import { memeWarsGameVar } from '../store/meme-wars-game.store'
import { MemeWarsAssetInfo } from './meme-wars-asset-info'
import { MemeWarsTimer } from './meme-wars-timer'
import styles from '../mode-meme-wars.module.scss'

export const MemeWarsAssetInfoList: React.FC = () => {
  const [isMobile] = useResponsive('xs')
  const memeWarsGame = useReactiveVar(memeWarsGameVar)

  return (
    <Grid
      className={styles.memeWarsAssetInfoList}
      gap={'1'}
      width={'100%'}
      columns={{ initial: '1fr 1fr', sm: '1fr 1fr 1fr 1fr 1fr' }}
    >
      {memeWarsGame?.feedsIds.map((feedId, index) => (
        <MemeWarsAssetInfo
          assetId={feedId as AssetId}
          key={index}
        />
      ))}

      {!Boolean(isMobile) && <MemeWarsTimer />}
    </Grid>
  )
}
