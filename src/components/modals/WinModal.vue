<template>
  <div class="modal-mask" v-if="isVisible" @click="resetStore">
    <div class="modal-wrapper">
      <div class="modal-container">
        <button class="close-button-exception" @click="continueSubscription">X</button>
        <div class="modal-header">
          <div class="check-circle-container">
            <img src="../../assets/icons/checkCircle.svg" alt="Circle Icon" />
          </div>
          <h2>Eripakkumine aktiveeritud!</h2>
        </div>
        <div class="modal-body">
          <p>Aitäh, et oled uks 150 000-st Delfi tasulise sisu lugejast.</p>
        </div>
        <div class="modal-footer">
          <button class="win-loss-button" @click="closeModal">Lugema</button>
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

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const isVisible = computed(() => store.state.isVisible)

const resetStore = () => {
  store.commit('resetState')
}

const redirectSupport = () => {
  window.location.href = 'https://delfimeedia.ee/kontakt/'
}

const continueSubscription = () => {
  store.commit('setIsVisible', false)
  store.commit('resetState')
}

const closeModal = () => {
  store.commit('setIsVisible', false)
  window.location.href = 'https://delfi.ee'
}

const getSubscriptionDetails = () => {
  store.commit('setAcceptedOffer', true)
  store.dispatch('postData')
}
getSubscriptionDetails()
</script>
