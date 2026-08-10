import { useQuery } from '@apollo/client'
import { GET_LOYALTY_TIERS } from 'api/user-profile/get-loaylty-tiers'

export const useLoyaltyTiers = () => {
  const { data, loading } = useQuery(GET_LOYALTY_TIERS)

  const loyaltyTiers = data?.loyaltyTiers || []

  const loyaltyTiersWithTier = loyaltyTiers.map(tier => ({
    ...tier,
    levels: tier.levels.map(level => ({
      ...level,
      tier: tier.tier
    }))
  }))

  return {
    tiers: loyaltyTiersWithTier,
    loading
  }
}
