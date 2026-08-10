/* eslint-disable max-lines */
import { Asset } from '__generated__/graphql'
import { zeroAddress } from 'viem'
import { getCreateSetupVariables } from './get-create-setup-variables'

describe('getCreateSetupVariables', () => {
  it('should return the correct variables when all fields are defined', () => {
    const formValues = {
      setupAsset: 'BTC',
      setupPosition: 'long' as const,
      setupStopLoss: '10',
      setupTakeProfit: '20',
      setupTimeframe: '900'
    }

    const selectedAsset = {
      __typename: 'Asset',
      id: 'BTC',
      name: 'Bitcoin',
      precision: 2,
      feedId:
        '0x00037da06d56d083fe599397a4769a042d63aa73dc4ef57709d31e9971a5b439',
      price: {
        __typename: 'AssetPrice',
        formattedValue: 67540.83863374709,
        payload: zeroAddress
      },
      last7days: [
        {
          __typename: 'AssetPrice',
          formattedValue: 68020.5503474569,
          timestamp: 1716480002000
        },
        {
          __typename: 'AssetPrice',
          formattedValue: 68305.57717321048,
          timestamp: 1716566402000
        },
        {
          __typename: 'AssetPrice',
          formattedValue: 68935.79030595269,
          timestamp: 1716652802000
        },
        {
          __typename: 'AssetPrice',
          formattedValue: 68820.13820077639,
          timestamp: 1716739202000
        },
        {
          __typename: 'AssetPrice',
          formattedValue: 70318.628,
          timestamp: 1716825602000
        },
        {
          __typename: 'AssetPrice',
          formattedValue: 68309.16831532109,
          timestamp: 1716912002000
        }
      ],
      price24h: {
        __typename: 'AssetPrice',
        formattedValue: 67733.65423024684,
        timestamp: 1716915345000
      }
    }

    const expected = {
      feedId:
        '0x00037da06d56d083fe599397a4769a042d63aa73dc4ef57709d31e9971a5b439',
      isLong: true,
      stopLossPrice: '10',
      takeProfitPrice: '20',
      endTime: Math.round(Date.now() / 1000) + 1800
    }

    expect(
      getCreateSetupVariables(
        formValues,
        selectedAsset as Asset,
        selectedAsset.price.payload
      )
    ).toEqual(expected)
  })

  it('should return the correct variables when setupPosition is short', () => {
    const formValues = {
      setupAsset: 'BTC',
      setupPosition: 'short' as const,
      setupStopLoss: '10',
      setupTakeProfit: '20',
      setupTimeframe: '900'
    }

    const selectedAsset = {
      __typename: 'Asset',
      id: 'BTC',
      name: 'Bitcoin',
      precision: 2,
      feedId:
        '0x00037da06d56d083fe599397a4769a042d63aa73dc4ef57709d31e9971a5b439',
      price: {
        __typename: 'AssetPrice',
        formattedValue: 67540.83863374709,
        payload: zeroAddress
      },
      last7days: [
        {
          __typename: 'AssetPrice',
          formattedValue: 68020.5503474569,
          timestamp: 1716480002000
        },
        {
          __typename: 'AssetPrice',
          formattedValue: 68305.57717321048,
          timestamp: 1716566402000
        },
        {
          __typename: 'AssetPrice',
          formattedValue: 68935.79030595269,
          timestamp: 1716652802000
        },
        {
          __typename: 'AssetPrice',
          formattedValue: 68820.13820077639,
          timestamp: 1716739202000
        },
        {
          __typename: 'AssetPrice',
          formattedValue: 70318.628,
          timestamp: 1716825602000
        },
        {
          __typename: 'AssetPrice',
          formattedValue: 68309.16831532109,
          timestamp: 1716912002000
        }
      ],
      price24h: {
        __typename: 'AssetPrice',
        formattedValue: 67733.65423024684,
        timestamp: 1716915345000
      }
    }

    const expected = {
      feedId:
        '0x00037da06d56d083fe599397a4769a042d63aa73dc4ef57709d31e9971a5b439',
      isLong: false,
      stopLossPrice: '10',
      takeProfitPrice: '20',
      endTime: Math.round(Date.now() / 1000) + 1800
    }
    expect(
      getCreateSetupVariables(
        formValues,
        selectedAsset as Asset,
        selectedAsset.price.payload
      )
    ).toEqual(expected)
  })
})
