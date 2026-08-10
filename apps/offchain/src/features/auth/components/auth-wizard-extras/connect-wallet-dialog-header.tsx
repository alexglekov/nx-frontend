import { FC } from 'react'
import { Flex, Heading } from '@radix-ui/themes'

export const ConnectWalletDialogHeader: FC = () => {
  return (
    <Flex
      direction={'column'}
      align={'center'}
      gap={'2'}
    >
      <Heading
        className={'color-white'}
        as={'h3'}
        size={'7'}
        mt='-2'
        weight={'medium'}
        align={'center'}
      >
        Connect Wallet
      </Heading>
    </Flex>
  )
}
