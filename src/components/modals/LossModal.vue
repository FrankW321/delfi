<template>
  <div class="modal-mask" v-if="isVisible" @click="resetStore">
    <div class="modal-wrapper">
      <div class="modal-container">
        <button class="close-button" @click="closeModal">X</button>
        <div class="modal-header">
          <div class="progress-number">4/4</div>
          <div class="progress-bar">
            <div
              class="progress-step"
              v-for="index in 4"
              :key="index"
              :class="{ filled: index <= 4 }"
            ></div>
          </div>
        </div>
        <div class="modal-body">
          <div class="check-circle-container">
            <img src="../../assets/icons/checkCircle.svg" alt="Circle Icon" />
          </div>
          <p>{{ $t('lossMessage') }}</p>
          <p>
            {{ $t('subscriptionPeriodMessage') }}
            <span class="bold">{{ daysSubscribed }}</span>
          </p>
        </div>
        <div class="modal-footer">
          <button class="win-loss-button" @click="closeModal">{{ $t('close') }}</button>
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

const store = useStore()

const isVisible = computed(() => store.state.isVisible)

const daysSubscribed = computed(() => {
  const userData = store.state.userData
  const daysSubscribed = userData?.userInfo?.daysSubscribed || 0

  const today = new Date()

  const subscriptionDate = new Date(today.getTime() + daysSubscribed * 24 * 60 * 60 * 1000)
  const formattedDate = subscriptionDate
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    .replace(/\//g, '.')
  return formattedDate
})

const resetStore = () => {
  store.commit('resetState')
}

const closeModal = () => {
  store.commit('setIsVisible', false)
  store.commit('resetState')
}

const redirectSupport = () => {
  window.location.href = 'https://delfimeedia.ee/kontakt/'
}

const getCancelDetails = () => {
  store.dispatch('postData')
}
getCancelDetails()
</script>
