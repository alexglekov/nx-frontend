import { ReactElement } from 'react'
import { SwapTetherToken, SwapXyroToken } from 'shared/icons'

export const getTokenIcons = (isSell: boolean): [ReactElement, ReactElement] =>
  isSell ?
    [
      <SwapTetherToken
        key='tether'
        width={48}
        height={48}
      />,
      <SwapXyroToken
        key='xyro'
        width={48}
        height={48}
      />
    ]
  : [
      <SwapXyroToken
        key='xyro'
        width={48}
        height={48}
      />,
      <SwapTetherToken
        key='tether'
        width={48}
        height={48}
      />
    ]
