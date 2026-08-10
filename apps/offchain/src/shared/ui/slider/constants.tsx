import { Flex, Text } from '@radix-ui/themes'
import styles from './slider.module.scss'
import { Banner, SlideType } from './types'

export const AUTOPLAY_OPTIONS = {
  delay: 8000,
  disableOnInteraction: true,
  pauseOnMouseEnter: true
}
export const PAGINATION_OPTIONS = {
  clickable: true
}

const PromotionBannerText = () => (
  <Flex
    className={styles.promotionWrapper}
    direction={'column'}
    gap={{ initial: '4', sm: '5' }}
  >
    <Text
      size={'2'}
      className={'color-gray'}
    >
      PROMOTIONS
    </Text>

    <Text
      size={{ initial: '8', sm: '9' }}
      className={styles.promotionTitle}
    >
      Win{' '}
      <Text
        as={'span'}
        size={{ initial: '8', sm: '9' }}
        className={styles.promotionAmount}
      >
        $50,000
      </Text>
      <br />
      the Easy Way!
    </Text>
  </Flex>
)

export const PROMOTION_BANNERS: Record<SlideType, Banner> = {
  promotion: {
    path: '#',
    buttonText: 'GO TO PRIZE',
    buttonColor: 'violet',
    isExternal: false,
    textItem: <PromotionBannerText />,
    cssClass: styles.promotion
  }
}
