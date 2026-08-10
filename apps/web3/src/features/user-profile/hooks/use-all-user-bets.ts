// import { useEffect } from 'react'
// import { useLazyQuery } from '@apollo/client'
// import { GetUserBetsQuery } from '__generated__/graphql'
// import { GET_ALL_USER_BETS } from 'api/user-profile/get-user-bets'
// import { MY_BETS_TYPES } from 'shared/constants'


// WARN: temporary unaccessible on the BE, return it when it's will be available
// export function useAllUserBets(userId: string, activeType: string) {
//   const [getAllUserBets, { data, loading, error }] =
//     useLazyQuery<GetUserBetsQuery>(GET_ALL_USER_BETS, {
//       notifyOnNetworkStatusChange: true,
//       variables: {
//         data: {
//           userId,
//           latest: true,
//           take: 49,
//           isActive: activeType === MY_BETS_TYPES.ACTIVE
//         }
//       }
//     })

//   useEffect(() => {
//     if (!userId) return

//     getAllUserBets()
//   }, [userId, getAllUserBets, activeType])

//   const bets = data?.getUserBets?.predicts || []

//   return {
//     bets,
//     loading,
//     error
//   }
// }
