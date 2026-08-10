/* eslint-disable max-lines */
import React, { FC } from 'react'
import { Text, Button, Flex, Heading } from '@radix-ui/themes'
import cn from 'classnames'
import { DataTestIDs } from 'shared/constants'
import { RadixColorType, HeroBannerType } from 'shared/types'
import { XyroLink } from '../xyro-link'
import styles from './banner-slider.module.scss'
import { HERO_BANNERS } from './constants'

// type ResponsiveStyle =
//   | Responsive<'4' | '6' | '7' | '8' | '9' | '1' | '2' | '3' | '5'>
//   | undefined

type ResponsiveStyle = any

interface SlideProps {
  type: HeroBannerType
  handleClick?: () => void
  withButton?: boolean
  isClosed?: boolean
}
export const BannerSlide: FC<SlideProps> = ({
  type,
  handleClick,
  withButton = true,
  isClosed = false
}) => {
  const {
    cssClass,
    heading,
    text,
    callToAction,
    path,
    buttonColor,
    buttonText,
    isExternal,
    buttonDataTestId = ''
  } = HERO_BANNERS?.[type]

  const headingTitleStyeles =
    isClosed ? { initial: '4', sm: '6' } : { initial: '7', sm: '8' }

  const headingCallToActionStyles =
    isClosed ? { initial: '3', sm: '5' } : { initial: '6', sm: '7' }

  return (
    <Flex
      direction={isClosed ? 'row' : 'column'}
      justify='between'
      height='100%'
      width='100%'
      className={cn(styles.bannerSlide, cssClass, {
        [styles.bannerSlideClosed]: isClosed
      })}
      py={{ initial: isClosed ? '0' : '9', sm: isClosed ? '0' : '9' }}
      px={{ md: '6', initial: '4' }}
    >
      <Flex
        justify='between'
        height='100%'
        className={cn(styles.closedBlockImage, cssClass, {
          ['hidden']: !isClosed
        })}
        mr={{ initial: '0', sm: '2' }}
      />

      <Flex
        direction='column'
        width={'100%'}
      >
        <Heading
          className={styles.headingText}
          weight={'medium'}
          size={headingTitleStyeles as ResponsiveStyle}
          as='h2'
        >
          {heading}
          <br />
          <Text
            size={headingCallToActionStyles as ResponsiveStyle}
            weight={'medium'}
            color='yellow'
          >
            {callToAction}
          </Text>
        </Heading>

        <Text
          className={cn(styles.headingDescription, 'color-white', {
            ['hidden']: isClosed
          })}
          weight={'medium'}
          size={{ initial: '2', sm: '3' }}
          mt={'4'}
        >
          {text}
        </Text>
      </Flex>

      {withButton && (
        <BannerSlideButon
          buttonText={buttonText}
          buttonColor={buttonColor}
          handleClick={handleClick}
          isExternal={isExternal}
          path={path}
          isClosed={isClosed}
          buttonDataTestId={buttonDataTestId as DataTestIDs}
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
      variant='outline'
      className={cn(styles.bannerButton, 'cursor-pointer', {
        [styles.bannerButtonClosed]: isClosed
      })}
      color={buttonColor || 'sky'}
      {...(handleClick ? { onClick: handleClick } : {})}
      data-testid={buttonDataTestId}
    >
      {buttonText}
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
