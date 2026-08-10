import { STAND } from 'app/constants'
import { Stand } from 'app/types'

export const pushGtmEvent = <T extends Record<string, unknown>>(
  event: string,
  data?: T
) => {
  if (STAND !== Stand.mainnet) return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...data })
}
