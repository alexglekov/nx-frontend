/* eslint-disable max-statements */
import { useLazyQuery } from '@apollo/client'
import { GET_DISCORD_LINK_URI } from 'api/user-settings/get-discord-link-uri'
import { GET_TWITTER_LINK_URI } from 'api/user-settings/get-twitter-link-uri'
import { notifyOnUnknownError } from 'shared/utils/notify-on-error'
import { SOCIAL_OPTIONS_REDIRECT_URL, SocialsOptions } from '../constants'

export const useConncetSocialNetwork = () => {
  const [getDiscordAuthUri, { loading: getDiscordLinkLoading }] = useLazyQuery(
    GET_DISCORD_LINK_URI,
    {
      variables: {
        data: {
          redirectUri: SOCIAL_OPTIONS_REDIRECT_URL.DISCORD
        }
      },
      onError: notifyOnUnknownError
    }
  )

  const [getTwitterAuthUri, { loading: getTwitterLinkLoading }] = useLazyQuery(
    GET_TWITTER_LINK_URI,
    {
      variables: {
        data: {
          redirectUri: SOCIAL_OPTIONS_REDIRECT_URL.TWITTER
        }
      },
      onError: notifyOnUnknownError
    }
  )

  const handleGetDiscordUri = async () => {
    const redirectUriData = await getDiscordAuthUri()

    const discordRedirectUrl = redirectUriData.data?.getDiscordAuthUri

    if (!discordRedirectUrl) return

    window.location.href = discordRedirectUrl
  }

  const handleGetTwitterUri = async () => {
    const redirectUriData = await getTwitterAuthUri()

    const twitterRedirectUrl = redirectUriData.data?.getTwitterAuthUri

    if (!twitterRedirectUrl) return

    window.location.href = twitterRedirectUrl
  }

  const handleConnectTelegram = () => {
    // TODO: Add telegram when server will fix all issues
  }

  const verifySocials = {
    [SocialsOptions.discord]: {
      getRedirectUri: handleGetDiscordUri
    },
    [SocialsOptions.twitter]: {
      getRedirectUri: handleGetTwitterUri
    },
    [SocialsOptions.telegram]: {
      connect: handleConnectTelegram
    },
    [SocialsOptions.metamask]: {
      connect: () => null
    }
  }

  return {
    verifySocials,
    loading: getDiscordLinkLoading || getTwitterLinkLoading
  }
}
