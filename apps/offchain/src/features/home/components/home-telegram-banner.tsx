import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { RouterPathes } from 'shared/constants'
import styles from '../home.module.scss'

export const HomeTelegramBanner: React.FC = () => {
  return (
    <Link
      to={RouterPathes.accountSocials}
      className={styles.telegramBannerWrapper}
    >
      <Flex
        align={'center'}
        justify={'between'}
        width={'100%'}
        direction={{ initial: 'column', sm: 'row' }}
        pl={{ initial: '2', sm: '20%' }}
        pr={{ initial: '2', sm: '5%' }}
        py={{ initial: '4', sm: '0' }}
        gap={{ initial: '4', sm: '0' }}
      >
        <Flex
          direction={'column'}
          gap={'3'}
          maxWidth={'42.5rem'}
        >
          <Text
            className='color-white'
            weight={'medium'}
            size={'7'}
            align={{ initial: 'center', sm: 'left' }}
          >
            Get <b className={styles.tgBannerPercentageText}>+5%</b> with
            Telegram
          </Text>

          <Text
            className='color-gray-light'
            size={'2'}
            weight={'medium'}
            align={{ initial: 'center', sm: 'left' }}
          >
            Link Telegram and enjoy{' '}
            <Text className='color-white'>+5% cashback</Text> for 2 weeks — fast
            and easy!
          </Text>
        </Flex>

        <Button
          variant='solid'
          color={'pink'}
          size={'4'}
          className={styles.tgBannerCTA}
        >
          <Text
            size={'2'}
            className='color-white'
            weight={'bold'}
          >
            LINKS TELEGRAM
          </Text>
        </Button>
      </Flex>
    </Link>
  )
}
