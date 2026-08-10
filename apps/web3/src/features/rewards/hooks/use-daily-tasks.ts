import { useEffect, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { DailyTasks } from '__generated__/graphql'
import { GET_DAILY_TASKS } from 'api/rewards/get-daily-tasks'
import { SUBSCRIPTION_DAILY_TASKS } from 'api/rewards/subscription-daily-tasks'

export const useDailyTasks = () => {
  const [facetedTasks, setFacetedTasks] = useState<DailyTasks['facetedTasks']>(
    []
  )
  const [simpleTasks, setSimpleTasks] = useState<DailyTasks['simpleTasks']>([])
  const [serialTasks, setSerialTasks] = useState<DailyTasks['serialTasks']>([])

  const {
    data: dailyTasksQuery,
    loading: queryLoading,
    refetch: refetchDailyTasks
  } = useQuery(GET_DAILY_TASKS)

  useEffect(() => {
    const dailyTasksQueryData = dailyTasksQuery?.getUserDailyTasks

    const queryFacetedTasks = dailyTasksQueryData?.facetedTasks
    const querySimpleTasks = dailyTasksQueryData?.simpleTasks
    const querySerialTasks = dailyTasksQueryData?.serialTasks

    if (queryFacetedTasks) setFacetedTasks(queryFacetedTasks)

    if (querySimpleTasks) setSimpleTasks(querySimpleTasks)

    if (querySerialTasks) setSerialTasks(querySerialTasks)
  }, [dailyTasksQuery])

  const { data: dailyTasksSubscription, loading: subscriptionLoading } =
    useSubscription(SUBSCRIPTION_DAILY_TASKS)

  useEffect(() => {
    const dailyTasksSubscriptionData =
      dailyTasksSubscription?.userDailyTasksChanged

    if (!dailyTasksSubscriptionData) return

    // TODO: Remove refetch when subscription will be fully ready
    refetchDailyTasks()
  }, [dailyTasksSubscription, refetchDailyTasks])

  return {
    facetedTasks,
    simpleTasks,
    serialTasks,
    loading: queryLoading || subscriptionLoading,
    refetchDailyTasks
  }
}
