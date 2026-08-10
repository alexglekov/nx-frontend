import { FC, useMemo } from 'react'
import { Flex, TextField, Text } from '@radix-ui/themes'
import { Maybe } from '__generated__/graphql'
import cn from 'classnames'
import { DataTestIDs, PRICE_PATTERN } from 'shared/constants'
import { DEFAULT_MAX_PRICE } from '../constants'
import styles from '../mode-one-vs-one.module.scss'

interface Props {
  assetName: string
  ownerPrice: number
  price?: string
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  startPrice?: Maybe<number>
}

export const PriceField: FC<Props> = ({
  assetName,
  handleChange,
  price,
  startPrice,
  ownerPrice
}) => {
  const maxValue = startPrice ? startPrice * 2 : DEFAULT_MAX_PRICE

  const hasError = Number(price) > maxValue || Number(price) === ownerPrice

  const errorTitle = useMemo(() => {
    if (Number(price) > maxValue) return 'Your price is too large'

    if (Number(price) === ownerPrice) return 'Your price is equal to owners'

    return ''
  }, [maxValue, price, ownerPrice])
  return (
    <Flex
      direction={'column'}
      gap={'1'}
      mt={'4'}
    >
      <label htmlFor={'bet-price-field'}>
        <Text size={{ initial: '3', sm: '2' }}>
          Predict the <Text weight={'bold'}>{assetName}</Text> price:
        </Text>
      </label>

      <Text
        size={'1'}
        color={'pink'}
      >
        {errorTitle}
      </Text>
      <TextField.Root
        id={'bet-price-field'}
        onChange={handleChange}
        value={price}
        placeholder='Type price'
        type='number'
        radius='large'
        min={0}
        max={100000}
        inputMode={'decimal'}
        pattern={PRICE_PATTERN}
        data-testid={DataTestIDs.inputOneVsOneAcceptModalPredictPrice}
        className={cn(styles.youSayExactPriceInput, {
          [styles.youSayExactPriceInputError]: hasError
        })}
      />
    </Flex>
  )
}
