import React, { useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { useAccountBonuses } from '../hooks/use-account-bonuses'
import { AccountWelcomePackListItem } from './account-welcome-pack-list-item'
import { AccountWelcomeTemplateItem } from './account-welcome-pack-template-item'

export const AccountWelcomePackList: React.FC = () => {
  const { welcomeBonuses, welcomeBonusesTemplates } = useAccountBonuses()

  const filteredWelcomeBonusesTemplates = useMemo(() => {
    return welcomeBonusesTemplates.filter(
      template =>
        !welcomeBonuses.some(bonus => bonus.bonusTemplateId === template.id)
    )
  }, [welcomeBonuses, welcomeBonusesTemplates])

  return (
    <Flex
      direction={'column'}
      gap={'1.5rem'}
    >
      <Flex
        align={'center'}
        width={'100%'}
        gap={'1.5rem'}
        direction={{ initial: 'column', sm: 'row' }}
        wrap={'wrap'}
      >
        {welcomeBonuses.map((bonus, index) => {
          return (
            <AccountWelcomePackListItem
              key={index}
              bonus={bonus}
            />
          )
        })}

        {filteredWelcomeBonusesTemplates.map((bonus, index) => {
          return (
            <AccountWelcomeTemplateItem
              key={index}
              bonusTemplate={bonus}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}
