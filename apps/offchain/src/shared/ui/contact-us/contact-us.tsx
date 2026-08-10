import { Text, Card, Flex } from '@radix-ui/themes'
import { ContactUsDialog } from './contact-us-dialog'
import styles from './contact-us.module.scss'

export const ContactUs = () => {
  return (
    <Card className={styles.contactUsWrapper}>
      <Flex
        width='100%'
        justify={'between'}
        align={'center'}
      >
        <Text
          size='6'
          weight={'medium'}
        >
          Can’t find what you’re looking for?
        </Text>

        <ContactUsDialog />
      </Flex>
    </Card>
  )
}
