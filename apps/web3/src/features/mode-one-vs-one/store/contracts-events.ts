import { makeVar } from '@apollo/client'

import { Maybe } from 'shared/types'

export const oneVsOneEventVar = makeVar<Maybe<any>>(null)
export const exactPriceEventVar = makeVar<Maybe<any>>(null)