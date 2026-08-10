/* eslint-disable max-lines */
import React, { FC } from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { RadixColorType } from 'shared/types'
import { XyroLink } from '../xyro-link'
import { PROMOTION_BANNERS } from './constants'
import styles from './slider.module.scss'
import { SlideType } from './types'

interface SlideProps {
  type: SlideType
  handleClick?: () => void
  withButton?: boolean
}
export const Slide: FC<SlideProps> = ({
  type,
  handleClick,
  withButton = true
}) => {
  const { cssClass, path, buttonColor, buttonText, isExternal, textItem } =
    PROMOTION_BANNERS?.[type]

  return (
    <Flex
      direction={'column'}
      justify='between'
      height='100%'
      width='100%'
      gap={{ initial: '3', sm: '0' }}
      className={cn(styles.bannerSlide, cssClass)}
      py={{ initial: '9', sm: '9' }}
      px={{ md: '6', initial: '4' }}
    >
      {textItem}

      {withButton && (
        <BannerSlideButon
          buttonText={buttonText}
          buttonColor={buttonColor}
          handleClick={handleClick}
          isExternal={isExternal}
          path={path}
        />
      )}
    </Flex>
  )
}

interface NavigateButtonProps {
  buttonColor?: RadixColorType
  handleClick?: () => void
  buttonText: string
  isClosed?: boolean
  buttonDataTestId?: DataTestIDs | ''
}
const NavigateButton: React.FC<NavigateButtonProps> = ({
  buttonColor,
  handleClick,
  buttonText,
  isClosed,
  buttonDataTestId = ''
}) => {
  return (
    <Button
      variant='ghost'
      className={cn(styles.bannerButton, 'cursor-pointer', {
        [styles.bannerButtonClosed]: isClosed
      })}
      color={buttonColor || 'sky'}
      {...(handleClick ? { onClick: handleClick } : {})}
      data-testid={buttonDataTestId}
    >
      <Text
        className={'color-white'}
        weight={'bold'}
      >
        {buttonText}
      </Text>
    </Button>
  )
}

interface BannerSlideButonProps {
  path?: string
  buttonColor?: RadixColorType
  handleClick?: () => void
  buttonText: string
  isClosed?: boolean
  isExternal?: boolean
  buttonDataTestId?: DataTestIDs
}
const BannerSlideButon: React.FC<BannerSlideButonProps> = ({
  path,
  buttonColor,
  handleClick,
  buttonText,
  isClosed,
  isExternal,
  buttonDataTestId
}) => {
  return (
    <>
      {path ?
        <XyroLink
          to={path}
          target={isExternal ? '_blank' : undefined}
          className={styles.bannerSlideLinkWrapper}
        >
          <Flex
            height={'100%'}
            width={'100%'}
            className={styles.bannerSlideLink}
          >
            <NavigateButton
              buttonColor={buttonColor}
              handleClick={handleClick}
              buttonText={buttonText}
              isClosed={isClosed}
              buttonDataTestId={buttonDataTestId}
            />
          </Flex>
        </XyroLink>
      : <NavigateButton
          buttonColor={buttonColor}
          handleClick={handleClick}
          buttonText={buttonText}
          isClosed={isClosed}
          buttonDataTestId={buttonDataTestId}
        />
      }
    </>
  )
}
