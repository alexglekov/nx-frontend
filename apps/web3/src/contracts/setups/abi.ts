export const abi_old = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newTreasury',
        type: 'address'
      }
    ],
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
        name: 'initiator',
        type: 'address'
      }
    ],
    name: 'SetupCancelled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'gameId',
            type: 'bytes32'
          },
          {
            internalType: 'uint8',
            name: 'feedNumber',
            type: 'uint8'
          },
          {
            internalType: 'uint32',
            name: 'startTime',
            type: 'uint32'
          },
          {
            internalType: 'uint32',
            name: 'endTime',
            type: 'uint32'
          },
          {
            internalType: 'int192',
            name: 'startingPrice',
            type: 'int192'
          },
          {
            internalType: 'uint32',
            name: 'takeProfitPrice',
            type: 'uint32'
          },
          {
            internalType: 'uint32',
            name: 'stopLossPrice',
            type: 'uint32'
          },
          {
            internalType: 'bool',
            name: 'isLong',
            type: 'bool'
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address'
          }
        ],
        indexed: false,
        internalType: 'struct Setup.CreateSetup',
        name: 'data',
        type: 'tuple'
      }
    ],
    name: 'SetupCreated',
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
        internalType: 'bool',
        name: 'takeProfitWon',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'int192',
        name: 'finalPrice',
        type: 'int192'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'initiatorFee',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rate',
        type: 'uint256'
      }
    ],
    name: 'SetupFinalized',
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
    name: 'SetupGameID',
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
        internalType: 'bool',
        name: 'isLong',
        type: 'bool'
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
        name: 'player',
        type: 'address'
      }
    ],
    name: 'SetupNewPlayer',
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
        internalType: 'address',
        name: 'player',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256'
      }
    ],
    name: 'SetupRetrieved',
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
        internalType: 'bool',
        name: 'isLong',
        type: 'bool'
      },
      {
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32'
      },
      {
        internalType: 'uint32',
        name: 'takeProfitPrice',
        type: 'uint32'
      },
      {
        internalType: 'uint32',
        name: 'stopLossPrice',
        type: 'uint32'
      },
      {
        internalType: 'uint8',
        name: 'feedNumber',
        type: 'uint8'
      },
      {
        internalType: 'bytes',
        name: 'unverifiedReport',
        type: 'bytes'
      }
    ],
    name: 'createSetup',
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
            internalType: 'address',
            name: 'initiator',
            type: 'address'
          },
          {
            internalType: 'uint8',
            name: 'feedNumber',
            type: 'uint8'
          },
          {
            internalType: 'bool',
            name: 'isLong',
            type: 'bool'
          },
          {
            internalType: 'enum Setup.Status',
            name: 'gameStatus',
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
            name: 'totalDepositsSL',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'totalDepositsTP',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'SLplayers',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'TPplayers',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'takeProfitPrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'stopLossPrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'startringPrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'finalPrice',
            type: 'uint256'
          }
        ],
        internalType: 'struct Setup.GameInfo',
        name: 'gameData',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'depositAmounts',
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
      },
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
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
        name: 'finalRate',
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
      }
    ],
    name: 'getRefund',
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
    inputs: [
      {
        internalType: 'bool',
        name: 'isLong',
        type: 'bool'
      },
      {
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
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
        internalType: 'bool',
        name: 'isLong',
        type: 'bool'
      },
      {
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
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
        internalType: 'bool',
        name: 'isLong',
        type: 'bool'
      },
      {
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
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
        name: 'gameId',
        type: 'bytes32'
      }
    ],
    name: 'retrieveRewards',
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
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'withdrawStatus',
    outputs: [
      {
        internalType: 'enum Setup.UserStatus',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const

export const abi_new = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newTreasury',
        type: 'address'
      }
    ],
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
        name: 'newFee',
        type: 'uint256'
      }
    ],
    name: 'NewInitiatorFee',
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
        name: 'initiator',
        type: 'address'
      }
    ],
    name: 'SetupCancelled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'gameId',
            type: 'bytes32'
          },
          {
            internalType: 'uint8',
            name: 'feedNumber',
            type: 'uint8'
          },
          {
            internalType: 'uint32',
            name: 'startTime',
            type: 'uint32'
          },
          {
            internalType: 'uint32',
            name: 'endTime',
            type: 'uint32'
          },
          {
            internalType: 'int192',
            name: 'startingPrice',
            type: 'int192'
          },
          {
            internalType: 'uint256',
            name: 'takeProfitPrice',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'stopLossPrice',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'isLong',
            type: 'bool'
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'token',
            type: 'address'
          }
        ],
        indexed: false,
        internalType: 'struct Setup.CreateSetup',
        name: 'data',
        type: 'tuple'
      }
    ],
    name: 'SetupCreated',
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
        internalType: 'bool',
        name: 'takeProfitWon',
        type: 'bool'
      },
      {
        indexed: false,
        internalType: 'int192',
        name: 'finalPrice',
        type: 'int192'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'initiatorFee',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rate',
        type: 'uint256'
      }
    ],
    name: 'SetupFinalized',
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
    name: 'SetupGameID',
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
        internalType: 'bool',
        name: 'isLong',
        type: 'bool'
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
        name: 'player',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rakeback',
        type: 'uint256'
      }
    ],
    name: 'SetupNewPlayer',
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
        internalType: 'address',
        name: 'player',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256'
      }
    ],
    name: 'SetupRetrieved',
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
    name: 'SetupToggle',
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
    name: 'FEE_DENOMINATOR',
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
        internalType: 'bool',
        name: 'isLong',
        type: 'bool'
      },
      {
        internalType: 'uint32',
        name: 'endTime',
        type: 'uint32'
      },
      {
        internalType: 'uint256',
        name: 'takeProfitPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'stopLossPrice',
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
      },
      {
        internalType: 'bytes',
        name: 'unverifiedReport',
        type: 'bytes'
      }
    ],
    name: 'createSetup',
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
            internalType: 'address',
            name: 'initiator',
            type: 'address'
          },
          {
            internalType: 'uint8',
            name: 'feedNumber',
            type: 'uint8'
          },
          {
            internalType: 'bool',
            name: 'isLong',
            type: 'bool'
          },
          {
            internalType: 'enum Setup.Status',
            name: 'gameStatus',
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
            name: 'SLplayers',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'TPplayers',
            type: 'uint256'
          }
        ],
        internalType: 'struct Setup.GameInfo',
        name: 'gameData',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'depositAmounts',
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
      },
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
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
        name: 'totalDepositsSL',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'totalDepositsTP',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'totalRakebackSL',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'totalRakebackTP',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'takeProfitPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'stopLossPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'startingPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'finalPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'finalRate',
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
      }
    ],
    name: 'getRefund',
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
    name: 'initiatorFee',
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
    inputs: [
      {
        internalType: 'bool',
        name: 'isLong',
        type: 'bool'
      },
      {
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
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
        internalType: 'bool',
        name: 'isLong',
        type: 'bool'
      },
      {
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
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
        internalType: 'bool',
        name: 'isLong',
        type: 'bool'
      },
      {
        internalType: 'uint256',
        name: 'depositAmount',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: 'gameId',
        type: 'bytes32'
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
        internalType: 'bytes32[]',
        name: 'gameIds',
        type: 'bytes32[]'
      }
    ],
    name: 'retrieveRewards',
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
        name: 'newFee',
        type: 'uint256'
      }
    ],
    name: 'setInitiatorFee',
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
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'withdrawStatus',
    outputs: [
      {
        internalType: 'enum Setup.UserStatus',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const
