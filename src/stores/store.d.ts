import { Store } from 'vuex'

export interface UserInfo {
  userId: number
  daysSubscribed: number
  hasSharedAccounts: boolean
  currentTermId: string
}

export interface Offer {
  termId: string
  termName: string
  price: number
  normalPrice: number
  billingPeriod: number
}

export interface RootState {
  acceptedOffer: boolean
  cancellationReasons: string[]
  cancellationDescription: string
  isVisible: boolean
  activeStep: string
  userData: UserInfo | null
  offer: Offer
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>
  }
}
