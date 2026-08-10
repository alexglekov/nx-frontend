import { Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const GraphSkeleton: React.FC = () => {
  return (
    <Box
      width={'100%'}
      height={'100%'}
    >
      <Skeleton
        width={'100%'}
        height={'60rem'}
        borderRadius={'var(--b-radius-2)'}
      />
    </Box>
  )
}
