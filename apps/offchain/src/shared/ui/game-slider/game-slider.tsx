import React, { useRef } from 'react'
import { Card } from '@radix-ui/themes'
import { ProviderGamesCatalog } from '__generated__/graphql'
import { Mousewheel, FreeMode } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

import 'swiper/css'

import { GamesSliderSkeleton } from '../../skeletons/games/games-slider-skeleton'
import { GameCard } from '../game-card/game-card'
import styles from './game-slider.module.scss'

interface Props {
  games: ProviderGamesCatalog[]
  loading?: boolean
}

export const GameSlider: React.FC<Props> = ({ games, loading }) => {
  const swiperRef = useRef<SwiperRef>(null)
  const gameCardRefs = useRef<(HTMLAnchorElement | null)[]>([])

  if (loading) {
    return <GamesSliderSkeleton />
  }

  const slides = []

  for (let i = 0; i < games.length; i += 2) {
    slides.push([games[i], games[i + 1]])
  }

  return (
    <Card
      variant='ghost'
      className={styles.gameSliderContainer}
    >
      <Swiper
        className={styles.gameSlider}
        modules={[Mousewheel, FreeMode]}
        spaceBetween={16}
        slidesPerView='auto'
        freeMode
        mousewheel
        ref={swiperRef}
      >
        {slides.map((pair, slideIndex) => (
          <SwiperSlide
            key={slideIndex}
            className={styles.gameSliderSlide}
          >
            <GameCard
              ref={el => {
                gameCardRefs.current[slideIndex * 2] = el
              }}
              game={pair[0]}
            />

            {pair[1] && (
              <GameCard
                ref={el => {
                  gameCardRefs.current[slideIndex * 2 + 1] = el
                }}
                game={pair[1]}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  )
}
