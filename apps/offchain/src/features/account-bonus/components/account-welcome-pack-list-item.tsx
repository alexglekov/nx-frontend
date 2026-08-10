import React from 'react'
import { Button, Flex, Separator, Text } from '@radix-ui/themes'
import { Bonus, BonusStatus } from '__generated__/graphql'
// TODO: Split styles file per feature
import { CheckBoxCircleTick } from 'shared/icons'
import { formatToUSD } from 'shared/utils/format-price'
import { MAP_BONUS_STATUS_TO_BUTTON } from '../constants'
import { useAccountBonuses } from '../hooks/use-account-bonuses'
import styles from '../../account/account.module.scss'

interface Props {
  bonus: Bonus
}
export const AccountWelcomePackListItem: React.FC<Props> = ({ bonus }) => {
  const {
    handleActivateBonus,
    bonusActivationLoading,
    welcomeBonusesTemplates
  } = useAccountBonuses()

  const buttonText = MAP_BONUS_STATUS_TO_BUTTON[bonus.status]
  const isActivationAvailable = bonus.status === BonusStatus.Available
  const isBonusClosed = bonus.status === BonusStatus.Closed
  const amount = bonus.amount || 0
  const bonusName = bonus.name || 'Welcome Bonus'

  const bonusId = bonus.id

  const matchingBonusTemplate = welcomeBonusesTemplates.find(
    template => template.id === bonus.bonusTemplateId
  )

  const multiplierAmount = (matchingBonusTemplate?.multiplerAmount || 0.1) * 100

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
          +{multiplierAmount}%
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
            Max. bonus amount
          </Text>

          <Text
            className='color-white'
            weight={'bold'}
          >
            {formatToUSD(amount)}
          </Text>
        </Flex>
      </Flex>

      {!isActivationAvailable ?
        <Button
          mt={'5'}
          className={
            !isBonusClosed ?
              styles.welcomePackListItemButtonActivated
            : styles.welcomePackListItemButtonClosed
          }
        >
          <Flex
            gap={'2'}
            align={'center'}
          >
            {!isBonusClosed && (
              <CheckBoxCircleTick
                color={!isBonusClosed ? 'color-green' : 'color-gray-light'}
              />
            )}

            <Text
              className={!isBonusClosed ? 'color-green' : 'color-gray-light'}
              size={'2'}
              weight={'bold'}
            >
              {buttonText}
            </Text>
          </Flex>
        </Button>
      : <Button
          mt={'5'}
          className={styles.welcomePackListItemButton}
          onClick={() => handleActivateBonus(bonusId)}
          disabled={bonusActivationLoading}
        >
          <Text
            className='color-white'
            size={'2'}
            weight={'bold'}
          >
            {bonusActivationLoading ? 'Loading...' : buttonText}
          </Text>
        </Button>
      }
    </Flex>
  )
}
