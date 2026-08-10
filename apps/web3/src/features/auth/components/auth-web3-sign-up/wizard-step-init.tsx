import { useCallback } from 'react'
import { Button, Flex, Grid } from '@radix-ui/themes'
import { featureFlags } from 'app/app-feature-flags'
import { DataTestIDs } from 'shared/constants'
import xyroNftsPath from 'shared/images/xyro-nfts.webp'
import { RadixText } from 'shared/ui'
import { OrSeparator } from 'shared/ui/or-separator'
import { wizardFlowTypeVar, wizardStepVar } from '../../store/wizard.store'
import { WizardFlowType, WizardStep } from '../../types'
import { AuthDialogFooter } from '../auth-dialog-footer'
import { AuthDialogHeader } from '../auth-dialog-header'
import styles from '../../sign-up.module.scss'

const { auth } = featureFlags
const { isReferralCodeFlowAllowed } = auth

export const WizardStepInit = () => {
  const handleNftChoice = useCallback(() => {
    wizardFlowTypeVar(WizardFlowType.web3Nft)
    wizardStepVar(WizardStep.nftCheck)
  }, [])

  const handleNoNFTChoice = useCallback(() => {
    wizardFlowTypeVar(WizardFlowType.web3)
    wizardStepVar(WizardStep.walletSelect)
  }, [])

  const handleReferralChoice = useCallback(() => {
    wizardFlowTypeVar(WizardFlowType.web3)
    wizardStepVar(WizardStep.referral)
  }, [])

  const handleSecondaryGetStarted =
    isReferralCodeFlowAllowed ? handleReferralChoice : handleNoNFTChoice

  const secondaryGetStartedText =
    isReferralCodeFlowAllowed ? 'USE A REFERRAL CODE' : 'SIGN UP WITHOUT NFT'

  return (
    <Grid
      className={styles.dialogSignUpInitStep}
      position='relative'
    >
      <Flex
        direction={'column'}
        width='auto'
        justify='center'
        align='center'
        px='9'
        pt='2'
        pb='7'
      >
        <Flex
          width='100%'
          justify='center'
          mt='9'
        >
          <img
            src={xyroNftsPath}
            alt='beta welcome message banner'
            width={250}
          />
        </Flex>

        <AuthDialogHeader withAuthMode={false} />

        <Button
          onClick={handleNftChoice}
          size='4'
          color='gray'
          variant='outline'
          radius='full'
          className={styles.initAuthButton}
          mt='9'
        >
          <RadixText weight={'bold'}>YES, I HAVE A WHITELIST NFT</RadixText>
        </Button>

        <OrSeparator
          mt='7'
          mb='6'
        />

        <Button
          onClick={handleSecondaryGetStarted}
          size='4'
          color='gray'
          variant='ghost'
          mx='4'
          mt='2'
          mb='9'
          highContrast
          data-testid={DataTestIDs.buttonUseRefferalCode}
        >
          <RadixText weight={'bold'}>{secondaryGetStartedText}</RadixText>
        </Button>

        <AuthDialogFooter
          actonText='Log in'
          questionText='Already have an account?'
        />
      </Flex>
    </Grid>
  )
}
