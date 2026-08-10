import { Box, Flex, Grid, Link, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { TractionStats } from '../types'
import styles from '../about.module.scss'

interface Props {
  title: string
  items: TractionStats[]
  linkTitle: string
  href: string
  type: 'green' | 'purple'
}
export const TractionCard: React.FC<Props> = ({
  title,
  items,
  type,
  linkTitle,
  href
}) => {
  const isPrimaryColorGreen = type === 'green'

  return (
    <Flex
      className={styles.tractionWrapper}
      direction={'column'}
    >
      <Box
        className={cn(styles.tractionShadowFirst, {
          [styles.tractionPrimaryColorGreen]: isPrimaryColorGreen,
          [styles.tractionPrimaryColorPurple]: !isPrimaryColorGreen
        })}
      />

      <Box
        className={cn(styles.tractionShadowSecond, {
          [styles.tractionSecondaryColorGreen]: isPrimaryColorGreen,
          [styles.tractionSecondaryColorPurple]: !isPrimaryColorGreen
        })}
      />

      <Box className={styles.tractionTitle}>
        <Text
          className={'color-white'}
          size={'7'}
        >
          {title}
        </Text>
      </Box>

      <Grid
        className={styles.tractionStats}
        justify={'between'}
        columns={'repeat(2, auto)'}
      >
        {items.map((item, index) => (
          <TractionItem
            key={index}
            value={item.value}
            title={item.title}
          />
        ))}
      </Grid>

      <Link
        className={cn({
          'color-green': isPrimaryColorGreen,
          'color-pink': !isPrimaryColorGreen
        })}
        underline={'always'}
        mt={'6'}
        href={href}
        target={'_blank'}
      >
        <Text
          className={styles.tractionLinkText}
          size={'3'}
        >
          {linkTitle}
        </Text>
      </Link>
    </Flex>
  )
}

interface TractionItemProps {
  value: string
  title: string
}
const TractionItem: React.FC<TractionItemProps> = ({ value, title }) => {
  return (
    <Flex
      direction={'column'}
      gap={'2'}
    >
      <Text
        className={cn(styles.tractionItemValue, 'color-white')}
        weight={'medium'}
      >
        {value}
      </Text>

      <Text
        className={'color-gray-light'}
        size={'1'}
      >
        {title}
      </Text>
    </Flex>
  )
}
