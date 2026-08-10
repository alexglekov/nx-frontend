import { Flex } from '@radix-ui/themes'
import { PredictStatus } from '__generated__/graphql'
import { Maybe } from 'graphql/jsutils/Maybe'
import { RadixText, TetherToken, XyroNumeral } from 'shared/ui'
import { isNotNullOrUndef } from 'shared/utils/is-not-null-or-undef'
import styles from '../../mode-setups.module.scss'

export const SetupsGameDetailsResult = ({
  betResult,
  amount
}: {
  amount: Maybe<number>
  betResult: Maybe<PredictStatus>
}) => {
  const resultText = getResultText(betResult, amount)

  const resultColor =
    betResult === PredictStatus.Won ? 'green'
    : betResult === PredictStatus.Loss ? 'pink'
    : 'yellow'

  const formattedAmountDetail =
    betResult === PredictStatus.Loss ? String(amount).replace('-', '') : amount

  const finalAmount =
    Boolean(formattedAmountDetail) ?
      Number(formattedAmountDetail).toFixed(1)
    : 0

  return (
    <Flex
      p='4'
      mt='3'
      align='center'
      justify='between'
      className={styles.setupsGameDetailsResult}
    >
      <RadixText
        weight={'bold'}
        color={resultColor}
      >
        {resultText ?? 'Please wait...'}
      </RadixText>

      {Boolean(amount) && (
        <XyroNumeral
          isWhite={true}
          size={'4'}
          className='vertical-align-middle'
        >
          <Flex mt={'1'}>
            <TetherToken color='yellow' />
          </Flex>
          {finalAmount}
        </XyroNumeral>
      )}
    </Flex>
  )
}

const { Loss, Open, Reject, Won } = PredictStatus

/* eslint-disable-next-line complexity */
const getResultText = (
  betResult: Maybe<PredictStatus>,
  amount: Maybe<number>
) => {
  if (betResult === null) return 'You have no bets for this Setup'

  if (betResult === Won && isNotNullOrUndef(amount) && amount >= 0)
    return 'You won:'

  if (
    (betResult === Won && isNotNullOrUndef(amount) && amount < 0) ||
    betResult === Loss
  )
    return 'You lost:'

  if (betResult === Reject) return 'Game rejected'

  if (betResult === Open) return 'Game started'

  return null
}
