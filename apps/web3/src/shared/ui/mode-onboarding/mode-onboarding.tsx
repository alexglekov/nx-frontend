/* eslint-disable max-lines */
import { useEffect, useState } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { getOnboardingDataByMode } from 'features/onboarding/utils'
import { useResponsive } from 'shared/hooks/use-responsive'
import { BoldArrowRight } from 'shared/icons'
import { GameModeType, OnboardingStep } from 'shared/types'
import { ModeOnboardingMobileDialog } from './mode-onboarding-mobile-dialog'
import styles from './mode-onboarding.module.scss'
import { OnboardingStepItem } from './onboarding-step'

interface Props {
  mode: GameModeType
  isOpen?: boolean
  cardHeaderClassName?: string
  cardDescriptionClassname?: string
  headingIcon?: React.ReactNode
  headingFooterBackgroundImage?: string
  additionalDescriptionText?: string
  additionalDescriptionIcon?: React.ReactNode
}
// eslint-disable-next-line complexity
export const ModeOnboarding: React.FC<Props> = ({
  mode,
  isOpen = false,
  cardHeaderClassName,
  cardDescriptionClassname,
  headingIcon,
  additionalDescriptionText,
  additionalDescriptionIcon
}) => {
  const { title, description, steps } = getOnboardingDataByMode(mode)
  const [step, setStep] = useState<OnboardingStep>(steps[0])
  const [isContentOpened, setContentOpened] = useState<boolean>(true)

  const [isMobile] = useResponsive('xs')

  useEffect(() => {
    setStep(steps[0])
  }, [steps])

  // if (import.meta.env.MODE === 'development') return <Card>👷‍♀️ DEV MODE 👷‍♂️</Card>

  return (
    <Card
      size='4'
      className={cn(styles.modeOnboarding, {
        [styles.modeOnboardingClosed]: isContentOpened
      })}
    >
      <Flex
        align={'center'}
        width={'100%'}
      >
        <Flex
          position={'absolute'}
          className={cn(styles.headingIcon, styles[mode])}
        >
          {headingIcon}
        </Flex>
        <Flex
          direction={'column'}
          justify={'center'}
          gap={'2'}
          className={styles.onboardingText}
        >
          <Heading
            className={cn(
              styles.cardHeaderClassName,
              cardHeaderClassName ? cardHeaderClassName : ''
            )}
          >
            {title}
          </Heading>

          <Text
            className={cn(
              styles.cardDescriptionClassname,
              cardDescriptionClassname ? cardDescriptionClassname : ''
            )}
          >
            {description}
          </Text>
        </Flex>
      </Flex>

      {additionalDescriptionText || additionalDescriptionIcon ?
        <Flex
          align={'center'}
          gap={'4'}
          className={styles.additionalInfoContainer}
          position={'relative'}
        >
          <Flex>{additionalDescriptionIcon}</Flex>
          <Text
            weight={'bold'}
            style={{ color: 'var(--c-white)' }}
          >
            {additionalDescriptionText}
          </Text>
        </Flex>
      : null}

      <Collapsible.Root defaultOpen={isOpen}>
        <Collapsible.Trigger asChild>
          <Flex
            align={'center'}
            gap={'1'}
            className={styles.xyroButton}
            // TODO: Remmove onclick from Flex
            onClick={() => setContentOpened(!isContentOpened)}
          >
            <BoldArrowRight
              color={isContentOpened ? 'var(--green)' : 'var(--gray)'}
              width={'1.75rem'}
              height={'1.75rem'}
            />

            <Text
              weight={'bold'}
              size={'3'}
              className={isContentOpened ? 'color-green' : 'color-gray'}
            >
              {isContentOpened ? 'HOW TO PLAY' : 'CLOSE'}
            </Text>
          </Flex>
        </Collapsible.Trigger>

        <Collapsible.Content className={styles.collapsibleContent}>
          {!isMobile && (
            <Flex className={cn(styles.onboardingContentCard, styles[mode])}>
              <Flex
                className={styles.onboardingContent}
                style={{
                  backgroundImage: `url(${step.image})`
                }}
                position={'relative'}
                justify={'end'}
                direction={'column'}
              >
                <Grid
                  columns={'1fr 1fr 1fr'}
                  className={cn(styles.onboardingSteps, styles[mode])}
                  width={'100%'}
                >
                  {steps.map(s => (
                    <OnboardingStepItem
                      key={s.title}
                      isActive={s.title === step.title}
                      setStep={setStep}
                      step={s}
                    />
                  ))}
                </Grid>
              </Flex>
            </Flex>
          )}
        </Collapsible.Content>

        {isMobile ?
          <Flex
            align={'center'}
            justify={'center'}
            pt={'6'}
          >
            <ModeOnboardingMobileDialog
              steps={steps}
              mode={mode}
            />
          </Flex>
        : null}
      </Collapsible.Root>
    </Card>
  )
}
