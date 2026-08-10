/* eslint-disable max-lines */

import { FunctionComponent, SVGProps } from 'react'
import {
  LevelTierFive,
  LevelTierFour,
  LevelTierOne,
  LevelTierThree,
  LevelTierTwo
} from 'shared/icons/level-icons'

export const MAP_ACCOUNT_LEVEL_ICON: {
  [key: number]: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>
} = {
  1: LevelTierOne,
  2: LevelTierTwo,
  3: LevelTierThree,
  4: LevelTierFour,
  5: LevelTierFive
}

export const MAP_TIER_STATS = {
  1: [
    {
      level: 1,
      volume: 0,
      token: 0
    },
    {
      level: 2,
      volume: 200,
      token: 88
    },
    {
      level: 3,
      volume: 400,
      token: 177
    },
    {
      level: 4,
      volume: 600,
      token: 265
    },
    {
      level: 5,
      volume: 800,
      token: 354
    }
  ],
  2: [
    {
      level: 1,
      volume: 1000,
      token: 442
    },
    {
      level: 2,
      volume: 2500,
      token: 1105
    },
    {
      level: 3,
      volume: 4500,
      token: 1989
    },
    {
      level: 4,
      volume: 6500,
      token: 2873
    },
    {
      level: 5,
      volume: 8500,
      token: 3757
    }
  ],
  3: [
    {
      level: 1,
      volume: 10000,
      token: 4420
    },
    {
      level: 2,
      volume: 20000,
      token: 8840
    },
    {
      level: 3,
      volume: 40000,
      token: 17680
    },
    {
      level: 4,
      volume: 60000,
      token: 26519
    },
    {
      level: 5,
      volume: 80000,
      token: 35359
    }
  ],
  4: [
    {
      level: 1,
      volume: 100000,
      token: 44199
    },
    {
      level: 2,
      volume: 250000,
      token: 110497
    },
    {
      level: 3,
      volume: 400000,
      token: 176796
    },
    {
      level: 4,
      volume: 550000,
      token: 243094
    },
    {
      level: 5,
      volume: 750000,
      token: 331492
    }
  ],
  5: [
    {
      level: 1,
      volume: 1000000,
      token: 441989
    },
    {
      level: 2,
      volume: 1500000,
      token: 662983
    },
    {
      level: 3,
      volume: 2100000,
      token: 928177
    },
    {
      level: 4,
      volume: 2900000,
      token: 1281768
    },
    {
      level: 5,
      volume: 4000000,
      token: 1767956
    }
  ]
}
