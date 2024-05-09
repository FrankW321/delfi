<template>
  <div class="modal-mask" v-if="isVisible">
    <div class="modal-wrapper">
      <div class="modal-container">
        <button class="close-button" @click="continueSubscription">X</button>
        <div class="modal-header">
          <div class="progress-number">2/4</div>
          <div class="progress-bar">
            <div
              class="progress-step"
              v-for="index in 4"
              :key="index"
              :class="{ filled: index <= 2 }"
            ></div>
          </div>
          <h2>{{ $t('whyCancel') }}</h2>
        </div>
        <div class="modal-body">
          <ul class="reason-list">
            <li v-for="(reason, index) in reasons" :key="index">
              <input
                type="checkbox"
                :id="'reason' + index"
                v-model="selectedReasons"
                :value="reason"
                class="round-checkbox"
              />

              <label :for="'reason' + index">{{ $t(`reasons.${reason}`) }}</label>
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="continue-button" @click="continueSubscription">
            {{ $t('continueSubscription') }}
          </button>
          <button class="cancel-button" @click="cancelSubscription">
            {{ $t('cancelSubscription') }}
          </button>
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
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { AppConfig } from '../../config/config'
import { redirect } from '../../utils/utils'

const store = useStore()

const isVisible = computed(() => store.state.isVisible)

const reasons = ['cost', 'notEnoughVisits', 'technicalIssues', 'adFreeReading', 'other']
const selectedReasons = ref([])

const cancelSubscription = async () => {
  try {
    await store.commit('setCancellationReasons', selectedReasons.value)
    store.commit('setActiveStep', 'input')
  } catch (error) {
    console.error('Error canceling subscription:', error)
  }
}

const continueSubscription = () => {
  store.commit('setIsVisible', false)
  store.commit('resetState')
}

const redirectSupport = () => {
  redirect(AppConfig.supportUrl)
}
</script>
