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

export interface State {
  activeStep: string
  cancellationReason: string
  cancellationDescription: string
  acceptedOffer: boolean
}

export interface RootState {
  isVisible: boolean
  activeStep: string
  userData: UserInfo
  offer: Offer
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<RootState>
  }
}
