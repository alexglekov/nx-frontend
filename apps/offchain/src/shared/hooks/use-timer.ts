import { useEffect, useState } from 'react'
import { calculateCompletionPercentage, getEndDate } from 'shared/utils/timer'

export const useTimer = (startDate: Date, endDate: Date) => {
  const [remainingTimeText, setRemainingTimeText] = useState(
    getEndDate(endDate)
  )

  const [percentage, setPercentage] = useState(
    calculateCompletionPercentage(startDate, endDate)
  )

  const [remainingTimeMs, setRemainingTimeMs] = useState(
    endDate.getTime() - new Date().getTime()
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingText = getEndDate(endDate)
      const completedPercentage = calculateCompletionPercentage(
        startDate,
        endDate
      )
      const currentTime = new Date().getTime()
      const remainingTime = endDate.getTime() - currentTime

      setRemainingTimeText(remainingText)
      setPercentage(completedPercentage)
      setRemainingTimeMs(remainingTime)
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return {
    remainingTimeText,
    percentage,
    remainingTimeMs
  }
}
