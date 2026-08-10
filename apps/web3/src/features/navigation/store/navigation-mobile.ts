import { makeVar } from '@apollo/client'

export const mobileNavSectionVar = makeVar<'games' | 'more' | null>(null)
