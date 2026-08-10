import { useCallback, useEffect } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { LOG_OUT } from 'api/auth/logout'
import { userVar } from 'shared/store/user'
import { useAccount, useDisconnect } from 'wagmi'

export const useVerifyUser = () => {
  const [commitLogout] = useMutation(LOG_OUT)
  const { disconnectAsync } = useDisconnect()

  const user = useReactiveVar(userVar)
  const { address: currentAccountAddress } = useAccount()

  const handleLogOut = useCallback(async () => {
    await disconnectAsync()
    await commitLogout()

    window.location.reload()
  }, [commitLogout, disconnectAsync])

  useEffect(() => {
    if (!user || !commitLogout || !currentAccountAddress) return

    const isAccountAddressRegistered =
      user.wallet?.address.toLowerCase() ===
      currentAccountAddress?.toLowerCase()

    if (isAccountAddressRegistered) return

    handleLogOut()
  }, [commitLogout, user, handleLogOut, currentAccountAddress])
}
