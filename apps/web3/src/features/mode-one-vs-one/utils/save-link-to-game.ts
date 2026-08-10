import { showNotificationToast } from 'shared/utils/notify'

export const copyGameLinkToClipboard = async (
  gameId: string,
  route: string
) => {
  const params = new URLSearchParams()
  params.append('gameId', gameId)

  const gameUrl = `${window.location.origin}${route}?${params.toString()}`

  await navigator?.clipboard?.writeText(gameUrl)

  showNotificationToast({
    title: 'Success',
    description: `Link to the game was copied to your clipboard`,
    type: 'success'
  })
}
