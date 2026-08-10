import { Flex, Text } from '@radix-ui/themes'
import { XyroTokenRounded } from 'shared/icons'

// TODO: replace mocked data with real data
// const tokenInfoData = {
//   price: formatToUSD(0.0937585),
//   change: 4.62,
//   volume24H: '110.54K',
//   tvl: '7.46M',
//   holders: '26,455'
// }

export const TokenInfo: React.FC = () => {
  return (
    <Flex
      gap={'4'}
      align={'center'}
    >
      <XyroTokenRounded />

      <Flex
        direction={'column'}
        gap={'1'}
      >
        <Text
          className={'color-white'}
          size={'5'}
          weight={'bold'}
        >
          XYRO Token
        </Text>

        {/* TODO: Enable this logic as soon as we will be able to get data from BE */}
        {/* <Flex
          gap={'2'}
          wrap={'wrap'}
        >
          <Flex
            align={'center'}
            gap={'1'}
          >
            <Text
              className={'color-white'}
              weight={'regular'}
            >
              {tokenInfoData.price}
            </Text>

            <ArrowUpChange color={'var(--c-a-green)'} />

            <Text
              weight={'regular'}
              className={styles.tokenInfoChangeText}
            >
              +{tokenInfoData.change}%
            </Text>
          </Flex>

          <Text
            className={'color-gray-light'}
            weight={'regular'}
          >
            24h Volume:{' '}
            <span className={'color-white'}>${tokenInfoData.volume24H}</span>
          </Text>

          <Text
            className={'color-gray-light'}
            weight={'regular'}
          >
            TVL: <span className={'color-white'}>${tokenInfoData.tvl}</span>
          </Text>

          <Text
            className={'color-gray-light'}
            weight={'regular'}
          >
            Holders:{' '}
            <span className={'color-white'}>{tokenInfoData.holders}</span>
          </Text>
        </Flex> */}
      </Flex>
    </Flex>
  )
}
