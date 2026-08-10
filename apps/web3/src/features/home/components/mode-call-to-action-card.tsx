import { FC } from 'react'
import { Flex, Heading } from '@radix-ui/themes'
import { PlayArrowIcon } from 'shared/icons'
import { RadixText } from 'shared/ui'
import { ModeCardWrapper } from './mode-card-wrapper'
import styles from '../home.module.scss'

interface CallToActionCardProps {
  title: string
  callToAction: string[]
}
export const ModeCallToActionCard: FC<CallToActionCardProps> = ({
  title,
  callToAction
}) => {
  return (
    <ModeCardWrapper
      path={'/onboarding'}
      modeKey='howto'
    >
      <Flex
        className={styles.callToActionCard}
        direction={'column'}
        align={'start'}
        p={{ initial: '7', md: '5' }}
        py={{ initial: '5' }}
        gap={{ initial: '4', sm: '2' }}
        height={'100%'}
        width={'100%'}
      >
        <Heading
          weight={{ initial: 'bold', sm: 'medium' }}
          size={{
            xs: '6',
            md: '7',
            xl: '8'
          }}
          className={styles.cardCallToActionTitle}
        >
          {title}
        </Heading>

        {callToAction.map(call => (
          <Flex
            align={'center'}
            mt={'1'}
            gap={'2'}
            key={call}
          >
            <PlayArrowIcon color={'var(--yellow)'} />
            <RadixText
              color='yellow'
              size={{
                initial: '1',
                xs: '1',
                md: '2',
                xl: '3'
              }}
              weight={'medium'}
              className={styles.cardCallToActionText}
            >
              {call}
            </RadixText>
          </Flex>
        ))}
      </Flex>
    </ModeCardWrapper>
  )
}
