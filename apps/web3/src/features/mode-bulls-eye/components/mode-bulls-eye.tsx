import { Flex, Grid } from '@radix-ui/themes'
import { SmartContractEntity } from '__generated__/graphql'
import { ContractsNames, DataTestIDs } from 'shared/constants'
import { useContractVolume } from 'shared/hooks/use-contract-volume'
import { useResponsive } from 'shared/hooks/use-responsive'
import { OnboardingBullsEye } from 'shared/icons'
import {
  ContractAddressHeader,
  ModeInfoHeader,
  ModeOnboarding,
  ModeRoomPicker
} from 'shared/ui'
import { formatToTether, formatToUSD } from 'shared/utils/format-price'
import { zeroAddress } from 'viem'
import { useBullsEyeGame } from '../hooks/use-bulls-eye-game'
import { useBullsEyeStateMachine } from '../hooks/use-bulls-eye-state-machine'
import { useCleanupBullsEyeGame } from '../hooks/use-cleanup-bulls-eye-game'
import { useGetBullsEyeContracts } from '../hooks/use-get-bulls-eye-contracts'
import { BullsEyeBetsTable } from './bulls-eye-bets-table'
import { BullsEyeForm } from './bulls-eye-form'
import { BullsEyeGraph } from './bulls-eye-graph'

// eslint-disable-next-line max-statements
export const ModeBullsEye = () => {
  useCleanupBullsEyeGame()

  useBullsEyeGame()
  useBullsEyeStateMachine()

  const {
    bullsEyeSmartContracts,
    currentBullsEyeSmartContract,
    handleChangeBullsEyeSmartContract
  } = useGetBullsEyeContracts()

  const [isMobile] = useResponsive('xs')

  const currentGameFee =
    (Number(currentBullsEyeSmartContract?.meta?.fee) || 0) * 100

  const currentSmartContractAddress =
    currentBullsEyeSmartContract?.contractAddress || zeroAddress

  const { gameModeVolume, loading } = useContractVolume(
    currentSmartContractAddress
  )

  const gameModeVolumeValue =
    currentBullsEyeSmartContract?.smartContractForXyroToken ?
      `${formatToTether(gameModeVolume)} XYRO`
    : formatToUSD(gameModeVolume)

  const gameModeVolumeText = loading ? 'Loading...' : gameModeVolumeValue

  return (
    <Flex
      direction='column'
      gap='3'
      height='100%'
    >
      <ModeOnboarding
        mode={'bullsEye'}
        headingIcon={<OnboardingBullsEye />}
      />

      <Grid
        columns={{ initial: '1fr', sm: '1.5fr 1fr 1.5fr' }}
        align={'stretch'}
        width={'100%'}
        gap={'2'}
      >
        <ModeRoomPicker
          mode={ContractsNames.BULLS_EYE}
          dataTestId={DataTestIDs.buttonBullsEyeRoomSelect}
          currentSmartContract={
            currentBullsEyeSmartContract as SmartContractEntity
          }
          handleChangeContract={handleChangeBullsEyeSmartContract}
          smartContracts={bullsEyeSmartContracts}
        />

        <ModeInfoHeader
          items={[
            {
              title: 'Fee for this game',
              value: `${currentGameFee}%`
            },
            { title: 'Volume, 24h', value: gameModeVolumeText }
          ]}
        />

        <ContractAddressHeader address={currentSmartContractAddress} />
      </Grid>

      <Grid
        columns={{ initial: '1fr', xs: '1.5fr 3fr', sm: '1.5fr 3fr' }}
        gap={'2'}
      >
        {!isMobile && <BullsEyeForm />}

        <BullsEyeGraph />
      </Grid>

      <BullsEyeBetsTable />
    </Flex>
  )
}
