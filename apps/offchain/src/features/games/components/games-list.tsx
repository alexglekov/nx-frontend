/* eslint-disable max-statements, max-lines */

import { useMemo, useState, useEffect, useCallback, useRef } from 'react'
import { Flex, Grid, Text, TextField } from '@radix-ui/themes'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchIcon } from 'shared/icons'
import { GamesPageSkeleton } from 'shared/skeletons/games/games-page-skeleton'
import { XyroButton } from 'shared/ui'
import { TableEmptyState } from 'shared/ui/bets-table/components/table-empty-state'
import { GameCard } from 'shared/ui/game-card/game-card'
import { MultiSelect } from 'shared/ui/multi-select/multi-select'
import { SingleSelect } from 'shared/ui/single-select/single-select'
import { useGetProvidersAndCategories } from '../hooks/use-providers-and-categories'
import { useProvidersGamesCatalog } from '../hooks/use-providers-games-catalog'
import styles from '../games.module.scss'

interface Props {
  isFavoriteList?: boolean
}

const SORT_BY = [
  {
    value: 'orderByPopularity',
    label: 'Popular'
  },
  {
    value: 'orderByPriority',
    label: 'Priority'
  }
]

export const GamesList: React.FC<Props> = ({ isFavoriteList }) => {
  const [searchString, setSearchString] = useState('')
  const [selectedProviders, setSelectedProviders] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSortBy, setSelectedSortBy] =
    useState<string>('orderByPopularity')

  const navigate = useNavigate()
  const location = useLocation()

  const previousFilters = useRef({
    searchString,
    selectedProviders,
    selectedCategories,
    selectedSortBy
  })

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    setSearchString(searchParams.get('search') || '')
    setSelectedProviders(searchParams.get('providers')?.split(',') || [])
    setSelectedCategories(searchParams.get('categories')?.split(',') || [])
    setSelectedSortBy(searchParams.get('sortBy') || 'orderByPopularity')
  }, [location.search])

  const filters = useMemo(
    () => ({
      searchString,
      selectedProviders,
      selectedCategories,
      selectedSortBy
    }),
    [searchString, selectedProviders, selectedCategories, selectedSortBy]
  )

  const updateUrl = useCallback(
    (params: Record<string, string | string[]>) => {
      const searchParams = new URLSearchParams()

      if (params.searchString)
        searchParams.set('search', params.searchString as string)
      if (params.selectedProviders.length > 0)
        searchParams.set(
          'providers',
          (params.selectedProviders as string[]).join(',')
        )
      if (params.selectedCategories.length > 0)
        searchParams.set(
          'categories',
          (params.selectedCategories as string[]).join(',')
        )
      if (params.selectedSortBy !== 'orderByPopularity')
        searchParams.set('sortBy', params.selectedSortBy as string)

      navigate({ search: searchParams.toString() })
    },
    [navigate]
  )

  const { gamesList, loadMoreGames, hasMoreGames, loading } =
    useProvidersGamesCatalog({
      searchString,
      isFavoriteList,
      providers: selectedProviders,
      categories: selectedCategories,
      sortBy: selectedSortBy
    })

  const { providers, categories } = useGetProvidersAndCategories()

  const providersItems = useMemo(() => {
    return providers.map(provider => ({
      value: provider,
      label: provider
    }))
  }, [providers])

  const categoriesItems = useMemo(() => {
    return categories.map(category => ({
      value: category,
      label: category
    }))
  }, [categories])

  const title = isFavoriteList ? 'Favorite Games' : 'Games'
  const notFoundText =
    isFavoriteList ? 'You do not have any favorite game' : 'No games found'

  useEffect(() => {
    const filtersChanged =
      previousFilters.current.searchString !== filters.searchString ||
      previousFilters.current.selectedProviders !== filters.selectedProviders ||
      previousFilters.current.selectedCategories !==
        filters.selectedCategories ||
      previousFilters.current.selectedSortBy !== filters.selectedSortBy

    if (filtersChanged) {
      updateUrl(filters)
      previousFilters.current = filters
    }
  }, [filters, updateUrl])

  return (
    <Flex
      direction={'column'}
      gap={'6'}
      width={'100%'}
      align={'center'}
    >
      <Flex
        align={{ initial: 'start', sm: 'center' }}
        justify={'between'}
        gap={{ initial: '5', sm: '0' }}
        width={'100%'}
        direction={{ initial: 'column', sm: 'row' }}
      >
        <Text className={styles.title}>{title}</Text>

        <Flex
          align={'center'}
          gap={'4'}
          direction={{ initial: 'column', sm: 'row' }}
          width={{ initial: '100%', sm: 'auto' }}
        >
          <Flex
            align={'center'}
            gap={'4'}
            width={'100%'}
          >
            <MultiSelect
              items={providersItems}
              selectedItems={selectedProviders}
              onSelect={setSelectedProviders}
              title={'Providers'}
            />

            <MultiSelect
              items={categoriesItems}
              selectedItems={selectedCategories}
              onSelect={setSelectedCategories}
              title={'Categories'}
            />

            <SingleSelect
              items={SORT_BY}
              selectedItem={selectedSortBy}
              onSelect={setSelectedSortBy}
              title={'Sort by'}
            />
          </Flex>

          <Flex
            position={'relative'}
            className={styles.searchWrapper}
          >
            <SearchIcon
              className={styles.searchIcon}
              width={'3rem'}
              height={'3rem'}
            />

            <TextField.Root
              onChange={e => setSearchString(e.target.value)}
              value={searchString}
              placeholder='Search...'
              className={styles.searchBox}
              radius={'large'}
              type={'text'}
            />
          </Flex>
        </Flex>
      </Flex>

      {loading ?
        <GamesPageSkeleton />
      : gamesList && gamesList.length > 0 ?
        <Grid
          width={'100%'}
          columns={'repeat(auto-fill, minmax(25rem, 1fr))'}
          gap={'2rem'}
        >
          {gamesList?.map(game => (
            <GameCard
              game={game}
              key={game.id}
            />
          ))}
        </Grid>
      : <TableEmptyState text={notFoundText} />}

      {hasMoreGames && (
        <XyroButton
          className={styles.loadButton}
          onClick={loadMoreGames}
        >
          Load More
        </XyroButton>
      )}
    </Flex>
  )
}
