import { Button, Flex, Heading, Link, Text } from '@radix-ui/themes'
import { XYRO_LINKS } from 'shared/constants'
import { XyroDialog } from '../xyro-dialog/xyro-dialog'
import styles from './contact-us.module.scss'

export const ContactUsDialog = () => {
  const { telegram, telegramShort, discordInvite, discordInviteShort } =
    XYRO_LINKS

  return (
    <XyroDialog
      dialogTrigger={
        <Button className={styles.contactUsButton}>CONTACT US</Button>
      }
      className={styles.contactUsDialog}
      isCloseButtonEnabled={false}
    >
      <Flex
        align={'center'}
        justify={'center'}
        direction={'column'}
        width={'100%'}
        py={'5'}
        gap={'2'}
      >
        <Heading
          align={'center'}
          weight={'medium'}
          className='color-white'
        >
          Contact us
        </Heading>

        <Flex
          gap='4'
          justify={'center'}
          direction={'column'}
          px='5'
        >
          <Text
            color='gray'
            align={'center'}
          >
            Please drop us a message and we&apos;ll respond as soon as possible!
          </Text>
          <Text
            size={'5'}
            align={'center'}
          >
            <Flex
              direction={'column'}
              align={{ initial: 'start', sm: 'center' }}
            >
              <ul className={styles.contactUsLinkList}>
                <li>
                  <Link href={discordInvite}>{discordInviteShort}</Link>{' '}
                  <Text className='color-white'>via Discord</Text>
                </li>
                <li>
                  <Link href={telegram}>{telegramShort}</Link>{' '}
                  <Text className='color-white'>via Telegram</Text>
                </li>
              </ul>
            </Flex>
          </Text>
        </Flex>
      </Flex>

      {/* // TODO: complete contact us form */}
      {/* <ContactUsForm /> */}
    </XyroDialog>
  )
}
