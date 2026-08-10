import { Flex } from '@radix-ui/themes'
import { SetupsGamePoolFragment } from '__generated__/graphql'
import { FundsUpCircleIcon, UserIcon, WarningTriangleIcon } from 'shared/icons'
import { RadixText, XyroNumeral, TetherToken } from 'shared/ui'
import { formatToXyro } from 'shared/utils/format-price'

export const PoolInfo = ({ pool }: { pool: SetupsGamePoolFragment }) => {
  if (pool.poolAmount === 0)
    return (
      <>
        <WarningTriangleIcon
          color={'var(--cyan)'}
          width={24}
          height={24}
        />
        <RadixText
          color='cyan'
          weight={'medium'}
        >
          Waiting for players
        </RadixText>
      </>
    )

  if (pool.multiplier > 2)
    return (
      <>
        <FundsUpCircleIcon
          color={'var(--yellow)'}
          width={24}
          height={24}
        />
        <RadixText
          color='yellow'
          weight={'medium'}
        >
          Win big prize!
        </RadixText>
      </>
    )

  return (
    <>
      <Flex
        align={'center'}
        gap={'1'}
      >
        <TetherToken
          size='2rem'
          color='yellow'
        />
        <XyroNumeral
          size={'3'}
          isWhite
        >
          {formatToXyro(pool?.poolAmount)}
        </XyroNumeral>
      </Flex>
      <Flex
        align={'center'}
        gap={'1'}
      >
        <UserIcon color={'var(--gray)'} />
        <XyroNumeral
          isWhite={false}
          size={'3'}
          color='gray'
        >
          {pool.predictsCount}
        </XyroNumeral>
      </Flex>
    </>
  )
}
