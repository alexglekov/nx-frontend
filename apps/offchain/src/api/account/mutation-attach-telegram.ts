import { gql } from '__generated__'

export const MUTATION_ATTACH_TELEGRAM = gql(`
  mutation attachTelegram($data: AttachTelegramInput!) {
    attachTelegram(data: $data)
  }
`)
