import { ApolloError } from "@apollo/client"
import { UNAUTHORIZED } from "app/constants"
import { notifyOnUnknownError } from "shared/utils/notify-on-error"

export const showSignUpDialogOrError = (e: ApolloError) => {
  if (e.message !== UNAUTHORIZED) {
    notifyOnUnknownError(e)
    return
  }
}