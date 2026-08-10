import { useMutation } from '@apollo/client'
import { ClaimRewardMutation } from '__generated__/graphql'
import { MUTATION_CLAIM_REWARD } from 'api/rewards/mutation-claim-reward'
import { notificationStateVar } from 'shared/store/notification'

export const useCollectRewardTask = (id: string) => {
  const [commitClaimReward, { loading: claimRewardLoading }] =
    useMutation<ClaimRewardMutation>(MUTATION_CLAIM_REWARD)

  const handleClaimReward = () => {
    if (!id) return

    commitClaimReward({
      variables: {
        data: {
          id
        }
      },
      onCompleted: notifyOnRewardClaimSuccess,
      onError: notifyOnRewardClaimError
    })
  }

  return {
    handleClaimReward,
    claimRewardLoading
  }
}

const notifyOnRewardClaimSuccess = () => {
  notificationStateVar({
    isOpen: true,
    type: 'success',
    title: 'Success',
    description: 'Reward was successfully claimed'
  })
}

const notifyOnRewardClaimError = () => {
  notificationStateVar({
    isOpen: true,
    type: 'error',
    title: 'Error!',
    description: 'Reward was not claimed. Something went wrong..'
  })
}
