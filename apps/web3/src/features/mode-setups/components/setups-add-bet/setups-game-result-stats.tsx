/* eslint-disable max-lines */
import { useReactiveVar } from '@apollo/client'
import { Flex, Separator, Text } from '@radix-ui/themes'
import { Maybe, SetupsPredictShallowFragment } from '__generated__/graphql'
import { AssetId } from 'shared/types'
import { TetherToken } from 'shared/ui'
import { DotTitle } from 'shared/ui/dot-title/dot-title'
import { formatToUSD } from 'shared/utils/format-price'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'
import { selectedSetupVar } from '../../store/selected-setup'
import { setupsWinnerModalGameVar } from '../../store/winner-modal'
import { SetupsGameResultStat } from './setups-game-result-stat'
import styles from '../../mode-setups.module.scss'

// TODO: bad component, please refactor it
interface Props {
  assetId: AssetId
  myBet: Maybe<SetupsPredictShallowFragment>
}
// eslint-disable-next-line max-statements, complexity
export const SetupsGameStats: React.FC<Props> = ({ assetId, myBet }) => {
  const selectedSetup = useReactiveVar(selectedSetupVar)
  const winnerModalGame = useReactiveVar(setupsWinnerModalGameVar)

  const { startPrice, endPrice } = winnerModalGame || {}

  const { amount, isLong: isUpBet } = myBet || {}

  const isUserPlayed = Boolean(myBet)

  const { takeProfit, stopLoss } = selectedSetup || {}
  const formattedTakeProfit = formatToUSD(takeProfit)
  const formattedStopLoss = formatToUSD(stopLoss)

  const isUpPoolWin = endPrice && takeProfit && endPrice >= takeProfit

  const AssetIcon = getAssetIconById(assetId)

  const formattedStartPrice = formatToUSD(startPrice || 0, 2)

  if (!winnerModalGame) return

  return (
    <Flex
      className={styles.gameResultsWrapper}
      width={'100%'}
      height={'100%'}
      align={'start'}
      direction={'column'}
    >
      <Flex
        width={'100%'}
        align={'center'}
        justify={'between'}
      >
        <DotTitle>ASSET:</DotTitle>
        <Flex
          align={'center'}
          gap={'3'}
        >
          <AssetIcon />
          <Text
            size={'2'}
            weight={'bold'}
            className={styles.gameResultStatText}
          >
            {assetId}
          </Text>
        </Flex>
      </Flex>

      {isUserPlayed ?
        <>
          <Separator
            size={'4'}
            my={'3'}
          />
          <Flex
            width={'100%'}
            align={'center'}
            justify={'between'}
          >
            <DotTitle>YOUR AMOUNT:</DotTitle>
            <Flex
              align={'center'}
              gap={'1'}
            >
              <TetherToken
                size='2rem'
                color='yellow'
              />
              <Text
                size={'2'}
                weight={'bold'}
                className={styles.gameResultStatText}
              >
                {amount}
              </Text>
            </Flex>
          </Flex>
        </>
      : null}

      <Separator
        size={'4'}
        my={'3'}
      />

      <Flex
        width={'100%'}
        direction={'column'}
        gap={'3'}
      >
        {isUserPlayed && (
          <SetupsGameResultStat
            title='POSITION:'
            statText={isUpBet ? 'long' : 'short'}
          />
        )}

        {formattedStartPrice && (
          <SetupsGameResultStat
            title='STARTING PRICE:'
            statText={formattedStartPrice}
          />
        )}

        {formattedTakeProfit && (
          <SetupsGameResultStat
            title='TAKE PROFIT:'
            statText={formattedTakeProfit}
          />
        )}

        {formattedStopLoss && (
          <SetupsGameResultStat
            title='STOP LOSS:'
            statText={formattedStopLoss}
          />
        )}

        {isUserPlayed ?
          <Flex
            align={'center'}
            justify={'between'}
          >
            <DotTitle>YOU SAY:</DotTitle>
            <Flex className={styles.conditionBox}>
              <Text color={isUpBet ? 'green' : 'pink'}>
                {isUpBet ? 'TP' : 'SL'}
              </Text>
            </Flex>
          </Flex>
        : null}
      </Flex>

      <Separator
        size={'4'}
        my={'3'}
      />

      <Flex
        align={'center'}
        justify={'between'}
        width={'100%'}
      >
        <DotTitle>WINNIG POOL:</DotTitle>
        <Flex className={styles.conditionBox}>
          <Text color={isUpPoolWin ? 'green' : 'pink'}>
            {isUpPoolWin ? 'TP' : 'SL'}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
