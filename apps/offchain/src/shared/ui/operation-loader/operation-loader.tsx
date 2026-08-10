import React from 'react'
import { Flex } from '@radix-ui/themes'
import styles from './operation-loader.module.scss'

// TODO: extract the loader to shared components
export const OperationLoader: React.FC = () => {
  return (
    <Flex className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </Flex>
  )
}
