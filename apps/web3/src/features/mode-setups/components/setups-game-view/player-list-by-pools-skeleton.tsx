import { Flex } from "@radix-ui/themes"
import { RoundedSquareSkeleton } from "shared/skeletons/common-skeletons/rounded-square-skeleton"

export const PlayerListByPoolsSkeleton = () => {
  return <Flex
  direction={'column'}
  gap='3'
>
  <RoundedSquareSkeleton height='6rem' />
  <Flex
    gap='3'
    pt='2'
  >
    <RoundedSquareSkeleton
      height='70rem'
      width='30rem'
    />
    <RoundedSquareSkeleton
      height='70rem'
      width='30rem'
    />
  </Flex>
</Flex>}