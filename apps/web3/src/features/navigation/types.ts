export type NavigationRouteType =
  | 'home'
  | 'rewards'
  | 'referrals'
  | 'buyback'
  | 'games'
  | 'more'
  | ModeType

export type ModeType =
  | 'setups'
  | 'bulls-eye'
  | 'one-vs-one'
  | 'up-down'
  | 'rewards'
  | 'rewards-extra'
  | 'meme-wars'

export type NavigationMobileModeType = ModeType | 'token' | 'about'
