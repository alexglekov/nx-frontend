import { DataTestIDs, WalletStateStatus } from 'shared/constants'

const { connectWallet, signInToPlay, switchChain } = WalletStateStatus

interface Props {
  connectWalletTestId?: DataTestIDs
  signInToPlayTestId?: DataTestIDs
  switchChainTestId?: DataTestIDs
  actionTestId: DataTestIDs
}
export const getDataTestIdByWalletStateKey = (
  walletStateKey: WalletStateStatus | null,
  {
    connectWalletTestId,
    signInToPlayTestId,
    switchChainTestId,
    actionTestId
  }: Props
) => {
  if (walletStateKey === connectWallet) return connectWalletTestId

  if (walletStateKey === signInToPlay) return signInToPlayTestId

  if (walletStateKey === switchChain) return switchChainTestId

  return actionTestId
}
