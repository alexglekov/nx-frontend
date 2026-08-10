import { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Box, Button, Flex } from '@radix-ui/themes'
import { useContractVolume } from 'shared/hooks/use-contract-volume'
import { useQueryParams } from 'shared/hooks/use-query'
import { useResponsive } from 'shared/hooks/use-responsive'
import { useGetSmartContract } from 'shared/hooks/use-smart-contracts'
import { OnboardingSetups } from 'shared/icons'
import { userVar } from 'shared/store/user'
import {
  BannerSlider,
  ContractAddressHeader,
  ModeInfoHeader,
  ModeOnboarding
} from 'shared/ui'
import { formatToUSD } from 'shared/utils/format-price'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { isCreateSetupDialogOpenVar } from '../store/dialogs'
import { selectedSetupVar } from '../store/selected-setup'
import { SetupsDialogAddBet } from './dialogs/setups-dialog-add-bet'
import { SetupsDialogCreateGame } from './dialogs/setups-dialog-game-create'
import { SetupsDialogGameView } from './dialogs/setups-dialog-game-view'
import { SetupsList } from './setups-list'
import { SetupsCreatedGamesTable } from './tables/setups-created-games-table'
import { SetupsJoinedGamesTable } from './tables/setups-joined-games-table'
import styles from '../mode-setups.module.scss'

// eslint-disable-next-line max-statements
export const ModeSetups = () => {
  const isCreateSetupDialogOpen = useReactiveVar(isCreateSetupDialogOpenVar)
  const user = useReactiveVar(userVar)
  const [isMobile] = useResponsive('xs')
  const query = useQueryParams()
  const gameId = query.get('gameId')

  const { smartContractAddress, smartContractEntry } =
    useGetSmartContract('Setup')

  const handleSetupsDialogToggling = useCallback(() => {
    isCreateSetupDialogOpenVar(!isCreateSetupDialogOpen)
    // NOTE: we need to reset selected setup, when dialog is open to prevent two instances of PriceGraph
    selectedSetupVar(null)
  }, [isCreateSetupDialogOpen])

  const currentGameFee =
    (Number(smartContractEntry?.contracts?.[0]?.meta?.fee) || 0) * 100

  const { gameModeVolume, loading } = useContractVolume(smartContractAddress)

  const gameModeVolumeValue =
    loading ? 'Loading...' : formatToUSD(gameModeVolume)

  return (
    <>
      <Box className={styles.modeSetupsWrapper}>
        <ModeOnboarding
          mode={'setups'}
          headingIcon={<OnboardingSetups />}
        />

        {!isMobile && (
          <BannerSlider
            banners={['addSetup']}
            handleClick={handleSetupsDialogToggling}
          />
        )}

        {isMobile && (
          <Button
            mx={'4'}
            my={'1'}
            size={'4'}
            variant={'outline'}
            color={'blue'}
            onClick={handleSetupsDialogToggling}
          >
            CREATE SETUP
          </Button>
        )}

        <Flex
          direction={{ initial: 'column', sm: 'row' }}
          align={'stretch'}
          width={'100%'}
          gap={'2'}
        >
          <ModeInfoHeader
            items={[
              { title: 'Fee for this game', value: `${currentGameFee}%` },
              { title: 'Volume, 24h', value: gameModeVolumeValue }
            ]}
          />
          <ContractAddressHeader address={smartContractAddress} />
        </Flex>

        <SetupsList title='All Open Setups' />

        {user ?
          <>
            <SetupsJoinedGamesTable />
            <SetupsCreatedGamesTable />
          </>
        : null}
      </Box>

      <SetupsDialogAddBet />
      <SetupsDialogCreateGame />
      {isNotNullOrUndef(gameId) && <SetupsDialogGameView />}
    </>
  )
}
