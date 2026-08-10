import { Flex } from '@radix-ui/themes'
import React from 'react'
import { ProfileModesItem } from './profile-mode-item'
import { PROFILE_MODES } from '../constants'

export const ProfileModes: React.FC = () => {
  const formattedArray = [PROFILE_MODES.slice(0, 2), PROFILE_MODES.slice(2, 5)]
  return (
    <Flex
      width={'100%'}
      direction={'column'}
      gap={'1'}
    >
      {formattedArray.map((el, index) => {
        const isBgHasLeftPosition = Boolean(index !== 0)
        return (
          <Flex
            key={index}
            width={'100%'}
            gap={'1'}
          >
            {el.map(mode => {
              return (
                <ProfileModesItem
                  key={mode.title}
                  item={mode}
                  backgroundElementLeft={isBgHasLeftPosition}
                />
              )
            })}
          </Flex>
        )
      })}
    </Flex>
  )
}
