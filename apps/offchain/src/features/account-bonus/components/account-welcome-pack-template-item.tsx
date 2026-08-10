import React from 'react'
import { Button, Flex, Separator, Text } from '@radix-ui/themes'
import { BonusTemplate } from '__generated__/graphql'
// TODO: Split styles file per feature
import { balanceDepositDialogOpenedVar } from '../../balance-transactions/store/balance-transactions-dialogs.store'
import styles from '../../account/account.module.scss'

interface Props {
  bonusTemplate: BonusTemplate
}
export const AccountWelcomeTemplateItem: React.FC<Props> = ({
  bonusTemplate
}) => {
  const amount = bonusTemplate.multiplerAmount * 100 || 0
  const bonusName = bonusTemplate.name || 'Welcome Bonus'
  const wagerAmount = bonusTemplate.multiplerWager || 0

  const onClick = () => {
    balanceDepositDialogOpenedVar(true)
  }

  return (
    <Flex
      className={styles.accountWelcomePackListItem}
      gap={'1.25rem'}
      direction={'column'}
      width={'100%'}
    >
      <Text
        size={'4'}
        weight={'medium'}
        className='color-white'
      >
        {bonusName}
      </Text>

      <Text
        className='color-gray'
        weight={'regular'}
      >
        If your deposit exceeds $50, you’ll receive an additional 25% bonus.
      </Text>

      <Flex
        align={'center'}
        gap={'3'}
      >
        <Text
          weight={'medium'}
          className='color-white'
          size={'7'}
        >
          +{amount}%
        </Text>

        <Separator
          orientation={'vertical'}
          size={'2'}
        />

        <Flex
          direction={'column'}
          gap={'1'}
        >
          <Text
            size={'1'}
            className='color-gray'
          >
            Multiplier Wager
          </Text>

          <Text
            className='color-white'
            weight={'bold'}
          >
            {wagerAmount}x
          </Text>
        </Flex>
      </Flex>

      <Button
        mt={'5'}
        className={styles.welcomePackListItemButton}
        onClick={onClick}
      >
        <Flex
          gap={'2'}
          align={'center'}
        >
          <Text
            className={'color-white'}
            size={'2'}
            weight={'bold'}
          >
            Available
          </Text>
        </Flex>
      </Button>
    </Flex>
  )
}
