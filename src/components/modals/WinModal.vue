<template>
  <div class="modal-mask" v-if="isVisible" @click="resetStore">
    <div class="modal-wrapper">
      <div class="modal-container">
        <button class="close-button-exception" @click="continueSubscription">X</button>
        <div class="modal-header">
          <div class="check-circle-container">
            <img src="../../assets/icons/checkCircle.svg" alt="Circle Icon" />
          </div>
          <h2>{{ $t('offerActive') }}</h2>
        </div>
        <div class="modal-body">
          <p>
            {{ $t('thankYouMessage') }}
          </p>
        </div>
        <div class="modal-footer">
          <button class="win-loss-button" @click="closeModal">{{ $t('startReading') }}</button>
        </div>
        <div class="help-container">
          <p class="footer-text" @click="redirectSupport">
            {{ $t('needHelpMessage') }} <b>{{ $t('customerSupport') }}</b
            ><span class="blue">></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { AppConfig } from '../../config/config'
import { redirect } from '../../utils/utils'

const store = useStore()

const isVisible = computed(() => store.state.isVisible)

const resetStore = () => {
  store.commit('resetState')
}

const redirectSupport = () => {
  redirect(AppConfig.supportUrl)
}

const continueSubscription = () => {
  store.commit('setIsVisible', false)
  store.commit('resetState')
}

const closeModal = () => {
  store.commit('setIsVisible', false)
  redirect(AppConfig.delfiUrl)
}

const getSubscriptionDetails = () => {
  store.commit('setAcceptedOffer', true)
  store.dispatch('postData')
}
getSubscriptionDetails()
</script>
