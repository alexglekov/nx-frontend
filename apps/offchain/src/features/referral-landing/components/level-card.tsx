import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import styles from '../referral.module.scss'

interface Props {
  level: '1' | '2'
}

export const LevelCard: React.FC<Props> = ({ level }) => {
  const percentage = level === '1' ? '40%' : '15%'

  return (
    <Flex
      className={cn(styles.levelCard, styles[`levelCard--${level}`])}
      direction={'column'}
      justify={'between'}
      width={'100%'}
    >
      <Flex
        align={'center'}
        gap={'2'}
      >
        <Text
          className={cn(styles.levelTitle, 'color-black')}
          weight={'bold'}
        >
          {level}
        </Text>

        <Text
          className={'color-black'}
          size={'2'}
        >
          LEVEL
        </Text>
      </Flex>

      <Text className={'color-black'}>
        Earn up to <Text weight={'bold'}>{percentage}</Text> from the{' '}
        {level === '1' ?
          'friends you invite'
        : 'referrals invited by your friends'}
      </Text>
    </Flex>
  )
}
