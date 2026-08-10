import { useEffect, useState } from 'react'
import {
  calculateCompletionPercentage,
  getEndDate
} from 'shared/utils/get-payments-start-date'

export const usePaymentsStartDate = (startDate: Date, endDate: Date) => {
  const [paymentsWillStart, setPaymentsWillStart] = useState(
    getEndDate(endDate)
  )

  const [paymentsWillStartPercentage, setPaymentsWillStartPercentage] =
    useState(calculateCompletionPercentage(startDate, endDate))

  const [remainingTimeMs, setRemainingTimeMs] = useState(
    endDate.getTime() - new Date().getTime()
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const paymentsWillStartDate = getEndDate(endDate)
      const paymentsStartCompletedPercentage = calculateCompletionPercentage(
        startDate,
        endDate
      )
      const currentTime = new Date().getTime()
      const remainingTime = endDate.getTime() - currentTime

      setPaymentsWillStart(paymentsWillStartDate)
      setPaymentsWillStartPercentage(paymentsStartCompletedPercentage)
      setRemainingTimeMs(remainingTime)
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return {
    paymentsWillStart,
    paymentsWillStartPercentage,
    remainingTimeMs
  }
}
