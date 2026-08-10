import { Flex, Grid } from '@radix-ui/themes'
import cn from 'classnames'
import { useResponsive } from 'shared/hooks/use-responsive'
import { InvestorsProps } from '../types'
import styles from '../about.module.scss'

interface Props {
  items: InvestorsProps[]
  short?: boolean
}

export const Investors: React.FC<Props> = ({ items, short }) => {
  return (
    <Grid
      className={cn(styles.investors)}
      columns={{
        initial: 'repeat(3, 1fr)',
        lg: short ? 'repeat(3, 1fr)' : `repeat(5, 1fr)`
      }}
      width={'100%'}
      gap={'3'}
    >
      {items.map((item, index) => (
        <InvestorItem
          key={index}
          item={item}
        />
      ))}
    </Grid>
  )
}

interface InvestorItem {
  item: InvestorsProps
}
const InvestorItem: React.FC<InvestorItem> = ({ item }) => {
  const [isNotDesktop] = useResponsive(['xs', 'sm', 'md', 'lg'])
  const { icon: Icon, borderColor, gridSettings } = item

  const gridColSpan =
    isNotDesktop ?
      gridSettings?.mobile?.colSpan
    : gridSettings?.desktop?.colSpan
  const gridRowSpan =
    isNotDesktop ?
      gridSettings?.mobile?.rowSpan
    : gridSettings?.desktop?.rowSpan

  return (
    <Flex
      className={cn(styles.investorItem)}
      align={'center'}
      justify={'center'}
      // NOTE: Inline styles here are used to set grid-column and grid-row dynamically
      style={{
        borderColor: borderColor,
        gridColumn: gridColSpan ? `span ${gridColSpan}` : undefined,
        gridRow: gridRowSpan ? `span ${gridRowSpan}` : undefined
      }}
    >
      <Icon />
    </Flex>
  )
}
