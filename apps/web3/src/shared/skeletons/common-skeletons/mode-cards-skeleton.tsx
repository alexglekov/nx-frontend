import React from 'react'
import { Box, Grid } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'

export const ModeCardsSkeleton: React.FC = () => {
  return (
    <Grid
      columns={{
        initial: '1fr 1fr',
        sm: '1fr 1fr 1fr'
      }}
      width={'100%'}
      gap={{
        initial: '2',
        sm: '1'
      }}
      mb={'2'}
    >
      <Box width={'100%'}>
        <Skeleton
          width={'100%'}
          height={'30rem'}
          borderRadius={'5rem'}
        />
      </Box>
      <Box width={'100%'}>
        <Skeleton
          width={'100%'}
          height={'30rem'}
          borderRadius={'5rem'}
        />
      </Box>
      <Box width={'100%'}>
        <Skeleton
          width={'100%'}
          height={'30rem'}
          borderRadius={'5rem'}
        />
      </Box>
      <Box width={'100%'}>
        <Skeleton
          width={'100%'}
          height={'30rem'}
          borderRadius={'5rem'}
        />
      </Box>
      <Box width={'100%'}>
        <Skeleton
          width={'100%'}
          height={'30rem'}
          borderRadius={'5rem'}
        />
      </Box>
      <Box width={'100%'}>
        <Skeleton
          width={'100%'}
          height={'30rem'}
          borderRadius={'5rem'}
        />
      </Box>
    </Grid>
  )
}
