import { makeVar } from '@apollo/client'

export const currentChatMessageVar = makeVar<string>('')
export const newMessageLoadingVar = makeVar(false)
