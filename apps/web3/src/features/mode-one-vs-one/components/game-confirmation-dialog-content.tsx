import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Separator, Text } from '@radix-ui/themes'
import { Asset } from '__generated__/graphql'
import { SECS_IN_HOUR } from 'shared/constants'
import { SwapXyroToken } from 'shared/icons'
import { RequiredExcept } from 'shared/types'
import { TetherToken } from 'shared/ui'
import { DotTitle } from 'shared/ui/dot-title/dot-title'
import { oneVsOneCreateFormStateVar } from '../store/form'
import { oneVsOneIsXyroTokenSelectedVar } from '../store/selected-token'
import { FieldNames, OneVsOneCreateFormState } from '../types'
import { calculateExpiresIn } from '../utils/calculate-expires-in'
import { calculateStartAt } from '../utils/calculate-start-at'
import { GameAssetSparkline } from './game-asset-sparkline'
import { GameConfirmationDialogContentMainFields } from './game-confirmation-dialog-content-main-fields'

interface Props {
  asset: Asset | null
  startTime: number
}

export const GameConfirmationDialogContent: React.FC<Props> = ({
  asset,
  startTime
}) => {
  const oneVsOneCreateFormState = useReactiveVar(
    oneVsOneCreateFormStateVar
  ) as RequiredExcept<
    OneVsOneCreateFormState,
    FieldNames.betOpponent | FieldNames.predictTimeframe
  >

  const oneVsOneIsXyroTokenSelected = useReactiveVar(
    oneVsOneIsXyroTokenSelectedVar
  )

  const {
    betAmount,
    isPrivate,
    predictTimeframe,
    predictExactPrice,
    betOpponent
  } = oneVsOneCreateFormState

  const privacyText = isPrivate ? 'Private' : 'Public'

  const expiresTimeframe = predictTimeframe ?? SECS_IN_HOUR

  const { formattedDate, formattedTime } = calculateExpiresIn(expiresTimeframe)
  const {
    formattedDate: formattedStartDate,
    formattedTime: formattedStartTime
  } = calculateStartAt(startTime)

  return (
    <Flex
      direction={'column'}
      width={'100%'}
      mt={'9'}
    >
      <Flex
        direction={'column'}
        gap={'2'}
      >
        <DotTitle>ASSET</DotTitle>
        <GameAssetSparkline asset={asset} />
      </Flex>

      <Separator
        my={'4'}
        size={'4'}
      />

      <GameConfirmationDialogContentMainFields
        initiatorPrice={predictExactPrice}
        date={formattedDate}
        time={formattedTime}
        opponent={betOpponent}
        privacyText={privacyText}
        startDate={formattedStartDate}
        startTime={formattedStartTime}
      />

      <Separator
        my={'4'}
        size={'4'}
      />

      <Flex
        align={'center'}
        justify={'between'}
      >
        <DotTitle>GAME AMOUNT:</DotTitle>
        <Flex
          align={'center'}
          gap={'1'}
        >
          {oneVsOneIsXyroTokenSelected ?
            <SwapXyroToken
              width={'2rem'}
              height={'2rem'}
            />
          : <TetherToken
              size={'2rem'}
              color='yellow'
            />
          }
          <Text
            size={'5'}
            weight={'light'}
          >
            {betAmount}
          </Text>
        </Flex>
      </Flex>

      <Text
        mt={'4'}
        weight={'bold'}
        size={'2'}
        align={'center'}
      >
        Pay attention! After the game timer ends without any opponent there, you
        need to manually close it
      </Text>
    </Flex>
  )
}
