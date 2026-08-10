import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import { JoystickIcon, SwapXyroToken, UserIcon } from 'shared/icons'
import { TetherToken } from 'shared/ui'
import { bullsEyeCurrentContractAddressVar } from '../store/bulls-eye-contract-addresses.store'
import { bullsEyeGameVar } from '../store/game.store'

export const BullsEyePoolInfo: React.FC = () => {
  const currentBullsEyeSmartContract = useReactiveVar(
    bullsEyeCurrentContractAddressVar
  )
  const bullsEyeGame = useReactiveVar(bullsEyeGameVar)

  const poolPredictsAmount = bullsEyeGame?.pool?.predictsCount || 0
  const poolSize = bullsEyeGame?.pool?.poolAmount || 0
  const poolPlayersAmount =
    bullsEyeGame?.predicts?.filter(
      (p, index, self) => index === self.findIndex(i => i.ownerId === p.ownerId)
    )?.length || 0

  return (
    <Flex
      direction={'column'}
      width={'100%'}
      align={'center'}
      gap={'3'}
    >
      <Text
        className='color-white'
        weight={'medium'}
        size={'7'}
        mt={'2'}
      >
        Bull’s Eye Pool
      </Text>

      <Flex
        align={'center'}
        justify={'center'}
        gap={'5'}
      >
        <Flex
          align={'center'}
          justify={'center'}
          gap={'1'}
        >
          <JoystickIcon
            color='var(--gray-9)'
            width={'2.5rem'}
            height={'2.5rem'}
          />

          <Text
            weight={'regular'}
            size={'4'}
          >
            {poolPredictsAmount}
          </Text>
        </Flex>

        <Flex
          align={'center'}
          justify={'center'}
          gap={'1'}
        >
          <UserIcon
            color='var(--gray-9)'
            width={'2.5rem'}
            height={'2.5rem'}
          />

          <Text
            weight={'regular'}
            size={'4'}
          >
            {poolPlayersAmount}
          </Text>
        </Flex>

        <Flex
          gap='1'
          align='center'
        >
          {currentBullsEyeSmartContract?.smartContractForXyroToken ?
            <SwapXyroToken
              width={'3rem'}
              height={'3rem'}
              className={'color-yellow'}
            />
          : <TetherToken
              size='3rem'
              className='color-yellow'
            />
          }

          <Text
            size={'4'}
            weight={'light'}
          >
            {poolSize}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
