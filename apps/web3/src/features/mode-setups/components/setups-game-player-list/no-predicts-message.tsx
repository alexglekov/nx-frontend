import { Box } from '@radix-ui/themes'
import { RadixText } from 'shared/ui'

// TODO: move to shared components
export const NoPredictsMessage = () => (
  <Box py='3'>
    <RadixText
      size='5'
      mt='5'
      weight={'medium'}
      color={'gray'}
    >
      There are no predicts yet
    </RadixText>
  </Box>
)
