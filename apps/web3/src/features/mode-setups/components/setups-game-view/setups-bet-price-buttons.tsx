import {
  Flex,
  RadioGroup,
  Card,
  Strong,
  Text,
  VisuallyHidden
} from '@radix-ui/themes'
import { SetupGamePoolInfo } from '__generated__/graphql'
import { UserIcon } from 'shared/icons'
import styles from '../../mode-setups.module.scss'
interface Props {
  takeProfitAmount: number
  stopLossAmount: number
  pools: {
    takeProfit: SetupGamePoolInfo
    stopLoss: SetupGamePoolInfo
  }
}

export const SetupPredictPriceButtons: React.FC<Props> = ({
  takeProfitAmount,
  stopLossAmount,
  pools
}) => {
  const { takeProfit: takeProfitPool, stopLoss: stopLossPool } = pools

  return (
    <RadioGroup.Root name='price'>
      <Flex gap='2'>
        <SetupsBetPriceButton
          price={takeProfitAmount}
          info={takeProfitPool}
          name='takeProfit'
          label='Take Profit'
        />

        <SetupsBetPriceButton
          price={stopLossAmount}
          info={stopLossPool}
          name='stopLoss'
          label='Stop Loss'
        />
      </Flex>
    </RadioGroup.Root>
  )
}

interface ButtonProps {
  price: number
  label: string
  name: string
  info: SetupGamePoolInfo
}
const SetupsBetPriceButton: React.FC<ButtonProps> = ({
  label,
  price,
  name,
  info
}) => {
  const multiplier = info.multiplier ? `x${info.multiplier}` : 0

  return (
    <label
      htmlFor={name}
      className={styles.setupBetButton}
    >
      <Card>
        <Flex
          direction={'column'}
          gap='1'
        >
          <Text>{label}</Text>

          {price ?
            <Strong>${price}</Strong>
          : null}

          <Flex justify={'between'}>
            <Flex align='center'>
              <UserIcon />
              {info.predictsCount}
            </Flex>

            <Strong className='color-pink'>{multiplier}</Strong>
          </Flex>

          <VisuallyHidden>
            <RadioGroup.Item
              id={name}
              value={price.toString()}
            />
          </VisuallyHidden>
        </Flex>
      </Card>
    </label>
  )
}
