/* eslint-disable max-lines */
import React, { FC } from 'react'
import { Card, Flex, Separator, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { useResponsive } from 'shared/hooks/use-responsive'
import {
  DiscordBoxLogoIcon,
  InstagramBoxLogoIcon,
  TelegramBoxLogoIcon,
  TwitterBoxLogoIcon,
  XyroTokenMetallicTwo
} from 'shared/icons'
import { XyroLogoLink } from 'shared/ui'
import styles from '../mobile-stub.module.scss'

interface Props {
  children?: React.ReactNode
  isActive?: boolean
}
export const MobileStub: FC<Props> = ({ children, isActive = true }) => {
  const [isMobile] = useResponsive(['xs', 'sm'])

  if (!isMobile || !isActive) return <>{children}</>

  return (
    <Card asChild>
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
            direction={'column'}
            gap={'3'}
            align={'center'}
            justify={'center'}
            pt={'6'}
          >
            <XyroTokenMetallicTwo
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
            We’re blending <b>GameFi</b> & <b>SocialFi</b>
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
          mt={'5'}
          className={styles.mainContent}
        >
          {/* NOTE: Uncomment this block if you want to show the main title
           */}
          {/* <Flex
          direction={'column'}
          align={'center'}
          justify={'center'}
          mt={'3'}
          gap={'5'}
          >
          <Text
          size={'8'}
          weight={'bold'}
          align={'center'}
          className={styles.mainTitle}
          >
          The Fascinating World of{' '}
          <span className={styles.titleGreen}>Gamified Social Trading</span>
          </Text>
          </Flex> */}

          <Flex
            direction={'column'}
            gap={'6'}
            align={'center'}
            justify={'center'}
            mt={'6'}
            mb={'9'}
            px={'4'}
          >
            <Text
              className={styles.adventureText}
              size={'5'}
              align={'center'}
            >
              Mobile version is under development
            </Text>
            <Flex
              align={'center'}
              gap={'2'}
            >
              <Text
                className={styles.comingSoonText}
                size={'6'}
                align={'center'}
              >
                The mobile version of this page is still under development and
                <br /> will be available soon.
                <br />
                <br />
                In the meantime, please use the desktop version for the best
                experience.
              </Text>
            </Flex>
          </Flex>

          <Flex
            direction={'column'}
            gap={'1'}
            align={'center'}
            justify={'end'}
            className={styles.socialLinks}
          >
            <Text
              size={'2'}
              weight={'medium'}
              align={'center'}
              className='color-white'
            >
              Join Community:
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
              <Link
                to={'https://www.instagram.com/xyroio'}
                target='__blank'
              >
                <InstagramBoxLogoIcon />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}
