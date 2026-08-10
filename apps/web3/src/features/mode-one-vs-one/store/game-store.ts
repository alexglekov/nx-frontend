import { makeVar } from '@apollo/client'
import { Maybe } from '__generated__/graphql'
import { OneVsOneGameCustomType } from 'shared/types'

export const oneVsOneCurrentGameVar =
  makeVar<Maybe<OneVsOneGameCustomType>>(null)
