import { makeVar } from '@apollo/client'
import { ProviderGamesCatalog } from '__generated__/graphql'

export const currentActiveGameVar = makeVar<ProviderGamesCatalog | null>(null)
