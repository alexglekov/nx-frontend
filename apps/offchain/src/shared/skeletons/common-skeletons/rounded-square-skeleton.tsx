import { Box, Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Props {
  height?: string
  width?: string
  count?: number
}
export const RoundedSquareSkeleton: React.FC<Props> = ({
  height = '100%',
  width = '100%',
  count = 1
}) => {
  return (
    <Box
      width={'100%'}
      height={'100%'}
    >
      <Skeleton
        width={width}
        height={height}
        borderRadius={'var(--b-radius-2)'}
        count={count}
      />
    </Box>
  )
}
