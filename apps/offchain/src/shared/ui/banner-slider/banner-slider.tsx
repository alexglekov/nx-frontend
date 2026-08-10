import React, { useCallback, useState } from 'react'
import { Card, Button } from '@radix-ui/themes'
import cn from 'classnames'
import { XyroButton } from 'shared/components'
import { ArrowDownSingle } from 'shared/icons'
import { HeroBannerType } from 'shared/types'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { BannerSlide } from './banner-slide'
import styles from './banner-slider.module.scss'
import { AUTOPLAY_OPTIONS, PAGINATION_OPTIONS } from './constants'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

interface Props {
  banners: HeroBannerType[]
  handleClick?: () => void
  withButton?: boolean
  isClosedDefault?: boolean
}
export const BannerSlider: React.FC<Props> = ({
  banners,
  handleClick,
  withButton = true,
  isClosedDefault = false
}) => {
  const [isClosed, setIsClosed] = useState(isClosedDefault)

  const handleCollapse = useCallback(() => {
    setIsClosed(!isClosed)
  }, [isClosed])

  return (
    <Card
      variant='ghost'
      className={cn(styles.bannerSliderContainer, {
        [styles.bannerSliderContainerClosed]: isClosed
      })}
    >
      <XyroButton
        className={cn(styles.collapseButton, {
          [styles.collapseButtonClosed]: isClosed
        })}
        color='gray'
        shape='cutted-both'
        onClick={handleCollapse}
      >
        <ArrowDownSingle
          color='var(--white)'
          className={cn(styles.arrowDownSingle, {
            [styles.arrowDownSingleReversed]: !isClosed
          })}
        />
      </XyroButton>

      <Swiper
        modules={[Pagination, EffectFade, Autoplay]}
        pagination={PAGINATION_OPTIONS}
        className={cn(styles.bannerSlider, {
          [styles.bannerSliderClosed]: isClosed
        })}
        effect='fade'
        autoplay={AUTOPLAY_OPTIONS}
        loop
      >
        {banners.map(type => (
          <SwiperSlide key={type}>
            <BannerSlide
              type={type}
              handleClick={handleClick}
              withButton={withButton}
              isClosed={isClosed}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  )
}
