import { createStore } from 'vuex'
import type { RootState, UserInfo, Offer } from './store'

export default createStore<RootState>({
  state: {
    isVisible: false,
    userData: null,
    activeStep: '',
    cancellationDescription: '',
    cancellationReasons: [],
    acceptedOffer: false
  },
  mutations: {
    setIsVisible(state: RootState, isVisible: boolean) {
      state.isVisible = isVisible
    },
    setActiveStep(state: RootState, step: string) {
      state.activeStep = step
    },
    setUserData(state: RootState, userData: UserInfo & Offer) {
      state.userData = userData
    },
    setCancellationDescription(state: RootState, input: string) {
      state.cancellationDescription = input
    },
    setCancellationReasons(state: RootState, reasons: string[]) {
      state.cancellationReasons = reasons
    },
    setAcceptedOffer(state: RootState, offer: boolean) {
      state.acceptedOffer = offer
    },
    resetState(state: RootState) {
      state.isVisible = false
      state.activeStep = 'start'
      state.cancellationDescription = ''
      state.cancellationReasons = []
      state.acceptedOffer = false
    }
  },
  actions: {
    async postData({ state }: { state: RootState }) {
      console.log(state)
    }
  }
})
