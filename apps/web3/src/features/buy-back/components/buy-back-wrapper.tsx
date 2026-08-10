import React from 'react'
import { Flex, Grid } from '@radix-ui/themes'
import { BuyBackSwitcher } from './buy-back-switcher'
import { TokenInfo } from './token-info'

interface Props {
  children: React.ReactNode
}

export const BuyBackWrapper: React.FC<Props> = ({ children }) => {
  return (
    <Flex
      direction={'column'}
      gap={'4'}
    >
      <Grid
        columns={{ initial: '1fr', sm: '2fr 1fr' }}
        align={'center'}
        gap={'4'}
        mb={{ initial: '0', sm: '4' }}
      >
        <TokenInfo />

        <BuyBackSwitcher />
      </Grid>

      {children}
    </Flex>
  )
}
