import React from 'react'
import { Flex } from '@radix-ui/themes'
import { Responsive } from '@radix-ui/themes/dist/cjs/props/prop-def'
import classnames from 'classnames'
import { XyroLoaderLogo } from '../xyro-loader-logo'
import styles from './xyro-loading-spinner.module.scss'

interface Props {
  iconSize?: Responsive<string> | undefined
  variant?: 'dark' | 'light'
}
export const XyroLoadingSpinner: React.FC<Props> = ({
  iconSize = '100%',
  variant = 'light'
}) => {
  return (
    <Flex
      className={classnames(styles.loadingAnimation, {
        [styles.dark]: variant === 'dark'
      })}
      width={`${iconSize}rem`}
      height={`${iconSize}rem`}
    >
      <XyroLoaderLogo
        size={'100%'}
        color='white'
      />
    </Flex>
  )
}
