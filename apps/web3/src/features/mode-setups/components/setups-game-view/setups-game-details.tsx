/* eslint-disable max-lines */
import { Flex, Separator } from '@radix-ui/themes'
import { useFragment } from '__generated__'
import { GameStatus, SetupsGameFragment } from '__generated__/graphql'
import { FRAGMENT_SETUPS_PREDICT_SHALLOW } from 'api/mode-setups/fragment-setups-predict-shallow'
import { format } from 'date-fns'
import { RouterPathes } from 'shared/constants'
import { RoundedSquareSkeleton } from 'shared/skeletons/common-skeletons/rounded-square-skeleton'
import { Maybe, Seconds } from 'shared/types'
import { DotTitle, RadixText, ShareButton, XyroNumeral } from 'shared/ui'
import { formatToUSD, formatToXyro } from 'shared/utils/format-price'
import { SetupsCardHeader } from '../setups-card/setups-card-header'
import { GameDetail, SetupsViewBetPools } from './game-detail'
import { SetupsGameDetailsResult } from './setups-game-details-result'
import styles from '../../mode-setups.module.scss'

// eslint-disable-next-line complexity
export const SetupsGameDetails = ({
  game
}: {
  game?: Maybe<SetupsGameFragment>
}) => {
  const predict = useFragment(FRAGMENT_SETUPS_PREDICT_SHALLOW, game?.myPredict)

  if (!game) return <SetupsDetailsSkeleton />

  const {
    id,
    takeProfitPool,
    stopLossPool,
    takeProfit,
    stopLoss,
    endPrice,
    status,
    startPrice,
    endAt,
    asset,
    timeframe,
    isLong
  } = game || {}

  const { amount, pnl, isLong: predictIsLong } = predict || {}

  const formattedPnl = pnl?.toFixed() ?? 0

  const formattedEndAt = endAt && format(endAt, 'dd.MM.yyyy HH:mm')
  const isShowPayout = status === GameStatus.Close

  return (
    <Flex
      className={styles.setupsGameDetails}
      direction={'column'}
      gap='2'
      px='4'
      py='6'
      height={'100%'}
    >
      <Flex
        justify={'between'}
        px='1'
      >
        <DotTitle
          color='gray'
          withDot={false}
          size='2'
        >
          Setups details
        </DotTitle>

        <ShareButton
          gameId={id}
          gameMode={RouterPathes.setups}
        />
      </Flex>

      <SetupsCardHeader
        assetId={asset.id}
        isLong={isLong}
        timeframe={timeframe as Seconds}
      />

      <SetupsViewBetPools
        takeProfitPool={takeProfitPool}
        stopLossPool={stopLossPool}
        startPrice={startPrice ?? null}
        tpPrice={takeProfit}
        slPrice={stopLoss}
      />

      <Separator
        size={'4'}
        color='gray'
        my='3'
      />

      {Boolean(endAt) && (
        <GameDetail title='Expire'>
          <XyroNumeral isWhite>{formattedEndAt}</XyroNumeral>
        </GameDetail>
      )}

      <GameDetail title='Starting price'>
        <RadixText>{formatToUSD(startPrice)}</RadixText>
      </GameDetail>

      {Boolean(endPrice) ?
        <GameDetail title='End price'>
          <RadixText>{formatToXyro(endPrice)}</RadixText>
        </GameDetail>
      : null}

      {Boolean(predict) && (
        <>
          <Separator
            size={'4'}
            color='gray'
            my='3'
          />
          <GameDetail title='You say'>
            <RadixText>{predictIsLong ? 'TP' : 'SL'}</RadixText>
          </GameDetail>

          <GameDetail title='You amount'>
            <RadixText>{amount}</RadixText>
          </GameDetail>

          {isShowPayout && (
            <GameDetail title='Payout'>
              <RadixText>{formattedPnl}</RadixText>
            </GameDetail>
          )}
        </>
      )}

      <SetupsGameDetailsResult
        amount={predict?.pnl || null}
        betResult={predict?.status || null}
      />
    </Flex>
  )
}

// TODO: unfinished skeleton
const SetupsDetailsSkeleton = ({}) => {
  return <RoundedSquareSkeleton />
}
