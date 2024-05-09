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
const setIsVisible = (isVisible: boolean) => {
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
      <button class="win-loss-button" @click="setIsVisible(true)">
        {{ $t('startButtonText') }}
      </button>
    </div>
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <StartModal v-if="activeStep === 'start'" />
        <ReasonModal v-else-if="activeStep === 'reason'" />
        <InputModal v-else-if="activeStep === 'input'" />
        <OfferModal v-else-if="activeStep === 'offer'" />
        <WinModal v-else-if="activeStep === 'win'" />
        <LossModal v-else-if="activeStep === 'loss'" />
        <div v-else>{{ $t('unknownStepMessage') }}</div>
      </div>
    </div>
  </main>
</template>
