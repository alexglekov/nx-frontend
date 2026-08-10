import { Button, Flex, Text } from '@radix-ui/themes'
import { useNavigate } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { WELCOME_WINDOW_STEPS_DATA } from 'shared/constants/welcome-window'
import { isBetaWelcomeDialogOpenedVar } from 'shared/store/dialogs'
import { cleanQueryParams } from 'shared/utils/clean-query-params'
import styles from './welcome-message-modal.module.scss'

interface Props {
  step: 'step1' | 'step2'
}
export const WelcomeMessageModalStep: React.FC<Props> = ({ step }) => {
  const navigate = useNavigate()
  const stepData = WELCOME_WINDOW_STEPS_DATA[step]

  const handleNavigate = () => {
    if (stepData.id === 1) {
      navigate(RouterPathes.onboarding)
      isBetaWelcomeDialogOpenedVar(false)
      cleanQueryParams()

      return
    }

    navigate(RouterPathes.rewards)
    isBetaWelcomeDialogOpenedVar(false)
    cleanQueryParams()
  }

  return (
    <Flex
      className={styles.welcomeWindowStepContainer}
      direction={'column'}
      width={'100%'}
      justify={'between'}
      gap={'6'}
    >
      <Flex
        width={'100%'}
        direction={'column'}
        className={styles.stepDescriptionContainer}
      >
        <img
          className={styles.welcomeWindowStepImage}
          src={stepData.image}
          alt={step}
        />

        <Flex
          direction={'column'}
          gap={'2'}
          mt={'1'}
        >
          <Text
            className='color-white'
            weight={'bold'}
            size={{ initial: '6', sm: '5' }}
          >
            {stepData.title}
          </Text>

          <Text
            className='color-gray-light'
            weight={'regular'}
            size={{ initial: '3', sm: '1' }}
          >
            {stepData.description}
          </Text>
        </Flex>

        {Boolean(
          stepData.secondaryTitle &&
            stepData.secondaryDescriptionPart1 &&
            stepData.secondaryDescriptionPart2
        ) && (
          <Flex
            direction={'column'}
            gap={'2'}
          >
            <Text
              className={'color-white'}
              weight={'bold'}
              size={{ initial: '3', sm: '2' }}
            >
              {stepData.secondaryTitle}
            </Text>

            <Flex direction={'column'}>
              <Text
                className='color-gray-light'
                weight={'bold'}
                size={{ initial: '3', sm: '2' }}
              >
                {stepData.secondaryDescriptionPart1}
              </Text>

              <Text
                className='color-gray-light'
                weight={'medium'}
                size={{ initial: '3', sm: '2' }}
              >
                {stepData.secondaryDescriptionPart2}
              </Text>
            </Flex>
          </Flex>
        )}
      </Flex>

      <Button
        variant='outline'
        color='teal'
        size={{ initial: '4', sm: '3' }}
        onClick={handleNavigate}
      >
        <Text
          size={{ initial: '3', sm: '2' }}
          weight={'bold'}
        >
          {stepData.buttonText.toUpperCase()}
        </Text>
      </Button>
    </Flex>
  )
}
