import { FC } from 'react'
import { Flex } from '@radix-ui/themes'
import { Maybe, SetupsGamePoolFragment } from '__generated__/graphql'
import { UserIcon } from 'shared/icons'
import { DotTitle, TetherToken, XyroNumeral } from 'shared/ui'

interface Props {
  pool: Maybe<SetupsGamePoolFragment>
}
export const SetupsExitStrategyPoolSize: FC<Props> = ({ pool }) => {
  return (
    <Flex
      direction={'column'}
      gap={'2'}
    >
      <DotTitle
        color={'gray'}
        withDot={false}
      >
        pool size:
      </DotTitle>

      <Flex
        gap={'2'}
        wrap={'wrap'}
      >
        <Flex
          align={'center'}
          gap='1'
        >
          <TetherToken
            color='yellow'
            size='2rem'
          />
          <XyroNumeral
            isWhite
            size={'3'}
          >
            {pool?.poolAmount ?? 0}
          </XyroNumeral>
        </Flex>

        <Flex
          align={'center'}
          gap='1'
        >
          <UserIcon
            width={'1.5rem'}
            height={'1.5rem'}
            color={'var(--gray)'}
          />
          <XyroNumeral
            isWhite={false}
            color='gray'
            size={'1'}
          >
            {pool?.predictsCount ?? 0}
          </XyroNumeral>
        </Flex>
      </Flex>
    </Flex>
  )
}
