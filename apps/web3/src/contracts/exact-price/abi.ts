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
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'opponent',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'opponentPrice',
        type: 'uint32'
      }
    ],
    name: 'ExactPriceAccepted',
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
    name: 'ExactPriceCancelled',
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
        name: 'opponent',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'startTime',
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
        internalType: 'address',
        name: 'initiator',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'initiatorPrice',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'depositAmount',
        type: 'uint32'
      }
    ],
    name: 'ExactPriceCreated',
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
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'winnerGuessPrice',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'loserGuessPrice',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'int192',
        name: 'finalPrice',
        type: 'int192'
      },
      {
        indexed: false,
        internalType: 'enum OneVsOneExactPrice.Status',
        name: 'gameStatus',
        type: 'uint8'
      }
    ],
    name: 'ExactPriceFinalized',
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
    inputs: [
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      },
      {
        internalType: 'uint32',
        name: 'opponentPrice',
        type: 'uint32'
      }
    ],
    name: 'acceptGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      },
      {
        internalType: 'uint32',
        name: 'opponentPrice',
        type: 'uint32'
      }
    ],
    name: 'acceptGameWithDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      },
      {
        internalType: 'uint32',
        name: 'opponentPrice',
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
    name: 'acceptGameWithPermit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newMaxDuration',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'newMinDuration',
        type: 'uint256'
      }
    ],
    name: 'changeGameDuration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      }
    ],
    name: 'closeGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'feedNumber',
        type: 'uint8'
      },
      {
        internalType: 'address',
        name: 'opponent',
        type: 'address'
      },
      {
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32'
      },
      {
        internalType: 'uint32',
        name: 'initiatorPrice',
        type: 'uint32'
      },
      {
        internalType: 'uint16',
        name: 'depositAmount',
        type: 'uint16'
      }
    ],
    name: 'createGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'feedNumber',
        type: 'uint8'
      },
      {
        internalType: 'address',
        name: 'opponent',
        type: 'address'
      },
      {
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32'
      },
      {
        internalType: 'uint32',
        name: 'initiatorPrice',
        type: 'uint32'
      },
      {
        internalType: 'uint16',
        name: 'depositAmount',
        type: 'uint16'
      }
    ],
    name: 'createGameWithDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'feedNumber',
        type: 'uint8'
      },
      {
        internalType: 'address',
        name: 'opponent',
        type: 'address'
      },
      {
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32'
      },
      {
        internalType: 'uint32',
        name: 'initiatorPrice',
        type: 'uint32'
      },
      {
        internalType: 'uint16',
        name: 'depositAmount',
        type: 'uint16'
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
    name: 'createGameWithPermit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      }
    ],
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
            internalType: 'address',
            name: 'initiator',
            type: 'address'
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
            internalType: 'address',
            name: 'opponent',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'depositAmount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'initiatorPrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'opponentPrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'finalPrice',
            type: 'uint256'
          },
          {
            internalType: 'enum OneVsOneExactPrice.Status',
            name: 'gameStatus',
            type: 'uint8'
          }
        ],
        internalType: 'struct OneVsOneExactPrice.GameInfo',
        name: 'gameData',
        type: 'tuple'
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
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      },
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
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'games',
    outputs: [
      {
        internalType: 'uint256',
        name: 'packedData',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'packedData2',
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
    inputs: [
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      }
    ],
    name: 'liquidateGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'maxDuration',
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
    name: 'minDuration',
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
    name: 'refundFee',
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
        name: 'newRefundFee',
        type: 'uint256'
      }
    ],
    name: 'setRefundFee',
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
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'opponent',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'opponentPrice',
        type: 'uint256'
      }
    ],
    name: 'ExactPriceAccepted',
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
    name: 'ExactPriceCancelled',
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
        name: 'opponent',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'startTime',
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
        internalType: 'address',
        name: 'initiator',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'initiatorPrice',
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
        internalType: 'address',
        name: 'gameToken',
        type: 'address'
      }
    ],
    name: 'ExactPriceCreated',
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
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'winnerGuessPrice',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'loserGuessPrice',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'int192',
        name: 'finalPrice',
        type: 'int192'
      },
      {
        indexed: false,
        internalType: 'enum OneVsOneExactPrice.Status',
        name: 'gameStatus',
        type: 'uint8'
      }
    ],
    name: 'ExactPriceFinalized',
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
        name: 'newMaxDuration',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newMinDuration',
        type: 'uint256'
      }
    ],
    name: 'NewGameDuration',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newRefundFee',
        type: 'uint256'
      }
    ],
    name: 'NewRefundFee',
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
        internalType: 'bool',
        name: 'isActive',
        type: 'bool'
      }
    ],
    name: 'OneVsOneToggle',
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
    inputs: [
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: 'opponentPrice',
        type: 'uint256'
      }
    ],
    name: 'acceptGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: 'opponentPrice',
        type: 'uint256'
      }
    ],
    name: 'acceptGameWithDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: 'opponentPrice',
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
    name: 'acceptGameWithPermit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newMaxDuration',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'newMinDuration',
        type: 'uint256'
      }
    ],
    name: 'changeGameDuration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      }
    ],
    name: 'closeGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'feedNumber',
        type: 'uint8'
      },
      {
        internalType: 'address',
        name: 'opponent',
        type: 'address'
      },
      {
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32'
      },
      {
        internalType: 'uint256',
        name: 'initiatorPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address'
      }
    ],
    name: 'createGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'feedNumber',
        type: 'uint8'
      },
      {
        internalType: 'address',
        name: 'opponent',
        type: 'address'
      },
      {
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32'
      },
      {
        internalType: 'uint256',
        name: 'initiatorPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address'
      }
    ],
    name: 'createGameWithDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'feedNumber',
        type: 'uint8'
      },
      {
        internalType: 'address',
        name: 'opponent',
        type: 'address'
      },
      {
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32'
      },
      {
        internalType: 'uint256',
        name: 'initiatorPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'token',
        type: 'address'
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
    name: 'createGameWithPermit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      }
    ],
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
            internalType: 'address',
            name: 'initiator',
            type: 'address'
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
            internalType: 'address',
            name: 'opponent',
            type: 'address'
          },
          {
            internalType: 'enum OneVsOneExactPrice.Status',
            name: 'gameStatus',
            type: 'uint8'
          }
        ],
        internalType: 'struct OneVsOneExactPrice.GameInfo',
        name: 'gameData',
        type: 'tuple'
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
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      },
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
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'games',
    outputs: [
      {
        internalType: 'uint256',
        name: 'packedData',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'packedData2',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'initiatorPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'opponentPrice',
        type: 'uint256'
      },
      {
        internalType: 'int192',
        name: 'finalPrice',
        type: 'int192'
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
    name: 'isActive',
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
    inputs: [
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
      }
    ],
    name: 'liquidateGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'maxDuration',
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
    name: 'minDuration',
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
    name: 'refundFee',
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
        name: 'newRefundFee',
        type: 'uint256'
      }
    ],
    name: 'setRefundFee',
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
    name: 'toggleActive',
    outputs: [],
    stateMutability: 'nonpayable',
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
