import { CreateConnectorFn } from 'wagmi'

export enum WizardMode {
  signIn = 'signIn',
  signUp = 'signUp',
  connectWallet = 'connectWallet'
}

export enum WizardStep {
  init = 'init',
  referral = 'referral',
  nftCheck = 'nftCheck',
  walletSelect = 'walletSelect',
  name = 'name',
  done = 'done'
}

/** @description enum for auth flows (e.g. discord or twitter auth) */
export enum WizardFlowType {
  none = 'none',
  web3 = 'web3',
  web3Nft = 'web3Nft'
}

export interface ConnectorProvider {
  id: string
  name: string
  connector: CreateConnectorFn
}
