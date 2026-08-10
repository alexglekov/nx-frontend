import { Flex, Text } from '@radix-ui/themes'
import { XyroBubble } from 'shared/icons/about-page'
import styles from '../about.module.scss'

export const TeamCard: React.FC = () => {
  return (
    <Flex
      className={styles.teamCardWrapper}
      direction={'column'}
      gap={'4'}
    >
      <XyroBubble className={styles.teamCardBubble} />

      <Text
        className={'color-gray-light'}
        size={'7'}
      >
        Team
      </Text>

      <Text className={styles.teamCardDescription}>
        <span className={styles.teamCardDescriptionGradient}>
          Strong full-time team of 12 people,{' '}
        </span>
        <span className={'color-white'}>featuring Web3 Hackathon winners</span>
      </Text>
    </Flex>
  )
}
