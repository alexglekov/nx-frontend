export const getEndDate = (endDate: Date) => {
  const unixTimestamp = endDate.getTime()

  const totalSeconds = (unixTimestamp - Date.now()) / 1000

  const days = Math.floor(totalSeconds / (24 * 3600))
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)

  return `${String(days).padStart(2, '0')}d : ${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m`
}

// eslint-disable-next-line max-statements
export const calculateCompletionPercentage = (
  startDate: Date,
  endDate: Date
) => {
  const targetUnixTimestamp = endDate.getTime()

  const startUnixTimestamp = startDate.getTime()

  const totalDurationSeconds = (targetUnixTimestamp - startUnixTimestamp) / 1000

  const currentTime = Date.now()
  const elapsedTimeSeconds = Math.max(
    0,
    (currentTime - startUnixTimestamp) / 1000
  )

  const completedPercentage = Math.min(
    100,
    (elapsedTimeSeconds * 100) / totalDurationSeconds
  )

  return completedPercentage
}
