import { mockApiResponse } from './mockData'

export interface UserData {
  userInfo: {
    userId: number
    daysSubscribed: number
    hasSharedAccounts: boolean
    currentTermId: string
  }
  offer: {
    termId: string
    termName: string
    price: number
    normalPrice: number
    billingPeriod: number
  }
}

export async function fetchUserData(): Promise<UserData> {
  await new Promise((resolve) => setTimeout(resolve, 5000))

  return mockApiResponse
}
