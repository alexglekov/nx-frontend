import { Flex, Select, Text } from '@radix-ui/themes'
import { DotTitle } from 'shared/ui/dot-title/dot-title'
import { getAssetIconById } from 'shared/utils/get-asset-icon-by-id'
import { AssetId } from 'shared/types'
import styles from '../balance-add.module.scss'
import { CoinType } from '../types'

interface Props {
  amount: number
  coins: CoinType[]
  error: boolean
  loading: boolean
  onChange: (coin: CoinType) => void
}
export const CoinSelect: React.FC<Props> = ({
  amount,
  coins,
  error,
  loading,
  onChange
}) => {
  const handleValueChange = (coinId: string) => {
    const coin = coins?.find(coin => String(coin.id) == coinId)

    if (coin) {
      onChange(coin)
    }
  }

  return (
    <Flex
      direction={'column'}
      gap={'2'}
    >
      <DotTitle>AVAILABLE FOR WITHDRAWAL</DotTitle>

      <Select.Root
        onValueChange={handleValueChange}
        disabled={Boolean(error)}
      >
        <Select.Trigger
          className={styles.amountInput}
          radius='large'
          placeholder={loading ? 'Loading...' : 'Select an asset'}
        />

        <Select.Content>
          <Select.Group>
            {coins.map(coin => {
              const finalPrice = (amount / coin.rate).toFixed(6)
              const AssetIcon = getAssetIconById(coin.name as AssetId)
              return (
                <Select.Item
                  value={String(coin.id)}
                  key={coin.id}
                >
                  <Flex
                    width={'100%'}
                    align={'center'}
                    justify={'between'}
                    gap={'1'}
                  >
                    <Flex
                      gap={'2'}
                      align={'center'}
                    >
                      <Flex>{<AssetIcon />}</Flex>
                      <Text>{coin.name}</Text>
                    </Flex>

                    {amount ? <Text>${finalPrice}</Text> : null}
                  </Flex>
                </Select.Item>
              )
            })}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}
