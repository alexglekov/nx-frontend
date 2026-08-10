import { Flex } from '@radix-ui/themes'
import { RadixColorType } from 'shared/types'
import styles from './achievement-card.module.scss'

const CARD_DEFAULT_WIDTH = 180
const CARD_DEFAULT_HEIGHT = 181

interface Props {
  children?: React.ReactNode
  color?: RadixColorType
  width?: string
  height?: string
  opacity?: string
}
export const AchievementCard: React.FC<Props> = ({
  children,
  color,
  width,
  height,
  opacity
}) => {
  return (
    <Flex
      position={'relative'}
      style={{ opacity: opacity ? opacity : '1' }}
    >
      <svg
        width={width ? width : CARD_DEFAULT_WIDTH}
        height={height ? height : CARD_DEFAULT_HEIGHT}
        viewBox='0 0 180 181'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={styles.achievementCard}
      >
        <rect
          y='0.500122'
          width='180'
          height='180'
          opacity={0.3}
          rx='33'
          fill={color || 'currentColor'}
        ></rect>
        <mask
          id='achievement-mask'
          style={{ maskType: 'alpha' }}
          maskUnits='userSpaceOnUse'
          x='6'
          y='6'
          width='168'
          height='169'
        >
          <path
            d='M6 90.5V155.206C6 165.862 14.6384 174.5 25.2944 174.5H120.012C127.688 174.5 135.049 171.451 140.477 166.023L165.523 140.977C170.951 135.549 174 128.188 174 120.512V25.7944C174 15.1384 165.362 6.5 154.706 6.5H59.988C52.3122 6.5 44.9508 9.5492 39.5232 14.9768L14.4768 40.0232C9.0492 45.4508 6 52.8122 6 60.488V90.5Z'
            fill='var(--black)'
          />
        </mask>
        <g mask='url(#achievement-mask)'>
          <path
            d='M6 90.5001V146.654C6 162.033 18.4671 174.5 33.8462 174.5H120.012C127.688 174.5 135.049 171.451 140.477 166.023L165.523 140.977C170.951 135.549 174 128.188 174 120.512V34.3463C174 18.9673 161.533 6.50012 146.154 6.50012H59.988C52.3122 6.50012 44.9508 9.54932 39.5232 14.9769L14.4768 40.0233C9.0492 45.4509 6 52.8123 6 60.4881V90.5001Z'
            fill={color || 'currentColor'}
          />
        </g>
      </svg>

      <Flex
        position={'absolute'}
        className={styles.achievementContent}
      >
        {children}
      </Flex>
    </Flex>
  )
}
