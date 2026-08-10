import { FC } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import classnames from 'classnames'
import { DEEPLINK_METAMASK_MOBILE_APP } from 'features/auth/constants'
import { MetamaskLogoIcon } from 'shared/icons'
import { Maybe } from 'shared/types'
import { XyroLoading, RadixText, XyroLink } from 'shared/ui'
import { AuthButton } from '../auth-buttons'
import styles from '../../sign-up.module.scss'

interface Props {
  isMobile: Maybe<boolean>
  loading: boolean
  handleClick: () => void
}
export const AuthButtonMetamask: FC<Props> = ({
  isMobile,
  loading,
  handleClick
}) => {
  // NOTE: check if user is using mobile metamask browser
  const isDesktopMetamaskExtension =
    !isMobile && 'ethereum' in window && window.ethereum
  const isMobileMetamaskBrowser =
    isMobile && navigator.userAgent.includes('MetaMaskMobile')

  // NOTE: show button to login via metamask extension or app
  if (isMobileMetamaskBrowser || isDesktopMetamaskExtension) {
    return (
      <AuthButton
        onClick={handleClick}
        disabled={loading}
      >
        <XyroLoading loading={loading}>
          <MetamaskLogoIcon />
          <RadixText>Metamask</RadixText>
        </XyroLoading>
      </AuthButton>
    )
  }

  // NOTE: show deeplink for mobile metamask browser
  return <AuthLinkMetamaskMobile loading={loading} />
}

const AuthLinkMetamaskMobile = ({ loading }: { loading: boolean }) => {
  return (
    <Flex
      width={'100%'}
      align={'center'}
      direction={'column'}
      gap='2'
    >
      <XyroLink
        to={DEEPLINK_METAMASK_MOBILE_APP}
        className='width-full'
      >
        <Button
          className={classnames(styles.authButton, 'color-white', 'width-full')}
          disabled={loading}
          type='button'
          radius='large'
          size={'4'}
        >
          <XyroLoading loading={loading}>
            <MetamaskLogoIcon />
            <RadixText>Go to Metamask Browser</RadixText>
          </XyroLoading>
        </Button>
      </XyroLink>

      <RadixText
        size='1'
        color='gray'
        align={'center'}
        weight={'medium'}
      >
        Metamask Browser enhances the Web3 transaction experience for mobile
        users.
      </RadixText>
    </Flex>
  )
}
