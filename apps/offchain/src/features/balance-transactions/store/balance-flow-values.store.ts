import { makeVar } from '@apollo/client'

export const selectedPaymentAssetVar = makeVar<string>('')
export const operationAmountVar = makeVar<string>('')
export const requestedDepositAddressVar = makeVar<string>('')
