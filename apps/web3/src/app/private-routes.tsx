import { FC } from 'react'
import { useUser } from 'features/auth/hooks/use-user'
import { Navigate, Outlet } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { HomeMainSkeleton } from 'shared/skeletons/home/home-main-skeleton'
import { featureFlags } from './app-feature-flags'

const { isAuthRequired } = featureFlags.auth

/**
 * @description This component controls the private routes
 * relative to the auth settings in `isAuthRequired`
 */
export const PrivateRoutes: FC = ({}) => {
  const queryString = window.location.search

  const { userData, loading } = useUser()

  const isLoggedIn = Boolean(userData)

  if (!isLoggedIn && loading) return <HomeMainSkeleton />

  if (isAuthRequired && !isLoggedIn) {
    return (
      <Navigate
        to={`${RouterPathes.unlogged}${queryString}`}
        replace={true}
      />
    )
  }

  return <Outlet />
}
