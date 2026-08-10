import { FC } from 'react'
import { Text } from '@radix-ui/themes'
import { OneVsOneExactPricePredict } from '__generated__/graphql'
import { POSITIVE_COLOR_CSS_VAR } from 'shared/constants'
import { UpIcon } from 'shared/icons'

interface Props {
  predict: OneVsOneExactPricePredict
}

export const PredictCondition: FC<Props> = ({ predict: { price } }) => {
  const formattedPrice = price.toFixed(2)
  return (
    <>
      <UpIcon color={POSITIVE_COLOR_CSS_VAR} />
      <Text color={'green'}>{formattedPrice}&nbsp;$</Text>
    </>
  )
}
