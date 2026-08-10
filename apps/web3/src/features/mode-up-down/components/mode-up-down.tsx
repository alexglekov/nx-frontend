import { Grid } from '@radix-ui/themes'
import { SmartContractEntity } from '__generated__/graphql'
import { ContractsNames, DataTestIDs } from 'shared/constants'
import { useContractVolume } from 'shared/hooks/use-contract-volume'
import { OnboardingUpDown } from 'shared/icons'
import {
  ContractAddressHeader,
  ModeInfoHeader,
  ModeOnboarding,
  ModeRoomPicker
} from 'shared/ui'
import { formatToTether, formatToUSD } from 'shared/utils/format-price'
import { zeroAddress } from 'viem'
import { useCleanupUpDownGame } from '../hooks/use-cleanup-up-down-game'
import { useGetUpDownContracts } from '../hooks/use-get-up-down-contracts'
import { CompletedUpDownsTable } from './completed-up-downs-table'
import { UpDownGame } from './up-down-game'
import styles from '../mode-up-down.module.scss'

export const UpDownMode = () => {
  useCleanupUpDownGame()

  const {
    currentUpDownSmartContract,
    handleChangeUpDownSmartContract,
    upDownSmartContracts
  } = useGetUpDownContracts()

  const currentGameFee =
    (Number(currentUpDownSmartContract?.meta?.fee) || 0) * 100

  const currentSmartContractAddress =
    currentUpDownSmartContract?.contractAddress || zeroAddress

  const { gameModeVolume, loading } = useContractVolume(
    currentSmartContractAddress
  )

  const gameModeVolumeValue =
    currentUpDownSmartContract?.smartContractForXyroToken ?
      `${formatToTether(gameModeVolume)} XYRO`
    : formatToUSD(gameModeVolume)

  const gameModeVolumeText = loading ? 'Loading...' : gameModeVolumeValue

  return (
    <div className={styles.wrapper}>
      <ModeOnboarding
        mode={'upDown'}
        headingIcon={<OnboardingUpDown />}
      />

      <Grid
        columns={{ initial: '1fr', sm: '1.5fr 1fr 1.5fr' }}
        align={'stretch'}
        width={'100%'}
        gap={'2'}
        mt={'2'}
      >
        <ModeRoomPicker
          currentSmartContract={
            currentUpDownSmartContract as SmartContractEntity
          }
          mode={ContractsNames.UP_DOWN}
          handleChangeContract={handleChangeUpDownSmartContract}
          smartContracts={upDownSmartContracts}
          dataTestId={DataTestIDs.buttonUpDownRoomSelect}
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

      <UpDownGame />

      <CompletedUpDownsTable />
    </div>
  )
}
