import { gql } from '@apollo/client'

export const MUTATION_CHECK_CHALLENGE_TASK_COMPLETION = gql`
  mutation checkChallengeTaskCompletion(
    $data: CheckChallengeTaskCompletionInput!
  ) {
    checkChallengeTaskCompletion(data: $data) {
      id
    }
  }
`
