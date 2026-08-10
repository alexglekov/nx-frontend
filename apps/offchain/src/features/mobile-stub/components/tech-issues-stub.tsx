/* eslint-disable max-lines */
import React from 'react'
import { Flex, Separator, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import {
  DiscordBoxLogoIcon,
  TelegramBoxLogoIcon,
  TwitterBoxLogoIcon,
  XyroTokenMetallic
} from 'shared/icons'
import {
  globalOverlayAssetsLoadingVar,
  globalOverlayBalanceLoadingVar,
  globalOverlayLoadingVar,
  globalOverlayUserLoadingVar
} from 'shared/store/global-overlay-state-store'
import { XyroLogoLink } from 'shared/ui'
import styles from '../mobile-stub.module.scss'

export const TechIssuesStub: React.FC = () => {
  globalOverlayBalanceLoadingVar(false)
  globalOverlayUserLoadingVar(false)
  globalOverlayAssetsLoadingVar(false)

  globalOverlayLoadingVar(false)

  return (
    <Flex
      direction={'column'}
      width={'100%'}
      className={styles.stubContainer}
    >
      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
        gap={'2'}
      >
        <Flex
          gap={'3'}
          align={'center'}
          justify={'center'}
          pt={'4'}
        >
          <XyroTokenMetallic
            height={'6rem'}
            width={'6rem'}
          />

          <XyroLogoLink
            className={styles.headerTitle}
            withLogo={false}
          />
        </Flex>

        <Text
          className='color-white'
          size={'3'}
          weight={'medium'}
        >
          AI-powered gamified trading platform.
        </Text>

        <Separator
          size={'2'}
          mt={'3'}
        />
      </Flex>

      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
        mt={'9'}
      >
        <Flex
          direction={'column'}
          gap={'6'}
          align={'center'}
          justify={'center'}
          my={'8'}
          px={'4'}
        >
          <Text
            className={styles.adventureText}
            size={'6'}
            align={'center'}
          >
            Technical works are underway.
            <br />
            <br />
            Thank you for your patience!
            <br />
            <br /> <Text size='5'>— Development Team</Text>
          </Text>
        </Flex>

        <Flex
          direction={'column'}
          gap={'1'}
          mt='9'
        >
          <Text
            size={'2'}
            weight={'medium'}
            align={'center'}
            className='color-white'
          >
            Contact with us:
          </Text>
          <Flex
            align={'center'}
            gap={'2'}
          >
            <Link
              to={'https://discord.gg/xyro'}
              target='__blank'
            >
              <DiscordBoxLogoIcon />
            </Link>
            <Link
              to={'https://x.com/xyro_io'}
              target='__blank'
            >
              <TwitterBoxLogoIcon />
            </Link>
            <Link
              to={'https://t.me/xyro_io'}
              target='__blank'
            >
              <TelegramBoxLogoIcon />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
