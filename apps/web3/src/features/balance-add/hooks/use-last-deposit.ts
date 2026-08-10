import { useEffect, useState } from 'react'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'
import {
  CoinAddressType,
  CreateCoinAddressMutation,
  ListCoinAddressesQuery
} from '__generated__/graphql'
import { CREATE_COIN_ADDRESS } from 'api/payments/create-address'
import { GET_COIN_ADDRESSES } from 'api/payments/list-deposits'
import { notifyOnCreationError } from 'shared/utils/notify-on-error'
import { coinDepositVar } from '../store/coin-store'

export function useLastDeposit() {
  const [coinAddress, setCoinAddress] = useState<CoinAddressType>()
  const coin = useReactiveVar(coinDepositVar)

  const {
    data: coinAddressList,
    loading: loadingList,
    error: errorList
  } = useQuery<ListCoinAddressesQuery>(GET_COIN_ADDRESSES)
  const [
    commitCreateAddress,
    { data: createdAddress, loading: loadingCreate, error: errorCreate }
  ] = useMutation<CreateCoinAddressMutation>(CREATE_COIN_ADDRESS)

  useEffect(() => {
    if (!coinAddressList?.listCoinAddresses) return

    const coinList = coinAddressList.listCoinAddresses
    const foundCoin = coinList.find(cn => cn.currency === coin?.name)

    if (foundCoin) {
      setCoinAddress(foundCoin as CoinAddressType)
    } else {
      const mutationOptions = {
        variables: { data: { currency: coin?.name } },
        onError: notifyOnCreationError
      }

      commitCreateAddress(mutationOptions)
    }
  }, [coin, coinAddressList, setCoinAddress, commitCreateAddress])

  useEffect(() => {
    if (!createdAddress?.createCoinAddress) return

    const address = createdAddress.createCoinAddress
    setCoinAddress(address)
  }, [createdAddress])

  return {
    coinAddress,
    error: Boolean(errorList && errorCreate) || false,
    loading: loadingList && loadingCreate
  }
}
