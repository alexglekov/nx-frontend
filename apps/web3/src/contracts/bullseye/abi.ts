export const abi_old = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'AccessControlBadConfirmation',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: 'neededRole',
        type: 'bytes32'
      }
    ],
    name: 'AccessControlUnauthorizedAccount',
    type: 'error'
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
    name: 'BullseyeCancelled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address[3]',
        name: 'players',
        type: 'address[3]'
      },
      {
        indexed: false,
        internalType: 'uint256[3]',
        name: 'topIndexes',
        type: 'uint256[3]'
      },
      {
        indexed: false,
        internalType: 'int192',
        name: 'finalPrice',
        type: 'int192'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isExact',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      }
    ],
    name: 'BullseyeFinalized',
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
        internalType: 'uint32',
        name: 'assetPrice',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'depositAmount',
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
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'BullseyeNewPlayer',
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
        internalType: 'uint32',
        name: 'depositAmount',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'feedNumber',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      }
    ],
    name: 'BullseyeStart',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newExactRange',
        type: 'uint256'
      }
    ],
    name: 'NewExactRange',
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
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
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
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
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
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
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
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
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
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decodeData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'feedNumber',
            type: 'uint8'
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'stopPredictAt',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'depositAmount',
            type: 'uint256'
          }
        ],
        internalType: 'struct Bullseye.GameInfo',
        name: 'data',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'decodeGuess',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'player',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'assetPrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256'
          }
        ],
        internalType: 'struct Bullseye.GuessStruct',
        name: 'data',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'exactRange',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'exactRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'fee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'unverifiedReport',
        type: 'bytes'
      }
    ],
    name: 'finalizeGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      }
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getTotalPlayers',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'maxPlayers',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'assetPrice',
        type: 'uint32'
      }
    ],
    name: 'play',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'assetPrice',
        type: 'uint32'
      }
    ],
    name: 'playWithDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'assetPrice',
        type: 'uint32'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256'
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8'
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32'
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32'
          }
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
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'rate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'callerConfirmation',
        type: 'address'
      }
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newRange',
        type: 'uint256'
      }
    ],
    name: 'setExactRange',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newFee',
        type: 'uint256'
      }
    ],
    name: 'setFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newMax',
        type: 'uint256'
      }
    ],
    name: 'setMaxPlayers',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newTreasury',
        type: 'address'
      }
    ],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32'
      },
      {
        internalType: 'uint32',
        name: 'stopPredictAt',
        type: 'uint32'
      },
      {
        internalType: 'uint32',
        name: 'depositAmount',
        type: 'uint32'
      },
      {
        internalType: 'uint8',
        name: 'feedNumber',
        type: 'uint8'
      }
    ],
    name: 'startGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'treasury',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'twoPlayersExactRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'twoPlayersRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const

export const abi_new = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'AccessControlBadConfirmation',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: 'neededRole',
        type: 'bytes32'
      }
    ],
    name: 'AccessControlUnauthorizedAccount',
    type: 'error'
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
    name: 'BullseyeCancelled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address[3]',
        name: 'players',
        type: 'address[3]'
      },
      {
        indexed: false,
        internalType: 'uint256[3]',
        name: 'topIndexes',
        type: 'uint256[3]'
      },
      {
        indexed: false,
        internalType: 'int192',
        name: 'finalPrice',
        type: 'int192'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isExact',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      }
    ],
    name: 'BullseyeFinalized',
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
        name: 'assetPrice',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'depositAmount',
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
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rakeback',
        type: 'uint256'
      }
    ],
    name: 'BullseyeNewPlayer',
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
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'feedNumber',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'token',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      }
    ],
    name: 'BullseyeStart',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256[3]',
        name: 'rate',
        type: 'uint256[3]'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'playersCount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isExact',
        type: 'bool'
      }
    ],
    name: 'NewBullseyeRates',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newExactRange',
        type: 'uint256'
      }
    ],
    name: 'NewExactRange',
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
    name: 'NewMaxPlayers',
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
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
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
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
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
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
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
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'GAME_MASTER_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
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
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decodeData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'feedNumber',
            type: 'uint8'
          },
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'stopPredictAt',
            type: 'uint256'
          }
        ],
        internalType: 'struct Bullseye.GameInfo',
        name: 'data',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'depositAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'exactRange',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'fee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'unverifiedReport',
        type: 'bytes'
      }
    ],
    name: 'finalizeGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'playersCount',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'isExact',
        type: 'bool'
      }
    ],
    name: 'getRateIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      }
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getTotalPlayers',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'maxPlayers',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assetPrice',
        type: 'uint256'
      }
    ],
    name: 'play',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assetPrice',
        type: 'uint256'
      }
    ],
    name: 'playWithDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'assetPrice',
        type: 'uint256'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256'
          },
          {
            internalType: 'uint8',
            name: 'v',
            type: 'uint8'
          },
          {
            internalType: 'bytes32',
            name: 'r',
            type: 'bytes32'
          },
          {
            internalType: 'bytes32',
            name: 's',
            type: 'bytes32'
          }
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
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'playerGuessData',
    outputs: [
      {
        internalType: 'address',
        name: 'player',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'assetPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'rakeback',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'rates',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'callerConfirmation',
        type: 'address'
      }
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newRange',
        type: 'uint256'
      }
    ],
    name: 'setExactRange',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newFee',
        type: 'uint256'
      }
    ],
    name: 'setFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newMax',
        type: 'uint256'
      }
    ],
    name: 'setMaxPlayers',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256[3]',
        name: 'rate',
        type: 'uint256[3]'
      },
      {
        internalType: 'uint256',
        name: 'playersCount',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'isExact',
        type: 'bool'
      }
    ],
    name: 'setRate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newTreasury',
        type: 'address'
      }
    ],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32'
      },
      {
        internalType: 'uint32',
        name: 'stopPredictAt',
        type: 'uint32'
      },
      {
        internalType: 'uint256',
        name: 'newDepositAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint8',
        name: 'feedNumber',
        type: 'uint8'
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address'
      }
    ],
    name: 'startGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalRakeback',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'treasury',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const
