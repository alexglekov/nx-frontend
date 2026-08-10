/* eslint-disable max-lines */
import { FC, useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Box, Flex } from '@radix-ui/themes'
import classnames from 'classnames'
import { Maybe } from 'graphql/jsutils/Maybe'
import { DataTestIDs, WalletStateStatus } from 'shared/constants'
import { useWallet } from 'shared/hooks/use-wallet'
import { DownIcon, UpIcon } from 'shared/icons'
import { TetherToken, XyroButton, XyroLoadingSpinner } from 'shared/ui'
import { withWalletConnection } from 'shared/ui/with-wallet/with-wallet-connection'
import { betAmountVar } from '../store/amount.store'
import { upDownGameVar } from '../store/game.store'
import { BetDirection } from '../types'
import { PoolInfoPayout } from './pool-info-payout'
import styles from '../mode-up-down.module.scss'

interface Props {
  createBet: (
    amount: number,
    isUp: boolean,
    token?: Maybe<string>
  ) => Promise<void>
  selectedBet: Maybe<BetDirection>
  betDirection: BetDirection
  isDisabled: boolean
  loading: boolean
}
export const UpDownBetButton: FC<Props> = ({
  createBet,
  selectedBet,
  betDirection,
  isDisabled,
  loading
}) => {
  const isUp = betDirection === 'UP'
  const betAmount = useReactiveVar(betAmountVar)
  const game = useReactiveVar(upDownGameVar)

  const { walletStateKey } = useWallet()

  const dataTestID = getDataTestIdByWalletStateKey(walletStateKey, isUp)

  const handleBet = useCallback(
    (isUp: boolean) => {
      createBet(betAmount, isUp, game?.token)
    },
    [createBet, betAmount, game]
  )

  const isDirectionSelected = selectedBet === betDirection

  return (
    <Flex
      direction={'column'}
      gap={'2'}
      className={classnames({
        [styles.upButton]: isUp,
        [styles.downButton]: !isUp
      })}
    >
      <UpDownBetButtonWrapper
        handleClick={() => handleBet(isUp)}
        isSelected={isDirectionSelected}
        isDisabled={isDisabled}
        betDirection={betDirection}
        dataTestID={dataTestID}
      >
        <UpDownBetButtonContent
          direction={betDirection}
          isSelected={isDirectionSelected}
          loading={loading}
        />
      </UpDownBetButtonWrapper>

      <Box
        width={'100%'}
        className='greater-than-xs-hidden'
      >
        <PoolInfoPayout isLong={isUp} />
      </Box>
    </Flex>
  )
}

const UpDownBetButtonWrapper = ({
  isSelected,
  isDisabled,
  handleClick,
  betDirection,
  children,
  dataTestID = ''
}: {
  isSelected: boolean
  isDisabled: boolean
  handleClick: () => void
  betDirection: BetDirection
  children: React.ReactNode
  dataTestID?: DataTestIDs | ''
}) => {
  const color = betDirection === 'UP' ? 'green' : 'pink'
  const buttonShapeType = betDirection === 'UP' ? 'cutted-left' : 'cutted-right'
  const classNames = classnames(styles.upDownButton)

  return (
    <XyroButtonWithWallet
      onClick={handleClick}
      size={{ initial: '3', md: '4' }}
      variant={isSelected ? 'solid' : 'outline'}
      className={classNames}
      highContrast={isSelected}
      disabled={isDisabled}
      color={color}
      shape={buttonShapeType}
      isWide
      data-testid={dataTestID}
    >
      {children}
    </XyroButtonWithWallet>
  )
}

const XyroButtonWithWallet = withWalletConnection(XyroButton)

const UpDownBetButtonContent = ({
  loading,
  isSelected,
  direction
}: {
  loading: boolean
  isSelected: boolean
  direction: BetDirection
}) => {
  if (loading) return <XyroLoadingSpinner iconSize='0' />

  if (isSelected) return <SelectedButtonLabel />

  return <ButtonLabel direction={direction} />
}

const ButtonLabel = ({ direction }: { direction: BetDirection }) => {
  const Icon = direction === 'UP' ? UpIcon : DownIcon
  const directionText = direction === 'UP' ? 'up' : 'down'

  return (
    <>
      <Icon
        height={'3rem'}
        width={'3rem'}
      />
      {directionText}
    </>
  )
}

const SelectedButtonLabel = () => {
  const betAmount = useReactiveVar(betAmountVar)

  return (
    <>
      {betAmount}{' '}
      <TetherToken
        size='2.5rem'
        className='color-yellow'
      />{' '}
      Accepted
    </>
  )
}

const {
  buttonBetUpUpDown,
  buttonBetDownUpDown,
  buttonUpDownConnectWallet,
  buttonUpDownSignInToPlay,
  buttonUpDownSwitchChain
} = DataTestIDs

const { connectWallet, signInToPlay, switchChain } = WalletStateStatus

const getDataTestIdByWalletStateKey = (
  walletStateKey: WalletStateStatus | null,
  isUp: boolean
) => {
  if (walletStateKey === connectWallet) return buttonUpDownConnectWallet

  if (walletStateKey === signInToPlay) return buttonUpDownSignInToPlay

  if (walletStateKey === switchChain) return buttonUpDownSwitchChain

  return isUp ? buttonBetUpUpDown : buttonBetDownUpDown
}
