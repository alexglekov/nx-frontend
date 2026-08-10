import { useReactiveVar } from '@apollo/client'
import { Flex } from '@radix-ui/themes'
import { OneVsOneGame } from '__generated__/graphql'
import { userVar } from 'shared/store/user'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import { AcceptGameTimer } from './accept-game-timer'
import { AssetInfo } from './asset-info'
import { GameParticipants } from './game-participants'
import { GameViewDialogFields } from './game-view-dialog-fields'
import { InProgressGameTimer } from './in-progress-game-timer'
import { PriceField } from './price-field'

interface ConfirmationDialogContentProps {
  price?: string
  game?: OneVsOneGame
  refetch: () => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export const GameViewDialogContent: React.FC<
  ConfirmationDialogContentProps
  // eslint-disable-next-line max-statements, complexity
> = ({ game, onChange: handleChange, price, refetch }) => {
  const user = useReactiveVar(userVar)

  if (!game) return null

  const {
    endAt,
    isPrivate,
    isAccepted,
    stopPredictAt,
    asset,
    ownerId,
    startPrice,
    ownerPredict
  } = game || {}

  const isShowAcceptTimer =
    (
      !isAccepted &&
      user?.id !== ownerId &&
      isNotNullOrUndef(stopPredictAt) &&
      stopPredictAt > Date.now()
    ) ?
      true
    : false

  const isShowPredictInput =
    user?.id !== ownerId &&
    isNotNullOrUndef(stopPredictAt) &&
    Date.now() < stopPredictAt &&
    !isAccepted

  const isShowInProgressTimer =
    isAccepted && isNotNullOrUndef(endAt) && endAt > Date.now()

  return (
    <>
      <Flex
        direction={'column'}
        width={'100%'}
      >
        {isShowInProgressTimer && (
          <InProgressGameTimer
            endAt={endAt}
            refetch={refetch}
          />
        )}
        {isShowAcceptTimer && (
          <AcceptGameTimer
            stopPredictAt={stopPredictAt as number}
            refetch={refetch}
          />
        )}

        <AssetInfo
          asset={asset}
          isPrivate={isPrivate}
        />

        <GameParticipants game={game as OneVsOneGame} />

        {isShowPredictInput && (
          <PriceField
            assetName={asset.name}
            price={price}
            handleChange={handleChange}
            startPrice={startPrice}
            ownerPrice={ownerPredict.price}
          />
        )}

        <GameViewDialogFields game={game} />
      </Flex>
    </>
  )
}
