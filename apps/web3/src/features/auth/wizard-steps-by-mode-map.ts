import { WizardFlowType, WizardMode, WizardStep } from './types'

const { signIn, signUp, connectWallet } = WizardMode
const { none, web3, web3Nft } = WizardFlowType
const { name, walletSelect, done, init, nftCheck, referral } = WizardStep

/**
 * @description Map of Auth steps
 * Inspect in the DrawIo Diagram: {@link file://./auth-flow.drawio}
 */
export const WIZARD_STEPS_BY_MODE_MAP: Record<
  WizardMode,
  Record<WizardFlowType, readonly WizardStep[] | null> | null
> = {
  [signUp]: {
    [none]: [init], // NOTE: initial steps
    [web3]: [walletSelect, name, done],
    [web3Nft]: [nftCheck, name, done]
  },
  [signIn]: {
    [none]: [init, done],
    [web3]: null,
    [web3Nft]: null
  },
  [connectWallet]: {
    [none]: [init, done],
    [web3]: [walletSelect, name, done],
    [web3Nft]: null
  }
} as const
