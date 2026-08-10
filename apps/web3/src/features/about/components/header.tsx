import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import { XyroLogoText, XyroTokenMetallic } from 'shared/icons'
import { SocialTypes } from '../constants'
import { SocialItem } from './social-item'
import styles from '../about.module.scss'

const Header: React.FC = () => {
  return (
    <Flex
      width={'100vw'}
      className={styles['header-wrapper']}
    >
      <Flex
        className={styles.header}
        justify={'between'}
        align={'center'}
        width={'100%'}
      >
        <Flex
          align={'center'}
          gap={'1'}
        >
          <XyroTokenMetallic
            height={'3rem'}
            width={'3rem'}
          />

          <XyroLogoText
            width={'9.5rem'}
            height={'3.75rem'}
          />
        </Flex>

        <Flex
          align={'center'}
          gap={'2'}
        >
          <SocialItem
            type={SocialTypes.discord}
            position={'header'}
          />

          <SocialItem
            type={SocialTypes.twitter}
            position={'header'}
          />

          <SocialItem
            type={SocialTypes.telegram}
            position={'header'}
          />
        </Flex>

        <Link to={RouterPathes.home}>
          <Button className={styles.launchAppBtn}>
            <Text
              className='color-white'
              size={{ initial: '3', sm: '2' }}
              weight={'bold'}
            >
              LAUNCH DAPP
            </Text>
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Header
