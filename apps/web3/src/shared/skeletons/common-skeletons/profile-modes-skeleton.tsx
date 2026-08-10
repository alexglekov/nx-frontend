import { Box, Flex } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const ProfileModesSkeleton: React.FC = () => {
  return (
    <Flex
      width={'100%'}
      direction={'column'}
      gap={'1'}
    >
      <Flex
        width={'100%'}
        gap={'1'}
      >
        <Box width={'100%'}>
          <Skeleton
            width={'100%'}
            height={'9.5rem'}
          />
        </Box>
        <Box width={'100%'}>
          <Skeleton
            width={'100%'}
            height={'9.5rem'}
          />
        </Box>
      </Flex>
      <Flex
        width={'100%'}
        gap={'1'}
      >
        <Box width={'100%'}>
          <Skeleton
            width={'100%'}
            height={'9.5rem'}
          />
        </Box>
        <Box width={'100%'}>
          <Skeleton
            width={'100%'}
            height={'9.5rem'}
          />
        </Box>
        <Box width={'100%'}>
          <Skeleton
            width={'100%'}
            height={'9.5rem'}
          />
        </Box>
      </Flex>
    </Flex>
  )
}
