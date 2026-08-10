/* eslint-disable max-statements */
import { useCallback, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  AttachDiscordMutation,
  AttachTwitterMutation
} from '__generated__/graphql'
import { ATTACH_DISCORD } from 'api/user-settings/attach-discord'
import { ATTACH_TWITTER } from 'api/user-settings/attach-twitter'
import { RouterPathes } from 'shared/constants'
import { useQueryParams } from 'shared/hooks/use-query'
import { notificationStateVar } from 'shared/store/notification'
import { replaceUrlState } from 'shared/utils/replace-url-state'
import {
  SOCIAL_NETWORK_ATTACH_CODE_PARAM,
  SOCIAL_NETWORK_ATTACH_STATE_PARAM,
  SOCIAL_NETWORK_QUERY_KEY,
  SOCIAL_OPTIONS_REDIRECT_URL,
  SocialsOptions
} from '../constants'
import { isSocialNetworkAttachLoadingVar } from '../store/social-network-attach.store'

export const useAttachSocialNetwork = () => {
  const [attachDiscord, { loading: attachDiscordLoading }] =
    useMutation<AttachDiscordMutation>(ATTACH_DISCORD)

  const [attachTwitter, { loading: attachTwitterLoading }] =
    useMutation<AttachTwitterMutation>(ATTACH_TWITTER)

  const [socialNetworkParam, setSocialNetworkParam] = useState<string | null>(
    null
  )

  const [socialNetWorkState, setSocialNetworkState] = useState<string>('')

  const query = useQueryParams()

  const socialNetworkParamQuery = query.get(SOCIAL_NETWORK_QUERY_KEY)

  useEffect(() => {
    setSocialNetworkParam(socialNetworkParamQuery)
  }, [socialNetworkParamQuery])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const state = params.get(SOCIAL_NETWORK_ATTACH_STATE_PARAM)

    if (!state) return

    setSocialNetworkState(state)
  }, [window.location])

  const handleClearAttachData = () => {
    replaceUrlState(RouterPathes.settings)
    setSocialNetworkParam(null)
    setSocialNetworkState('')
  }

  const handleAttachDiscord = useCallback(
    async (state: string, code: string, redirectUri: string) => {
      await attachDiscord({
        variables: {
          data: {
            state,
            code,
            redirectUri
          }
        },
        onCompleted: () => notifyOnSuccess(handleClearAttachData),
        onError: err => notifyOnError(err?.message, handleClearAttachData)
      })
    },
    [attachDiscord, socialNetWorkState]
  )

  const handleAttachTwitter = useCallback(
    async (state: string, code: string, redirectUri: string) => {
      await attachTwitter({
        variables: {
          data: {
            state,
            code,
            redirectUri
          }
        },
        onCompleted: () => notifyOnSuccess(handleClearAttachData),
        onError: err => notifyOnError(err?.message, handleClearAttachData)
      })
    },
    [attachTwitter, socialNetWorkState]
  )

  useEffect(() => {
    if (!socialNetworkParam) return

    notifyOnWarning()

    const code = query.get(SOCIAL_NETWORK_ATTACH_CODE_PARAM)

    if (!code) {
      notifyOnError()
      return
    }

    if (socialNetworkParam === SocialsOptions.discord) {
      handleAttachDiscord(
        socialNetWorkState,
        code,
        SOCIAL_OPTIONS_REDIRECT_URL.DISCORD
      )
    }

    if (socialNetworkParam === SocialsOptions.twitter) {
      handleAttachTwitter(
        socialNetWorkState,
        code,
        SOCIAL_OPTIONS_REDIRECT_URL.TWITTER
      )
    }
  }, [socialNetworkParam, handleAttachDiscord, handleAttachTwitter])

  useEffect(() => {
    isSocialNetworkAttachLoadingVar(
      (attachDiscordLoading || attachTwitterLoading) ?? false
    )
  }, [attachDiscordLoading, attachTwitterLoading])
}

const notifyOnWarning = () =>
  notificationStateVar({
    isOpen: true,
    type: 'warning',
    title: 'Loading...',
    description: "We're validating your request"
  })

const notifyOnSuccess = (clearAttachData: () => void) => {
  notificationStateVar({
    isOpen: true,
    type: 'success',
    title: 'Success',
    description: 'Social network was successfully attached'
  })

  clearAttachData()
  location.reload()
}

const notifyOnError = (message = '', clearAttachData?: () => void) => {
  notificationStateVar({
    isOpen: true,
    type: 'error',
    title: 'Oops..',
    description: message || 'Something went wrong..'
  })

  if (!clearAttachData) return

  clearAttachData()
}
