import { FC } from 'react'
import { Button } from '@radix-ui/themes'
import { BuybackInputPercentsList } from '../constants'
import styles from '../buy-back.module.scss'

interface Props {
  balance: number
  disabled: boolean
  setValue: (value: string) => void
}

export const BuyBackInputPercents: FC<Props> = ({
  balance,
  setValue,
  disabled
}) => {
  const handleButtonClick = (multiplier: number) => {
    const newValue = (balance * multiplier).toFixed(2)
    setValue(newValue)
  }

  return (
    <>
      {BuybackInputPercentsList.map(({ title, multiplier, dataTestId }) => (
        <Button
          key={title}
          variant='ghost'
          size={'1'}
          className={styles.buyBackInputPercentButton}
          onClick={() => handleButtonClick(multiplier)}
          data-testid={dataTestId}
          type='button'
          disabled={disabled}
        >
          {title}
        </Button>
      ))}
    </>
  )
}
