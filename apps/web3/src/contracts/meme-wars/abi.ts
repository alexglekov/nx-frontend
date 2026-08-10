export const abi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [], name: 'AccessControlBadConfirmation', type: 'error' },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'bytes32', name: 'neededRole', type: 'bytes32' }
    ],
    name: 'AccessControlUnauthorizedAccount',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newMinAssetAmount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newMaxAssetAmount',
        type: 'uint256'
      }
    ],
    name: 'NewAssetCap',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newFee',
        type: 'uint256'
      }
    ],
    name: 'NewFee',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newMax',
        type: 'uint256'
      }
    ],
    name: 'NewMaxPlayersAmount',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newTreasury',
        type: 'address'
      }
    ],
    name: 'NewTreasury',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      }
    ],
    name: 'RaceCancelled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'stopPredictAt',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'uint8[]',
        name: 'feedNumbers',
        type: 'uint8[]'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minDepositAmount',
        type: 'uint256'
      }
    ],
    name: 'RaceCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      }
    ],
    name: 'RaceDraw',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'int192[]',
        name: 'finalPrice',
        type: 'int192[]'
      },
      {
        indexed: false,
        internalType: 'int256[]',
        name: 'priceDiffs',
        type: 'int256[]'
      },
      {
        indexed: false,
        internalType: 'uint32[]',
        name: 'priceTimestamps',
        type: 'uint32[]'
      },
      {
        indexed: false,
        internalType: 'uint8[]',
        name: 'feedNumbers',
        type: 'uint8[]'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'wonFeedNumber',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      }
    ],
    name: 'RaceFinalized',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'player',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'depositId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'feedNumberIndex',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rakeback',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address'
      }
    ],
    name: 'RaceNewPlayer',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'int192[]',
        name: 'startingPrices',
        type: 'int192[]'
      },
      {
        indexed: false,
        internalType: 'uint32[]',
        name: 'priceTimestamps',
        type: 'uint32[]'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      }
    ],
    name: 'RaceStarted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32'
      }
    ],
    name: 'RoleAdminChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleGranted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleRevoked',
    type: 'event'
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'GAME_MASTER_ROLE',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    name: 'assetData',
    outputs: [
      { internalType: 'uint256', name: 'totalDeposits', type: 'uint256' },
      { internalType: 'uint256', name: 'totalRakeback', type: 'uint256' },
      { internalType: 'int192', name: 'startingPrice', type: 'int192' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'assetFeedNumber',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'closeGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'currentGameId',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decodeData',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'startTime', type: 'uint256' },
          { internalType: 'uint256', name: 'endTime', type: 'uint256' },
          { internalType: 'uint256', name: 'stopPredictAt', type: 'uint256' },
          { internalType: 'uint256', name: 'depositId', type: 'uint256' }
        ],
        internalType: 'struct Race.GameInfo',
        name: 'data',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint8', name: '', type: 'uint8' },
      { internalType: 'address', name: '', type: 'address' }
    ],
    name: 'depositAmounts',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'fee',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes[]', name: 'unverifiedReports', type: 'bytes[]' }
    ],
    name: 'finalizeGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getGameData',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'startTime', type: 'uint256' },
          { internalType: 'uint256', name: 'endTime', type: 'uint256' },
          { internalType: 'uint256', name: 'stopPredictAt', type: 'uint256' },
          { internalType: 'uint256', name: 'depositId', type: 'uint256' }
        ],
        internalType: 'struct Race.GameInfo',
        name: '',
        type: 'tuple'
      },
      { internalType: 'bytes32', name: '', type: 'bytes32' },
      { internalType: 'uint8[]', name: '', type: 'uint8[]' },
      { internalType: 'uint256[]', name: '', type: 'uint256[]' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' }
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'hasEnoughPlayers',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' }
    ],
    name: 'hasRole',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'maxAssetAmount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'maxPlayers',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'minAssetAmount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'minDepositAmount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'depositAmount', type: 'uint256' },
      { internalType: 'uint8', name: 'feedNumberIndex', type: 'uint8' }
    ],
    name: 'play',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'depositAmount', type: 'uint256' },
      { internalType: 'uint8', name: 'feedNumberIndex', type: 'uint8' }
    ],
    name: 'playWithDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'depositAmount', type: 'uint256' },
      { internalType: 'uint8', name: 'feedNumberIndex', type: 'uint8' },
      {
        components: [
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
          { internalType: 'uint8', name: 'v', type: 'uint8' },
          { internalType: 'bytes32', name: 'r', type: 'bytes32' },
          { internalType: 'bytes32', name: 's', type: 'bytes32' }
        ],
        internalType: 'struct ITreasury.PermitData',
        name: 'permitData',
        type: 'tuple'
      }
    ],
    name: 'playWithPermit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'callerConfirmation', type: 'address' }
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes32', name: 'role', type: 'bytes32' },
      { internalType: 'address', name: 'account', type: 'address' }
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'newMinAssetAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'newMaxAssetAmount', type: 'uint256' }
    ],
    name: 'setAssetAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'newFee', type: 'uint256' }],
    name: 'setFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'newMax', type: 'uint256' }],
    name: 'setMaxPlayers',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes[]', name: 'unverifiedReports', type: 'bytes[]' }
    ],
    name: 'setStartingPrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'newTreasury', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint32', name: 'endTime', type: 'uint32' },
      { internalType: 'uint32', name: 'stopPredictAt', type: 'uint32' },
      { internalType: 'uint256', name: 'depositAmount', type: 'uint256' },
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint8[]', name: 'feedNumbers', type: 'uint8[]' }
    ],
    name: 'startGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'treasury',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const
