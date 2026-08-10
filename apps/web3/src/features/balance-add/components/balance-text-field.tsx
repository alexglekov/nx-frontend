import { Flex, TextField } from '@radix-ui/themes'
import { DotTitle } from 'shared/ui/dot-title/dot-title'
import { XyroToken } from 'shared/ui/xyro-token'
import { WITHDRAW_PERCENTAGE } from '../constants'
import { WithdrawPercentageItem } from '../types'
import { PercentageWithdrawItem } from './withdraw-percentage-item'
import styles from '../balance-add.module.scss'

type Props = {
  value: string
  setValue: (value: string) => void
  placeholder?: string
  label?: string
  type?: string
  isEqualsXYROToken?: boolean
  isWithDraw?: boolean
  activeWirhdrawPercentage?: WithdrawPercentageItem | null
  setActiveWirhdrawPercentage?: React.Dispatch<
    React.SetStateAction<WithdrawPercentageItem | null>
  >
}
export const BalanceTextField: React.FC<Props> = ({
  value,
  setValue,
  placeholder = 'Enter amount',
  label = 'AMOUNT',
  type = 'number',
  isEqualsXYROToken = false,
  isWithDraw = false,
  activeWirhdrawPercentage,
  setActiveWirhdrawPercentage
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <Flex
      width={'100%'}
      mt={!isWithDraw ? '5' : '0'}
    >
      <Flex
        width={'100%'}
        position={'relative'}
        gap={isWithDraw ? '4' : '2'}
        direction='column'
      >
        <Flex
          align={'center'}
          justify={'between'}
        >
          <DotTitle>{label}</DotTitle>
          {isWithDraw ?
            <Flex align={'center'}>
              {WITHDRAW_PERCENTAGE.map(el => {
                const isActive = el.value === activeWirhdrawPercentage?.value
                return (
                  <PercentageWithdrawItem
                    key={el.value}
                    isActive={isActive}
                    setActiveWirhdrawPercentage={setActiveWirhdrawPercentage}
                    el={el}
                  />
                )
              })}
            </Flex>
          : null}
        </Flex>

        {isEqualsXYROToken ?
          <XyroToken
            className={isWithDraw ? styles.xyroTokenWithDraw : styles.xyroToken}
            color='yellow'
          />
        : null}

        <TextField.Root
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
          className={styles.amountInput}
          radius='large'
          // type={type}
        />
      </Flex>
    </Flex>
  )
}
