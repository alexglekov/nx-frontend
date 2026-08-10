import { useState, useEffect } from 'react'
import { EMAIL_REGEXP } from 'shared/constants/restrictive-units'
import { useDebounce } from 'use-debounce'

export const useValidateEmail = () => {
  const [email, setEmail] = useState('')
  const [isEmailInvalid, setIsEmailInvalid] = useState(false)

  const [debouncedEmail] = useDebounce(email, 500)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
  }

  useEffect(() => {
    if (!debouncedEmail) {
      setIsEmailInvalid(false)
      return
    }

    if (!EMAIL_REGEXP.test(debouncedEmail)) {
      setIsEmailInvalid(true)
    } else {
      setIsEmailInvalid(false)
    }
  }, [debouncedEmail])

  return {
    email,
    handleEmailChange,
    isEmailInvalid
  }
}
