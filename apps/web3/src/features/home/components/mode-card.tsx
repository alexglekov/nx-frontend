import { Flex, Heading, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { HomeCardType } from '../constants'
import { ModeCallToActionCard } from './mode-call-to-action-card'
import { ModeCardWrapper } from './mode-card-wrapper'
import styles from '../home.module.scss'

export interface Props {
  mode: HomeCardType
  isWide?: boolean
  isComingSoonBadgeShown?: boolean
  isNewBadgeShown?: boolean
}
export const ModeCard: React.FC<Props> = ({
  mode,
  isWide = false,
  isComingSoonBadgeShown = false
}) => {
  if (mode?.key === 'howto')
    return (
      <ModeCallToActionCard
        title={mode.title}
        callToAction={mode.callToAction}
      />
    )

  const {
    title,
    logo,
    path,
    backgroundElement: BackgroundModeIcon,
    description,
    disabled
  } = mode

  return (
    <ModeCardWrapper
      path={path}
      modeKey={mode.key}
    >
      <img
        src={logo}
        alt={`${title} logo`}
        className={cn(styles.cardLogo, styles[mode.key], {
          [styles.logoDisabled]: disabled
        })}
      />

      <Flex
        className={styles.modeCardInfoContainer}
        direction={'column'}
        align={'center'}
        height={'100%'}
        width={'100%'}
        p={{ initial: '2', md: '5' }}
        py={{ initial: '3' }}
        gap={'2'}
      >
        {isComingSoonBadgeShown && (
          <Flex
            width={'100%'}
            justify={'end'}
            pt={'2'}
          >
            <Flex
              className={styles.modeCardComingSoonBadge}
              align={'center'}
              justify={'center'}
            >
              <Text
                className='color-black'
                size={'2'}
                weight={'medium'}
              >
                Coming soon
              </Text>
            </Flex>
          </Flex>
        )}

        <Heading
          weight={'bold'}
          size={'6'}
          className={cn(styles.cardTitle, styles[`${mode.key}Title`], {
            [styles.cardTitleLarge]: isWide
          })}
        >
          {title}
        </Heading>

        {Boolean(description) && (
          <Text
            className={cn(
              'color-white',
              styles.cardDescription,
              styles[`${mode.key}Description`],
              {
                [styles.cardDescriptionLarge]: isWide
              }
            )}
          >
            {description}
          </Text>
        )}
      </Flex>

      <BackgroundModeIcon
        className={cn(styles.cardBackgroundElement, styles[mode.key], {
          [styles.backgroundDisabled]: disabled
        })}
      />
    </ModeCardWrapper>
  )
}
