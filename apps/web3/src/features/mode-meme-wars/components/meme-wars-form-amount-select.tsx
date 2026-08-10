import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { TetherRoundedIcon } from 'shared/icons'
import { memeWarsPredictAmountVar } from '../store/meme-wars-ui-values.store'
import styles from '../mode-meme-wars.module.scss'

const ALLOWED_PREDICT_AMOUNTS = [1, 3, 5]

export const MemeWarsFormAmountSelect: React.FC = () => {
  const selectedAmount = useReactiveVar(memeWarsPredictAmountVar)

  const handleSelectAmount = (amount: number) =>
    memeWarsPredictAmountVar(amount)

  return (
    <Flex
      direction={'column'}
      gap={'2'}
      align={'center'}
      width={'100%'}
    >
      <Text
        className='color-gray-light'
        weight={'light'}
        size={{ initial: '4', sm: '2' }}
      >
        2. Choose your amount:
      </Text>

      <Flex
        align={'center'}
        gap={'1'}
        width={'100%'}
      >
        {ALLOWED_PREDICT_AMOUNTS.map(a => {
          return (
            <Flex
              key={a}
              className={cn(styles.memeWarsAmountButton, {
                [styles.memeWarsAmountButtonSelected]: a === selectedAmount
              })}
              align={'center'}
              justify={'center'}
              gap={'2'}
              width={'100%'}
              onClick={() => handleSelectAmount(a)}
            >
              <TetherRoundedIcon color='var(--lime)' />

              <Text
                className={cn('color-white', {
                  'color-black': a === selectedAmount
                })}
                weight={'bold'}
                size={{ initial: '4', sm: '2' }}
              >
                {a}
              </Text>
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}
