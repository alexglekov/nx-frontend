/* eslint-disable max-statements */
import React, { useEffect, useRef } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useQueryParams } from 'shared/hooks/use-query'
import { linkedTagPath, notLinkedTagPath } from 'shared/images'
import { SOCIAL_OPTIONS_REDIRECT_URL } from '../constants'
import styles from '../user-settings.module.scss'

interface Props {
  isVerified?: boolean | null
  verifiedName?: string | null
}

export const UserSettingsTelegramSocialItem: React.FC<Props> = ({
  isVerified,
  verifiedName
}) => {
  const query = useQueryParams()

  const telegramWidgetRef = useRef<any>(null)

  useEffect(() => {
    const telegramId = query.get('id') || null

    if (isVerified && telegramId) return

    const scriptElement = document.createElement('script')
    scriptElement.src = 'https://telegram.org/js/telegram-widget.js?22'
    scriptElement.setAttribute('data-telegram-login', 'XYRO_Wizard_bot')
    scriptElement.setAttribute('data-size', 'large')
    scriptElement.setAttribute('data-userpic', 'false')
    scriptElement.setAttribute(
      'data-auth-url',
      SOCIAL_OPTIONS_REDIRECT_URL.TELEGRAM
    )
    scriptElement.setAttribute('data-request-access', 'write')
    scriptElement.async = true

    if (telegramWidgetRef === null) return

    telegramWidgetRef?.current?.appendChild(scriptElement)
  }, [isVerified])

  const formattedVerifiedName =
    verifiedName && verifiedName.length > 20 ?
      verifiedName.slice(0, 20) + '...'
    : verifiedName

  return (
    <Flex className={styles.telegramBannerWrapper}>
      <Flex
        align={'center'}
        justify={'between'}
        direction={{ initial: 'column', sm: 'row' }}
        width={'100%'}
        pl={{ initial: '0', sm: '20%' }}
        pr={{ initial: '0', sm: '5%' }}
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

        <Flex
          direction={'column'}
          align={{ initial: 'center', sm: 'end' }}
          gap={'4'}
        >
          <Flex
            align={'center'}
            gap={'2'}
          >
            <Text
              size={'2'}
              weight={'bold'}
              className='color-gray-light'
            >
              {isVerified ? formattedVerifiedName : 'Not linked'}
            </Text>

            {isVerified ?
              <img
                src={linkedTagPath}
                alt='linked tag'
              />
            : <img
                src={notLinkedTagPath}
                alt='not linked tag'
              />
            }
          </Flex>

          {!isVerified ?
            <div ref={telegramWidgetRef}></div>
          : null}
        </Flex>
      </Flex>
    </Flex>
  )
}
