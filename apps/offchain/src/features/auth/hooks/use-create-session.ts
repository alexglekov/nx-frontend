import { useMutation } from '@apollo/client'
import {
  SignInEmailAuthInput,
  SignUpEmailAuthInput
} from '__generated__/graphql'
import { MUTATION_AUTH_EMAIL_SIGN_IN } from 'api/auth/mutation-auth-email-sign-in'
import { MUTATION_AUTH_EMAIL_SIGN_UP } from 'api/auth/mutation-auth-email-sign-up'

export const useCreateSession = () => {
  const [commitSignIn, { loading: signInLoading }] = useMutation(
    MUTATION_AUTH_EMAIL_SIGN_IN
  )
  const [commitSignUp, { loading: signUpLoading }] = useMutation(
    MUTATION_AUTH_EMAIL_SIGN_UP
  )

  const handleSignUp = async (input: SignUpEmailAuthInput) => {
    await commitSignUp({
      variables: {
        data: input
      }
    })
  }

  const handleSignIn = async (input: SignInEmailAuthInput) => {
    await commitSignIn({
      variables: {
        data: input
      }
    })
  }

  return {
    handleSignIn,
    handleSignUp,
    signInLoading,
    signUpLoading
  }
}
