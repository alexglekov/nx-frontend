import React from 'react'
import { Flex, Grid } from '@radix-ui/themes'
import { useContractVolume } from 'shared/hooks/use-contract-volume'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { OnboardingMemeWars } from 'shared/icons'
import {
  ContractAddressHeader,
  ModeInfoHeader,
  ModeOnboarding
} from 'shared/ui'
import { formatToUSD } from 'shared/utils/format-price'
import { useMemeWarsGame } from '../hooks/use-meme-wars-game'
import { useMemeWarsStateMachine } from '../hooks/use-meme-wars-state-machine'
import { MemeWarsGameArea } from './meme-wars-game-area'
import { MemeWarsTable } from './meme-wars-table'
import styles from '../mode-meme-wars.module.scss'

// eslint-disable-next-line max-statements
export const ModeMemeWars: React.FC = () => {
  useMemeWarsGame()
  useMemeWarsStateMachine()

  const { smartContractAddress, getContractEntryByAddress } =
    useGetSmartContract('Race')

  const smartContractEntry = getContractEntryByAddress(smartContractAddress)
  const memeWarsGameFee = Number(smartContractEntry?.meta?.fee || 0) * 100

  const { gameModeVolume, loading } = useContractVolume(smartContractAddress)

  const gameModeVolumeValue = formatToUSD(gameModeVolume)
  const gameModeVolumeText = loading ? 'Loading...' : gameModeVolumeValue

  return (
    <Flex
      className={styles.wrapper}
      direction={'column'}
      align={'center'}
      width={'100%'}
    >
      <ModeOnboarding
        mode='memeWars'
        headingIcon={<OnboardingMemeWars />}
      />

      <Grid
        columns={{ initial: '1fr', sm: '1fr 1fr' }}
        align={'stretch'}
        width={'100%'}
        gap={'2'}
        mt={'2'}
      >
        <ModeInfoHeader
          items={[
            {
              title: 'Fee for this game',
              value: `${memeWarsGameFee}%`
            },
            { title: 'Volume, 24h', value: gameModeVolumeText }
          ]}
        />

        <ContractAddressHeader address={smartContractAddress} />
      </Grid>

      <MemeWarsGameArea />

      <MemeWarsTable />
    </Flex>
  )
}
