import React, { useState } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { OFFCHAIN_URL } from 'app/constants'
import classNames from 'classnames'
import styles from './app-switch.module.scss'

export const AppSwitch: React.FC = () => {
  const [activeTab, setActiveTab] = useState('right')

  const handleTabClick = (tab: 'left' | 'right') => {
    if (tab !== activeTab) {
      setActiveTab(tab)
    }

    if (tab === 'left') {
      setTimeout(() => {
        window.location.assign(OFFCHAIN_URL)

        setActiveTab('right')
      }, 300)
    }
  }

  return (
    <Flex
      className={classNames(styles.wrapper, {
        [styles.left]: activeTab === 'left',
        [styles.right]: activeTab === 'right'
      })}
    >
      <Flex
        className={classNames(styles.tabSwitch, {
          [styles.left]: activeTab === 'left',
          [styles.right]: activeTab === 'right'
        })}
      >
        <Button
          className={classNames(styles.tab, {
            [styles.active]: activeTab === 'left'
          })}
          onClick={() => handleTabClick('left')}
        >
          iTRADING
        </Button>

        <Button
          className={classNames(styles.tab, {
            [styles.active]: activeTab === 'right'
          })}
          onClick={() => handleTabClick('right')}
        >
          iGAMING
        </Button>
      </Flex>
    </Flex>
  )
}
