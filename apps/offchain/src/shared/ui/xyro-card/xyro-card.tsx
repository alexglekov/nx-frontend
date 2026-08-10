import { Flex } from '@radix-ui/themes'
import styles from './xyro-card.module.scss'

interface Props {
  children?: React.ReactNode
  bgColor?: string
  size?: string
}
export const XyroCard: React.FC<Props> = ({
  children,
  bgColor = 'var(--gray)',
  size = '100%'
}) => {
  return (
    <Flex
      className={styles.xyroCard}
      position={'relative'}
      align={'center'}
      justify={'center'}
    >
      <Flex position={'absolute'}>{children}</Flex>
      <svg
        width={size}
        height={size}
        viewBox='0 0 61 62'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill={bgColor}
          fillRule='evenodd'
          clipRule='evenodd'
          d='M59.762 5.81614C60.9038 8.05706 60.9038 10.9906 60.9038 16.8577V16.858L58.2401 19.1248C57.8915 19.4215 57.6906 19.8563 57.6906 20.3141V42.8151C57.6906 43.2729 57.8915 43.7077 58.2401 44.0044L60.902 46.2696C60.8883 50.876 60.7708 53.3964 59.762 55.3762C58.7576 57.3474 57.155 58.95 55.1839 59.9544C52.9429 61.0962 50.0094 61.0962 44.1423 61.0962H39.231H33.2537H27.2763H18.6273C16.3637 61.0962 15.232 61.0962 14.1531 60.8664C13.196 60.6626 12.2722 60.3257 11.4086 59.8656C10.4351 59.3468 9.56907 58.6182 7.83691 57.161L5.97105 55.5913L5.97102 55.5913C3.77573 53.7444 2.67808 52.821 1.88919 51.6922C1.19018 50.692 0.671294 49.5774 0.355923 48.3986C0 47.0683 0 45.6339 0 42.765V29.355C0 19.1135 0 13.9927 1.99314 10.0809C3.74635 6.64006 6.54387 3.84254 9.98475 2.08933C13.8965 0.0961914 19.0173 0.0961914 29.2588 0.0961914H44.1423C50.0094 0.0961914 52.9429 0.0961914 55.1839 1.238C57.155 2.24236 58.7576 3.84497 59.762 5.81614Z'
        />
      </svg>

      {/* // TODO: return the removed glitch effects as css elements (not svg)*/}
      {/* <rect
        fill={bgColor}
        className={styles.cardGlitch}
        x='71.5547'
        y='4.48779'
        width='3.90409'
        height='3.91026'
        rx='1.56164'
      />
      <rect
        className={styles.cardGlitch}
        x='59.8047'
        y='30.3076'
        width='3.90409'
        height='3.91026'
        rx='1.56164'
        fill='white'
      />
      <path
        d='M1.45312 23.0674V37.9141'
        className={styles.cardGlitch}
        stroke='white'
        strokeWidth='1.56164'
        strokeLinecap='round'
      /> */}
    </Flex>
  )
}
