import React from 'react'
import { Flex, Grid, Text } from '@radix-ui/themes'
import { useBalance } from 'shared/hooks/use-balance'
import { InfoCircleFill } from 'shared/icons'
// TODO: Split styles file per feature
import styles from '../../account/account.module.scss'

export const AccountBonusesRealBalance: React.FC = () => {
  const { formattedBalance, formattedBonusBalance } = useBalance()

  const columnsTemplate = '1.5fr 1fr 0.75fr'

  return (
    <Flex
      direction={'column'}
      gap={'2rem'}
      justify={'between'}
      className={styles.accountBonusesHeaderBlock}
      width={'100%'}
    >
      <Grid columns={columnsTemplate}>
        <Text
          className='color-gray-light'
          weight={'bold'}
        >
          Real balance
        </Text>

        <Text
          className='color-gray-light'
          weight={'bold'}
        >
          Bonus balance
        </Text>
        <Flex justify={'end'}>
          <InfoCircleFill />
        </Flex>
      </Grid>

      <Grid columns={columnsTemplate}>
        <Text
          size={{ initial: '6', sm: '7' }}
          weight={'light'}
          className='color-white'
        >
          {formattedBalance}
        </Text>

        <Text
          size={{ initial: '6', sm: '7' }}
          weight={'light'}
          className='color-white'
        >
          {formattedBonusBalance}
        </Text>
      </Grid>
    </Flex>
  )
}
