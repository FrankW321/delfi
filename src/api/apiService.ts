import { mockApiResponse } from './mockData'

export function fetchUserData(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockApiResponse)
    }, 5000)
  })
}
