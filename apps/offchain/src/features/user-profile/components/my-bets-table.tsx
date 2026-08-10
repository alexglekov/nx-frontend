import React, { useState } from 'react'
import { Card, Flex, Text } from '@radix-ui/themes'
import { User } from '__generated__/graphql'
import { MY_BETS_TYPES } from 'shared/constants'
import { BetsTypeSwitcher } from 'shared/ui/bets-type-switcher/bets-type-switcher'

interface Props {
  user: User
}
export const MyBetsTable: React.FC<Props> = ({ user }) => {
  const [activeType, setActiveType] = useState<string>(MY_BETS_TYPES.ACTIVE)

  // const { bets, loading } = useAllUserBets(user.id, activeType)

  const isCompleted = activeType === MY_BETS_TYPES.COMPLETED

  // if (loading) return <TableSkeleton />

  return (
    <Card size={'4'}>
      <Flex
        gap={'6'}
        align={'center'}
        mb={'6'}
      >
        <Text size={'7'}>My Games</Text>
        <BetsTypeSwitcher
          betsTypes={MY_BETS_TYPES}
          activeType={activeType}
          setActiveType={setActiveType}
        />
      </Flex>
      <Flex width={'100%'}>
        {/* WARN: return it when GetAllUserBets will be returned on BE */}
        {/* <BetsTable
          bets={bets}
          columns={myBetsTableColumns({ isCompleted, loading })}
          emptyStateText={`You don't have any ${activeType.toLowerCase()} games yet`}
        /> */}
      </Flex>
    </Card>
  )
}
