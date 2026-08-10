import { useReactiveVar } from '@apollo/client'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { XYRO_LINKS } from 'shared/constants'
import { LockIcon } from 'shared/icons'
import { isUserAccessDeniedVar } from 'shared/store/user'
import { XyroLink } from 'shared/ui'
import { XyroDialog } from '../../ui/xyro-dialog/xyro-dialog'
import styles from './access-denied-modal.module.scss'

export const AccessDeniedModal: React.FC = () => {
  const isUserAccessDenied = useReactiveVar(isUserAccessDeniedVar)

  return (
    <XyroDialog
      open={isUserAccessDenied}
      className={styles.dialogContainer}
      isCloseButtonEnabled={false}
    >
      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
        gap={'3'}
        width={'100%'}
      >
        <LockIcon
          color='var(--gray)'
          width='8rem'
          height='8rem'
        />
        <Heading
          as={'h3'}
          size={'7'}
          align={'center'}
          my={'2'}
        >
          Access Restricted
        </Heading>

        <Flex
          direction={'column'}
          align={'center'}
          gap={'3'}
          mb={'4'}
        >
          <Text
            size={'4'}
            align={'center'}
            weight={'regular'}
          >
            For legal resons XYRO and it&apos;s services are not available in
            your region. If you are using a VPN, please disable it and
            try&nbsp;again.
          </Text>
          <Text
            size={'4'}
            align={'center'}
            weight={'regular'}
          >
            If you believe you&apos;ve received this message in error, please
            contact our{' '}
            <XyroLink
              color='green'
              to={XYRO_LINKS.telegram}
            >
              support team in Telegram
            </XyroLink>
            .
          </Text>
        </Flex>
      </Flex>
    </XyroDialog>
  )
}
