import { useCallback } from 'react'
import { ApolloError, useMutation } from '@apollo/client'
import { Button, Flex, Text } from '@radix-ui/themes'
import { SignoutMutation } from '__generated__/graphql'
import { LOG_OUT } from 'api/auth/logout'
import { DataTestIDs } from 'shared/constants'
import { DoorOutIcon } from 'shared/icons'
import { userVar } from 'shared/store/user'
import { XyroLoading } from 'shared/ui'
import { notifyOnUnknownError } from 'shared/utils/notify-on-error'
import { useDisconnect } from 'wagmi'

export const Logout = () => {
  const [commitLogOut, { loading }] = useMutation<SignoutMutation>(LOG_OUT)
  const { disconnectAsync } = useDisconnect()

  const handleLogOut = useCallback(async () => {
    commitLogOut()
      .then(async () => {
        await disconnectAsync()

        userVar(null)
        location.reload()
      })
      .catch(e => notifyOnUnknownError(e as ApolloError))
  }, [commitLogOut, disconnectAsync])

  return (
    <Button
      onClick={handleLogOut}
      variant={'ghost'}
      type={'button'}
      disabled={loading}
      size={'3'}
      mx={'3'}
      mt={'3'}
      data-testid={DataTestIDs.buttonLogOut}
    >
      <Flex
        align={'center'}
        gap={'2'}
        p={'1'}
      >
        <XyroLoading loading={loading}>
          <DoorOutIcon color='var(--white)' />
          <Text
            className='color-white'
            size={'2'}
          >
            {!loading ? 'Log out' : 'Logging out...'}
          </Text>
        </XyroLoading>
      </Flex>
    </Button>
  )
}
