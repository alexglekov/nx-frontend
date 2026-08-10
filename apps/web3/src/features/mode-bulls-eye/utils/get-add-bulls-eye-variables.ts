import { AddBullsEyeBetInput } from '__generated__/graphql'
import { AddBullsEyeBetForm } from '../types'

export const getAddBullsEyeVariables = (
  formValues: AddBullsEyeBetForm,
  gameId: string
): AddBullsEyeBetInput => {
  return {
    price: Number(formValues.price),
    gameId
  }
}
