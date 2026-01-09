export type PlanType = 'free' | 'pro' | 'business'

export interface PlanLimits {
  emailsPerDomain: number
  usersPerDomain: number
  maxTotalUsersForDomain: number // Specifically for the "not more than 3 users can add the same domain" on free plan
  priceMonthly: number
  priceYearly?: number
}

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    emailsPerDomain: 1,
    usersPerDomain: 3,
    maxTotalUsersForDomain: 3,
    priceMonthly: 0
  },
  pro: {
    emailsPerDomain: 3,
    usersPerDomain: 8,
    maxTotalUsersForDomain: 1000, // Effectively high/unlimited for this specific check
    priceMonthly: 300,
    priceYearly: 3000 // Sample yearly discount
  },
  business: {
    emailsPerDomain: 1000000,
    usersPerDomain: 1000000,
    maxTotalUsersForDomain: 1000000,
    priceMonthly: 600
  }
}
