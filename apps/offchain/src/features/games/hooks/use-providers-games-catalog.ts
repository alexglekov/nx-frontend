import { useState, useCallback, useEffect, useRef } from 'react'
import { useQuery } from '@apollo/client'
import {
  CatalogGamesFiltersInput,
  ProviderGamesCatalog
} from '__generated__/graphql'
import { GET_PROVIDERS_GAMES_CATALOG } from 'api/games/get-providers-games-catalog'

const GAMES_TAKE_AMOUNT = 30
const DEBOUNCE_DELAY = 200

interface Props {
  searchString?: string
  takeAmount?: number
  categories?: string[]
  providers?: string[]
  isFavoriteList?: boolean
  sortBy?: string
}

export const useProvidersGamesCatalog = ({
  searchString,
  takeAmount = GAMES_TAKE_AMOUNT,
  categories,
  providers,
  isFavoriteList,
  sortBy
}: Props) => {
  const [debouncedSearchString, setDebouncedSearchString] =
    useState(searchString)

  const [gamesListSkipAmount, setGamesListSkipAmount] = useState(0)

  const [fetchedGames, setFetchedGames] = useState<ProviderGamesCatalog[]>([])
  const [hasMoreGames, setHasMoreGames] = useState(true)

  const previousSearchString = useRef(debouncedSearchString)

  const filters: CatalogGamesFiltersInput = {
    name: debouncedSearchString,
    isActive: true,
    ...(isFavoriteList && { isFavorites: true }),
    ...(categories && categories.length > 0 && { categories }),
    ...(providers && providers.length > 0 && { providers }),
    ...(sortBy && { [sortBy]: true })
  }

  const { loading, refetch } = useQuery(GET_PROVIDERS_GAMES_CATALOG, {
    variables: {
      filters,
      pagination: {
        take: takeAmount,
        skip: gamesListSkipAmount
      }
    },
    fetchPolicy: 'network-only',
    onCompleted: newData => {
      if (newData?.getProviderGamesCatalog) {
        const newGames = newData.getProviderGamesCatalog?.games || []

        setFetchedGames(prevGames => {
          if (
            previousSearchString.current !== debouncedSearchString &&
            gamesListSkipAmount === 0
          ) {
            return newGames
          }
          return [...prevGames, ...newGames]
        })

        setHasMoreGames(newGames.length === takeAmount)
        previousSearchString.current = debouncedSearchString
      }
    }
  })

  useEffect(() => {
    const debounceTimeout: NodeJS.Timeout = setTimeout(() => {
      setDebouncedSearchString(searchString)
    }, DEBOUNCE_DELAY)

    return () => clearTimeout(debounceTimeout)
  }, [searchString])

  useEffect(() => {
    setGamesListSkipAmount(0)
    setHasMoreGames(true)
    setFetchedGames([])
    refetch({
      filters,
      pagination: { take: takeAmount, skip: 0 }
    })
  }, [debouncedSearchString, categories, providers, sortBy])

  const loadMoreGames = useCallback(() => {
    if (hasMoreGames && !loading) {
      setGamesListSkipAmount(prev => prev + takeAmount)
    }
  }, [hasMoreGames, loading, takeAmount])

  return {
    gamesList: fetchedGames,
    loading,
    refetch,
    hasMoreGames,
    loadMoreGames,
    takeAmount
  }
}
