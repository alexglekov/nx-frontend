import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { v4 } from 'uuid'
import styles from '../rewards.module.scss'

const LINK_REG_EXP = /(https?:\/\/[^\s]+)/g

interface Props {
  text: string
}
export const RewardsChallengeItemTaskText: React.FC<Props> = ({ text }) => {
  const formatTextWithLinks = (text: string): React.ReactNode[] => {
    const parts = text.split(LINK_REG_EXP)

    return parts.map(part => {
      if (part.match(LINK_REG_EXP)) {
        const linkText = part.replace('https://', '')

        return (
          <Link
            key={v4()}
            to={part}
            target='_blank'
          >
            {linkText}
          </Link>
        )
      }

      const splittedTextParts = part.split('\n')

      return splittedTextParts.map(text => {
        return (
          <Flex key={v4()}>
            <Text
              weight={'medium'}
              size={'2'}
              className={cn('color-white', styles.challengeItemDescription)}
            >
              {text}
            </Text>

            <br />
          </Flex>
        )
      })
    })
  }

  return <Box>{formatTextWithLinks(text)}</Box>
}
