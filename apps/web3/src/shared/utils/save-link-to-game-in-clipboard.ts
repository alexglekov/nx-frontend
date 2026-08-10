import { RouterPathes } from 'shared/constants'
import { showNotificationToast } from './notify'

export async function saveLinkToGameInClipboard(
  gameId: string,
  route: RouterPathes
) {
  const gameUrl = getGameLink(route, gameId)

  await navigator.clipboard.writeText(gameUrl)

  showNotificationToast({
    title: 'Url copied',
    description: `Link to the game was copied to your clipboard`,
    type: 'success'
  })
}

export const getGameLink = (route: RouterPathes, gameId: string) => {
  const params = new URLSearchParams()
  params.append('gameId', gameId)

  return `${window.location.origin}${route}?${params.toString()}`
}
