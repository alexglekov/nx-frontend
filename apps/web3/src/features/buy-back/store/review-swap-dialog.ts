import { makeVar } from '@apollo/client'
import { ReviewDialogProps } from '../types'

export const isOpenReviewSwapDialogVar = makeVar<boolean>(false)
export const reviewSwapDialogPropsVar = makeVar<ReviewDialogProps | null>(null)
