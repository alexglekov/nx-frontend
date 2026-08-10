import React from 'react'

export interface CardMode {
  key:
    | 'referrals'
    | 'rewards'
    | 'bullseye'
    | 'setup'
    | 'updown'
    | 'onevsone'
    | 'staking'
    | 'token'
    | 'airdrop'
    | 'meme-wars'
  title: string
  color: string
  logo: string
  path?: string
  backgroundElement: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined
    }
  >
  disabled?: boolean
  description?: string
}
