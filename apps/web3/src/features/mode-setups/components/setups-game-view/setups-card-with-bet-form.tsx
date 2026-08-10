import { FC } from 'react'
import { SetupsGameFragment } from '__generated__/graphql'
import { SetupsAddPredictCard } from '../setups-add-bet/setups-add-bet-card'
import { SetupsCard } from '../setups-card/setups-card'

interface Props {
  handleSelect: (id: string) => void
  setup: SetupsGameFragment
  isBetCardShown: boolean
}
/** @deprecated */
export const SetupsCardWithBetForm: FC<Props> = ({
  handleSelect,
  setup,
  isBetCardShown
}) => {
  return (
    <>
      <SetupsCard
        data-test={1}
        key={setup.id}
        setup={setup}
        onSetupSelect={handleSelect}
      />

      {isBetCardShown ? <SetupsAddPredictCard /> : null}
    </>
  )
}
