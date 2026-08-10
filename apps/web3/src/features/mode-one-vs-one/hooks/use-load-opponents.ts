import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { FindOpponentsQuery, User } from '__generated__/graphql'
import { FIND_OPPONENTS } from 'api/mode-1vs1/find-opponents'
import { opponentsVar } from '../store/opponents-store'

const DEBOUNCE_DELAY = 200

export const useLoadOpponents = (searchString: string) => {
  const [debouncedSearchString, setDebouncedSearchString] =
    useState(searchString)

  const { data, error, loading } = useQuery<FindOpponentsQuery>(
    FIND_OPPONENTS,
    {
      variables: {
        data: {
          take: 5,
          skip: 0,
          name: debouncedSearchString
        }
      }
    }
  )

  useEffect(() => {
    const debounceTimeout: NodeJS.Timeout = setTimeout(() => {
      setDebouncedSearchString(searchString)
    }, DEBOUNCE_DELAY)

    return () => clearTimeout(debounceTimeout)
  }, [searchString])

  useEffect(() => {
    if (!data?.findOpponents) return

    opponentsVar(data?.findOpponents as User[])
  }, [data?.findOpponents])

  return {
    error,
    loading
  }
}
