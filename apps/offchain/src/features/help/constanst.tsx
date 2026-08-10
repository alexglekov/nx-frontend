/* eslint-disable max-lines */
/* eslint-disable react/no-unescaped-entities */
import { Flex, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import styles from './help.module.scss'

export const QUESTIONS = [
  {
    text: 'What is xyro.io?',
    answer: (
      <Flex
        direction={'column'}
        gap={'3'}
      >
        <Text
          className={styles.answerItem}
          ml='2'
        >
          XYRO is an AI-powered gamified trading platform that leverages
          gamification and social features to redefine crypto, making it
          accessible and engaging.
        </Text>
        <Text
          className={styles.answerItem}
          ml='2'
        >
          We&apos;re blending GameFi & SocialFi to revolutionize trading and
          prediction making, making crypto both accessible and attractive.
          xyro.io - the world&apos;s first Gamified Social trading platform,
          where each game mode represents an exhilarating journey into the realm
          of cryptocurrencies.
        </Text>
      </Flex>
    )
  },
  {
    text: 'How can I register an account on XYRO?',
    answer: (
      <>
        <Text
          className={styles.answerItem}
          ml='2'
        >
          Registration is available only through crypto wallets. Currently, XYRO
          supports Metamask and Wallet Connect.
        </Text>
      </>
    )
  },
  {
    text: 'What game modes will be available during the Mainnet?',
    answer: (
      <>
        <Text
          className={styles.answerItem}
          ml='2'
        >
          During the Mainnet four game modes will be available: Bull's Eye,
          Setups, Up/Down, and 1v1. Additional game modes are in development and
          will be introduced in the future.
        </Text>
      </>
    )
  },
  {
    text: 'Does xyro.io reward for bugs?',
    answer: (
      <>
        <Text
          className={styles.answerItem}
          ml='2'
        >
          Any bug that has an adverse impact on xyro.io or its users will be
          rewarded appropriately. This is limited to bugs with security or
          business consequences. Examples can include ability to access another
          user&apos;s account or ability to manipulate your balance. Please
          contact our support immediately if you&apos;d like to report a bug of
          this nature.
        </Text>
      </>
    )
  },
  {
    text: 'Where can I suggest a new idea?',
    answer: (
      <>
        <Text
          className={styles.answerItem}
          ml='2'
        >
          To suggest an idea to enhance xyro.io, use the&nbsp;
          <Link
            to={
              'https://discord.com/channels/1193903112956682271/1194251666522919002'
            }
            target='_blank'
          >
            💭・suggestions
          </Link>
          &nbsp; channel. The best suggestions will be rewarded with a&nbsp;
          <Link
            to={
              'https://discord.com/channels/1193903112956682271/1193917506113515681/1194913259304779776'
            }
            target='_blank'
          >
            @🧠 Gigabrain
          </Link>
          &nbsp;role.
        </Text>
      </>
    )
  }
]
