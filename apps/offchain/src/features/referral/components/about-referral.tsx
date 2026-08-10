import React from 'react'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { referralProgramPath } from 'shared/images'
import { RouterPathes } from '../../../shared/constants'
import styles from '../referral.module.scss'

export const AboutReferral: React.FC = () => {
  return (
    <Flex
      className={styles.cardInfo}
      direction={'column'}
      position={'relative'}
      gap={'4'}
    >
      <Text
        size={'4'}
        className={'color-white'}
        weight={'bold'}
      >
        About Referral Program
      </Text>

      <Text
        size={'3'}
        className={cn('color-gray-light', styles.cardInfoText)}
      >
        At the end of the month, the TOP 3 participants with the highest prizes
      </Text>

      <img
        className={styles.cardInfoImage}
        src={referralProgramPath}
        alt={'card background'}
      />

      <Link
        to={RouterPathes['referral-about']}
        className={styles.referralAboutLink}
      >
        <ArrowTopRightIcon className={cn('color-pink', styles.pencilIcon)} />
      </Link>
    </Flex>
  )
}
