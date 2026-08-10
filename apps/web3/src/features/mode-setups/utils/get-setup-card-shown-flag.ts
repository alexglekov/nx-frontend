import { SetupsGameFragment } from '__generated__/graphql'
import { Maybe } from 'shared/types'
import { transformToEveryThird } from './transform-to-every-third'

/** Test cases for the function
 * {@link file://./get-setup-card-shown-flag.test.ts}
 */
// eslint-disable-next-line  max-statements
export function getSetupCardShownFlag(
  setups: SetupsGameFragment[],
  setupId: string,
  selectedSetupId: Maybe<string>,
  i: number
) {
  if (!selectedSetupId) return false

  const lastSetupNumInRow = transformToEveryThird(i + 1)
  if (!lastSetupNumInRow) return false

  const setupRow = Math.ceil((i + 1) / 3)
  const selectedSetupRow = Math.ceil(
    (setups.findIndex(s => s.id === selectedSetupId) + 1) / 3
  )

  const isLastSetupInList = i === setups.length - 1
  const isSetupLastInRow = i === lastSetupNumInRow - 1
  const isSelectedSetupInSameRow = setupRow === selectedSetupRow
  const isCardShown =
    (isSelectedSetupInSameRow && isSetupLastInRow) ||
    (isLastSetupInList && isSelectedSetupInSameRow)

  return isCardShown
}
