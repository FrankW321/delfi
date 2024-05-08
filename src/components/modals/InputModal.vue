<template>
  <div class="modal-mask" v-if="isVisible">
    <div class="modal-wrapper">
      <div class="modal-container">
        <button class="close-button" @click="continueSubscription">X</button>
        <div class="modal-header">
          <div class="progress-number">3/4</div>
          <div class="progress-bar">
            <div
              class="progress-step"
              v-for="index in 4"
              :key="index"
              :class="{ filled: index <= 3 }"
            ></div>
          </div>
          <h2>Kirjuta meile oma probleemist, et saaksime Sind aidata voi lahendust pakkuda.</h2>
        </div>
        <div class="modal-body">
          <textarea v-model="cancellationInput" placeholder="Sisesta siia kommentaar"></textarea>
        </div>
        <div class="modal-footer">
          <button class="continue-button" @click="continueSubscription">Jätkan tellimusega</button>
          <button class="cancel-button" @click="cancelSubscription">Edasi tühistama</button>
        </div>
        <div class="help-container">
          <p class="footer-text" @click="redirectSupport">
            Vajad abi? <b>Meie klienditugi aitab </b><span class="blue">></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const isVisible = computed(() => store.state.isVisible)
const cancellationInput = ref('')

const cancelSubscription = async () => {
  try {
    await store.commit('setCancellationInput', cancellationInput.value)
    store.commit('setActiveStep', 'offer')
  } catch (error) {
    console.error('Error canceling subscription:', error)
  }
}

const continueSubscription = () => {
  store.commit('setIsVisible', false)
  store.commit('resetState')
}

const redirectSupport = () => {
  window.location.href = 'https://delfimeedia.ee/kontakt/'
}
</script>
