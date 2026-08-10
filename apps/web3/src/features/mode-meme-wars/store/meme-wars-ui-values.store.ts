import { makeVar } from '@apollo/client'
import { Asset } from '__generated__/graphql'

export const memeWarsPredictAmountVar = makeVar<number>(1)
export const memeWarsSelectedAssetVar = makeVar<string | null>(null)
