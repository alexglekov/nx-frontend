import { Box, Flex, Text } from '@radix-ui/themes'
import classNames from 'classnames'
import { ChartType } from 'shared/types/chat'
import styles from './chart-switcher.module.scss'

interface Props {
  chartType: ChartType
  onChange: (chartType: ChartType) => void
}

export const ChartSwitcher: React.FC<Props> = ({ chartType, onChange }) => {
  const isTradingViewChartType = chartType === 'tradingview'

  const handleClick = () => {
    onChange(isTradingViewChartType ? 'gamified' : 'tradingview')
  }

  return (
    <Flex
      align={'center'}
      gap={'2'}
    >
      <Text
        size={{ initial: '1', sm: '2' }}
        className={isTradingViewChartType ? 'color-white' : 'color-gray'}
      >
        TradingView
      </Text>

      <label className={styles.element}>
        {/* NOTE: We hide this input, just for focus on this switch */}
        <input
          type='checkbox'
          className={styles.input}
          checked={!isTradingViewChartType}
          onChange={() => handleClick()}
        />

        <Box
          className={classNames(styles.block, {
            [styles.blockChecked]: !isTradingViewChartType
          })}
        >
          <Box
            className={classNames(styles.switcher, {
              [styles.switcherChecked]: !isTradingViewChartType
            })}
          />
        </Box>
      </label>

      <Text
        size={{ initial: '1', sm: '2' }}
        className={isTradingViewChartType ? 'color-gray' : 'color-white'}
      >
        Gamified
      </Text>
    </Flex>
  )
}
