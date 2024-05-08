<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { fetchUserData } from '../api/apiService'

import StartModal from '../components/modals/StartModal.vue'
import ReasonModal from '../components/modals/ReasonModal.vue'
import InputModal from '../components/modals/InputModal.vue'
import OfferModal from '../components/modals/OfferModal.vue'
import WinModal from '../components/modals/WinModal.vue'
import LossModal from '../components/modals/LossModal.vue'

const store = useStore()
const isVisible = computed(() => store.state.isVisible)
const activeStep = computed(() => store.state.activeStep)
const setIsVisible = (isVisible: Boolean) => {
  store.commit('setActiveStep', 'start')
  store.commit('setIsVisible', isVisible)
}

onMounted(async () => {
  try {
    const fetchedUserData = await fetchUserData()
    store.commit('setUserData', fetchedUserData)
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
})
</script>

<template>
  <main>
    <div class="modal-wrapper">
      <button class="win-loss-button" @click="setIsVisible(true)">Click me to start</button>
    </div>
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <StartModal v-if="activeStep === 'start'" />
        <ReasonModal v-if="activeStep === 'reason'" />
        <InputModal v-if="activeStep === 'input'" />
        <OfferModal v-if="activeStep === 'offer'" />
        <WinModal v-if="activeStep === 'win'" />
        <LossModal v-if="activeStep === 'loss'" />
      </div>
    </div>
  </main>
</template>
