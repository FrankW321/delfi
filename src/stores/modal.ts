import { createStore } from 'vuex'

export default createStore<RootState>({
  state: {
    isVisible: false,
    userData: null,
    activeStep: '',
    cancellationInput: '',
    cancellationReasons: [],
    acceptedOffer: false
  },
  mutations: {
    setIsVisible(state, isVisible) {
      state.isVisible = isVisible
    },
    setActiveStep(state, step) {
      state.activeStep = step
    },
    setUserData(state, userData) {
      state.userData = userData
    },
    setCancellationInput(state, input) {
      state.cancellationInput = input
    },
    setCancellationReasons(state, reasons) {
      state.cancellationReasons = reasons
    },
    setAcceptedOffer(state, offer) {
      state.acceptedOffer = offer
    },
    resetState(state) {
      state.isVisible = false
      state.activeStep = 'start'
      state.cancellationInput = ''
      state.cancellationReasons = []
      state.acceptedOffer = false
    }
  },
  actions: {
    async postData({ state }) {
      console.log(state)
    }
  }
})
