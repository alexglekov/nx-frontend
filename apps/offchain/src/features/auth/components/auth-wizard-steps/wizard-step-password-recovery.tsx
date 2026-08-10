import React from 'react'
import { Flex, Link, Text } from '@radix-ui/themes'
import { DotTitle, FormField } from 'shared/ui'
import styles from '../../sign-up.module.scss'

interface Props {
  handleChangeStep: () => void
}
export const WizardStepPasswordRecovery: React.FC<Props> = ({
  handleChangeStep
}) => {
  return (
    <Flex
      direction={'column'}
      gap={'4'}
    >
      <Text
        size={'3'}
        weight={'medium'}
        align={'center'}
        className='color-white'
      >
        Enter your email, we will send a confirmation message
      </Text>
      <Flex
        direction={'column'}
        gap={'1'}
      >
        <DotTitle>EMAIL</DotTitle>
        <FormField
          height='6rem'
          borderRadius='large'
          type='email'
          name='email'
          placeholder='Enter your email'
        />
      </Flex>

      <Flex
        width={'100%'}
        justify={'between'}
        align={'center'}
        mb={'9'}
      >
        <Link
          onClick={handleChangeStep}
          className={styles.backToLoginContainer}
        >
          <Text
            weight={'bold'}
            size={'2'}
          >
            Back to login
          </Text>
        </Link>
      </Flex>
    </Flex>
  )
}
